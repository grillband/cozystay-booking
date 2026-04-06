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
    <article className="bg-white/50 backdrop-blur-2xl rounded-2xl shadow-glass border border-white/60 overflow-hidden flex flex-col hover:border-sky-300/60 hover:-translate-y-1 hover:shadow-glass-lg transition-all">
      {room.imageUrl ? (
        <div
          className="h-40 sm:h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${room.imageUrl})` }}
        />
      ) : (
        <div className="h-40 sm:h-48 bg-gradient-to-tr from-sky-400/60 via-indigo-400/40 to-amber-300/50" />
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-800 text-base sm:text-lg">
            {room.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-white/60 backdrop-blur-lg px-2 py-1 text-[11px] font-medium text-slate-600 border border-slate-200/60">
            Up to {room.maxGuests} guests
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-500 line-clamp-3">
          {room.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold text-slate-800 text-sm sm:text-base">
              {room.currency} {room.pricePerNight.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              <span className="text-xs text-slate-400 ml-1">/ night</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Next available:{" "}
              <span className="font-medium text-slate-700">
                {room.nextAvailableDate}
              </span>
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            {room.availableNights > 0
              ? `${room.availableNights} nights open`
              : "Fully booked"}
          </p>
        </div>
        <button
          onClick={() => onSelect(room.id)}
          className="mt-5 inline-flex justify-center items-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:from-sky-400 hover:to-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-white transition-colors"
        >
          Book this apartment
        </button>
      </div>
    </article>
  );
}

