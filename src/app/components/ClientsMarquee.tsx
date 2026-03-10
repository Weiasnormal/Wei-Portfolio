"use client";

type Client = {
  name: string;
  logo: string;
};

const clients: Client[] = [
  { name: "Google", logo: "G" },
  { name: "Microsoft", logo: "M" },
  { name: "Apple", logo: "A" },
  { name: "Amazon", logo: "Am" },
  { name: "Netflix", logo: "N" },
  { name: "Tesla", logo: "T" },
  { name: "Meta", logo: "Mt" },
  { name: "Spotify", logo: "S" },
];

const duplicatedClients = [...clients, ...clients];

export default function ClientsMarquee() {
  return (
    <div className="overflow-hidden py-12">
      <style>{`
        @keyframes clients-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .clients-marquee { animation: clients-left 25s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .clients-marquee { animation: none; }
        }
      `}</style>

      <h3 className="mb-8 text-center text-2xl font-bold text-white/80">Trusted By</h3>

      <div className="relative overflow-hidden">
        <div className="clients-marquee flex gap-12 w-max will-change-transform">
          {duplicatedClients.map((client, index) => (
            <div
              key={index}
              className="flex h-24 w-32 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm grayscale hover:grayscale-0 transition-[filter,transform] duration-300 hover:scale-105"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#ff5b1a] via-[#7FD1AE] to-[#4DA3FF] text-2xl font-bold text-black">
                {client.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
