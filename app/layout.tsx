import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "CozyStay Apartments",
  description: "Modern apartment booking with real-time availability."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        {/* Animated gradient mesh blobs — separate fixed layer behind everything */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0" style={{ zIndex: 0 }}>
          <div
            className="absolute animate-blob1"
            style={{
              width: 600, height: 600, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56,189,248,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)',
              filter: 'blur(80px)', top: '-10%', left: '-5%',
            }}
          />
          <div
            className="absolute animate-blob2"
            style={{
              width: 500, height: 500, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(167,139,250,0.35) 0%, rgba(244,114,182,0.2) 50%, transparent 70%)',
              filter: 'blur(80px)', top: '30%', right: '-8%',
            }}
          />
          <div
            className="absolute animate-blob3"
            style={{
              width: 450, height: 450, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52,211,153,0.3) 0%, rgba(56,189,248,0.15) 50%, transparent 70%)',
              filter: 'blur(80px)', bottom: '5%', left: '20%',
            }}
          />
          <div
            className="absolute animate-blob4"
            style={{
              width: 350, height: 350, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(251,146,60,0.15) 50%, transparent 70%)',
              filter: 'blur(80px)', top: '60%', left: '-10%',
            }}
          />
        </div>
        <div className="min-h-screen flex flex-col relative" style={{ zIndex: 1 }}>
          {/* Subtle noise overlay for texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E")' }}
          />

          <Header />
          <main className="relative z-10 flex-1">
            <div className="pt-4 pb-10">{children}</div>
          </main>
          <footer className="relative z-10 border-t border-slate-200/60 bg-white/40 backdrop-blur-xl">
            <div className="container-page py-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">CozyStay Apartments</p>
                  <p>Modern serviced apartments with hotel-grade support.</p>
                  <p className="text-[11px] text-slate-400">
                    All reservations synchronised securely via your channel manager.
                  </p>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <p className="font-semibold text-slate-800">Reservations & support</p>
                  <p>Email: hello@cozystay.example</p>
                  <p>Phone: +1 (555) 012-3456</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-slate-200/60 pt-4 text-[11px] text-slate-400 sm:flex-row sm:items-center">
                <p>
                  © {new Date().getFullYear()} CozyStay Apartments. All rights reserved.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="hover:text-slate-700">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-slate-700">
                    Terms
                  </a>
                  <a href="#top" className="hover:text-slate-700">
                    Back to top
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

