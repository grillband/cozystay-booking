// Abstraction layer for channel manager integration.
// Set CHANNEL_MANAGER_API_KEY and CHANNEL_MANAGER_API_URL in your .env.local
// to connect to a real channel manager (e.g. Beds24, Cloudbeds, Hostaway, Guesty, etc.).
// When these env vars are missing the app falls back to built-in mock data.

export interface ChannelRoom {
  id: string;
  name: string;
  description: string;
  maxGuests: number;
  pricePerNight: number;
  currency: string;
  imageUrl?: string;
  gallery?: string[];
  nextAvailableDate: string;
  availableNights: number;
}

export interface CreateBookingPayload {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  totalPrice?: number;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
const API_KEY = () => process.env.CHANNEL_MANAGER_API_KEY ?? "";
const API_URL = () => process.env.CHANNEL_MANAGER_API_URL ?? "";
const PROPERTY_ID = () => process.env.CHANNEL_MANAGER_PROPERTY_ID ?? "";

function isLive(): boolean {
  return !!(API_KEY() && API_URL());
}

async function cmFetch(path: string, init?: RequestInit): Promise<Response> {
  const url = `${API_URL()}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY()}`,
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Channel manager API error ${res.status}: ${text || res.statusText}`
    );
  }
  return res;
}

// ─── Mock data (used when no API key is configured) ─────────────────────────
const MOCK_ROOMS: ChannelRoom[] = [
  {
    id: "studio-city",
    name: "Bright Studio – City View",
    description:
      "Elegant studio with kitchenette, balcony and skyline views. Perfect for business stays and city breaks.",
    maxGuests: 2,
    pricePerNight: 1_850_000,
    currency: "IDR",
    imageUrl:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    nextAvailableDate: "2026-03-18",
    availableNights: 5,
  },
  {
    id: "family-suite",
    name: "Family Suite – 2 Bedroom",
    description:
      "Spacious two-bedroom apartment with full kitchen, ideal for families and longer stays.",
    maxGuests: 4,
    pricePerNight: 2_750_000,
    currency: "IDR",
    imageUrl:
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    nextAvailableDate: "2026-03-19",
    availableNights: 3,
  },
];

// ─── Public API ─────────────────────────────────────────────────────────────

export async function fetchRoomsFromChannelManager(): Promise<ChannelRoom[]> {
  if (isLive()) {
    const propertyId = PROPERTY_ID();
    const path = propertyId
      ? `/properties/${encodeURIComponent(propertyId)}/rooms`
      : "/rooms";
    const res = await cmFetch(path);
    return res.json();
  }

  // Mock fallback
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_ROOMS;
}

export async function getRoomPricing(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<{ pricePerNight: number; totalPrice: number; currency: string }> {
  if (isLive()) {
    const params = new URLSearchParams({ checkIn, checkOut });
    const res = await cmFetch(
      `/rooms/${encodeURIComponent(roomId)}/pricing?${params}`
    );
    return res.json();
  }

  // Mock dynamic pricing
  const room = MOCK_ROOMS.find((r) => r.id === roomId);
  if (!room) throw new Error("Room not found");

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let basePrice = room.pricePerNight;
  const dayOfWeek = checkInDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) basePrice *= 1.2;
  const month = checkInDate.getMonth();
  if (month >= 5 && month <= 8) basePrice *= 1.15;
  const demandMultiplier = 0.9 + Math.random() * 0.2;
  basePrice *= demandMultiplier;

  const totalPrice = Math.round(basePrice * nights);
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    pricePerNight: Math.round(basePrice),
    totalPrice,
    currency: room.currency,
  };
}

export async function createBookingInChannelManager(
  payload: CreateBookingPayload
): Promise<{ confirmationCode: string; totalPrice: number }> {
  if (isLive()) {
    const res = await cmFetch("/bookings", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return {
      confirmationCode: data.confirmationCode ?? data.code,
      totalPrice: data.totalPrice,
    };
  }

  // Mock fallback
  const pricing = await getRoomPricing(
    payload.roomId,
    payload.checkIn,
    payload.checkOut
  );

  if (
    payload.totalPrice !== undefined &&
    payload.totalPrice !== pricing.totalPrice
  ) {
    throw new Error("Price mismatch - please refresh and try again");
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    confirmationCode:
      "CS" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    totalPrice: pricing.totalPrice,
  };
}

export async function completeOnlineCheckIn(
  confirmationCode: string,
  lastName: string
): Promise<{
  guestName: string;
  roomName: string;
  doorCode?: string;
}> {
  if (isLive()) {
    const res = await cmFetch("/check-in", {
      method: "POST",
      body: JSON.stringify({ confirmationCode, lastName }),
    });
    return res.json();
  }

  // Mock fallback
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (!confirmationCode || !lastName) {
    throw new Error("Invalid confirmation details.");
  }

  return {
    guestName: `${lastName.trim()} Family`,
    roomName: "Bright Studio – City View",
    doorCode: "4729",
  };
}

