import { NextRequest, NextResponse } from "next/server";
import { fetchRoomsFromChannelManager } from "@/lib/channelManager";
import { convertFromIDR } from "@/lib/currency";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const rooms = await fetchRoomsFromChannelManager();
    const targetCurrency = new URL(request.url).searchParams.get("currency");

    if (targetCurrency && targetCurrency !== "IDR") {
      const converted = await Promise.all(
        rooms.map(async (room) => ({
          ...room,
          pricePerNight:
            Math.round(
              (await convertFromIDR(room.pricePerNight, targetCurrency)) * 100
            ) / 100,
          currency: targetCurrency,
        }))
      );
      return NextResponse.json({ rooms: converted });
    }

    return NextResponse.json({ rooms });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to load rooms." },
      { status: 500 }
    );
  }
}

