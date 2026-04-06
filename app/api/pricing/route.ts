import { NextRequest, NextResponse } from "next/server";
import { getRoomPricing } from "@/lib/channelManager";
import { convertFromIDR, formatPrice } from "@/lib/currency";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const targetCurrency = searchParams.get("currency");

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "Missing required parameters: roomId, checkIn, checkOut" },
        { status: 400 }
      );
    }

    const pricing = await getRoomPricing(roomId, checkIn, checkOut);

    // Convert if a target currency is provided and differs from base
    if (targetCurrency && targetCurrency !== pricing.currency) {
      const convertedPerNight = convertFromIDR(pricing.pricePerNight, targetCurrency);
      const convertedTotal = convertFromIDR(pricing.totalPrice, targetCurrency);
      return NextResponse.json({
        pricePerNight: Math.round(convertedPerNight * 100) / 100,
        totalPrice: Math.round(convertedTotal * 100) / 100,
        currency: targetCurrency,
        originalCurrency: pricing.currency,
        originalTotalPrice: pricing.totalPrice,
      });
    }

    return NextResponse.json(pricing);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch pricing." },
      { status: 500 }
    );
  }
}