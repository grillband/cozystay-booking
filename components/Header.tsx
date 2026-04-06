"use client";

import { useState } from "react";

export function Header() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFacilitiesModal, setShowFacilitiesModal] = useState(false);

  const facilities = [
    "High-speed Wi‑Fi and dedicated workspace",
    "Fully equipped kitchen or kitchenette",
    "Self check-in with smart lock access",
    "Premium linens, toiletries and housekeeping",
    "Fast local and international streaming-ready TV",
    "Complimentary coffee, tea and welcome snacks"
  ];

  return (
    <>
      <header className="sticky top-0 z-50" style={{ background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', borderBottom: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div className="container-page flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(139,111,71,0.85), rgba(139,111,71,0.95))', boxShadow: '0 2px 8px rgba(139,111,71,0.25), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="text-base font-semibold text-gray-800 tracking-tight">CozyStay</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#suites" className="hover:text-gray-800 transition-colors">Properties</a>
            <button
              onClick={() => setShowFacilitiesModal(true)}
              className="hover:text-gray-800 transition-colors"
            >
              Facilities
            </button>
            <button
              onClick={() => setShowLocationModal(true)}
              className="hover:text-gray-800 transition-colors"
            >
              Location
            </button>
            <a href="/check-in" className="hover:text-gray-800 transition-colors">Check-in</a>
          </nav>

          <a
            href="#booking"
            className="hidden md:inline-flex glass-btn px-5 py-2.5 text-sm"
          >
            Book now
          </a>
        </div>
      </header>

      {/* Location modal */}
      {showLocationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md"
          onClick={() => setShowLocationModal(false)}
        >
          <div
            className="glass-strong relative w-full max-w-4xl mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 text-sm transition-colors" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}
            >
              ×
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Our Location</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241264875!2d-73.98731668482413!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1523122800000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Facilities modal */}
      {showFacilitiesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md"
          onClick={() => setShowFacilitiesModal(false)}
        >
          <div
            className="glass-strong relative w-full max-w-lg mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFacilitiesModal(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 text-sm transition-colors" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}
            >
              ×
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Facilities included</h2>
            <p className="mb-5 text-sm text-gray-500">
              Every property includes modern essentials and thoughtful extras for a comfortable stay.
            </p>
            <ul className="space-y-3">
              {facilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
