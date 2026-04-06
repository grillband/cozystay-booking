import React from "react";

export interface Room {
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

interface RoomCardProps {
  room: Room;
  onSelect: (roomId: string) => void;
}

export function RoomCard({ room, onSelect }: RoomCardProps) {
  return (
    <article className="card-light rounded-2xl overflow-hidden flex flex-col hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group h-full">
      {room.imageUrl ? (
        <div
          className="aspect-[4/3] w-full bg-cover bg-center relative flex-shrink-0"
          style={{ backgroundImage: `url(${room.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      ) : (
        <div className="aspect-[4/3] w-full bg-gradient-to-tr from-surface via-surface-light to-surface-lighter flex-shrink-0" />
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
            {room.name}
          </h3>
          <span className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-500 border border-gray-200">
            Up to {room.maxGuests} guests
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">
          {room.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">
              {room.currency}{" "}
              {room.pricePerNight.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
              <span className="text-xs text-gray-400 ml-1">/ night</span>
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Next available:{" "}
              <span className="font-medium text-gray-600">
                {room.nextAvailableDate}
              </span>
            </p>
          </div>
          <p className="text-[11px] text-gray-400">
            {room.availableNights > 0
              ? `${room.availableNights} nights open`
              : "Fully booked"}
          </p>
        </div>
        <button
          onClick={() => onSelect(room.id)}
          className="mt-auto pt-5 inline-flex justify-center items-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
        >
          Book this property
        </button>
      </div>
    </article>
  );
}

