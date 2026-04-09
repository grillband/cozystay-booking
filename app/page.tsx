import { fetchRoomsFromChannelManager } from "@/lib/channelManager";
import { HomePageClient } from "@/components/HomePageClient";
import type { Room } from "@/components/RoomCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let rooms: Room[] = [];
  let error: string | null = null;

  try {
    rooms = await fetchRoomsFromChannelManager();
    // Default currency conversion logic can be appended here if you expand the default value,
    // but the component default userCurrency is "IDR" matching the channel manager's default.
  } catch (err: any) {
    console.error("[HOME_PAGE_ERROR]", err?.message);
    error = err?.message || "Failed to load rooms.";
  }

  return <HomePageClient initialRooms={rooms} error={error} />;
}
