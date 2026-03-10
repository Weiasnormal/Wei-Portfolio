"use client";

import Image from "next/image";

type TechItem = {
  name: string;
  icon: string;
};

const techStack: TechItem[] = [
  { name: "Next.js", icon: "/Teckstack/nextjs.svg" },
  { name: "React", icon: "/Teckstack/react.svg" },
  { name: "React Native", icon: "/Teckstack/react.svg" },
  { name: "HTML", icon: "/Teckstack/html.svg" },
  { name: "Tailwind CSS", icon: "/Teckstack/css.svg" },
  { name: "Radix UI", icon: "/Teckstack/radixui.svg" },
  { name: "Lucide React", icon: "/Teckstack/lucide.svg" },
  { name: "TypeScript", icon: "/Teckstack/typscript.svg" },
  { name: "Python", icon: "/Teckstack/python.svg" },
  { name: "Java", icon: "/Teckstack/java.svg" },
  { name: "C#", icon: "/Teckstack/csharp.svg" },
  { name: "JavaScript", icon: "/Teckstack/javascript.svg" },
  { name: "PHP", icon: "/Teckstack/php.svg" },
  { name: "Dart", icon: "/Teckstack/dart.svg" },
  { name: "Framer Motion", icon: "/Teckstack/framermotion.svg" },
  { name: "Spline", icon: "/Teckstack/spline.svg" },
  { name: "TensorFlow", icon: "/Teckstack/tensorflow.svg" },
  { name: "PyTorch", icon: "/Teckstack/pytorch.svg" },
  { name: "scikit-learn", icon: "/Teckstack/scikit.svg" },
  { name: "NumPy", icon: "/Teckstack/numpy.svg" },
  { name: "Pandas", icon: "/Teckstack/pandas.svg" },
  { name: "Matplotlib", icon: "/Teckstack/matplotlib.svg" },
  { name: "Expo", icon: "/Teckstack/expo.svg" },
  { name: "Node.js", icon: "/Teckstack/nodejs.svg" },
  { name: "MySQL", icon: "/Teckstack/mysql.svg" },
  { name: "MongoDB", icon: "/Teckstack/mongodb.svg" },
  { name: "JWT", icon: "/Teckstack/jwt.svg" },
  { name: "EmailJS", icon: "/Teckstack/emailjs.svg" },
  { name: "Postman", icon: "/Teckstack/postman.svg" },
  { name: "Twilio", icon: "/Teckstack/twilio.svg" },
  { name: "Vercel", icon: "/Teckstack/vercel.svg" },
  { name: "Netlify", icon: "/Teckstack/netlify.svg" },
  { name: "Render", icon: "/Teckstack/render.svg" },
  { name: "GitHub", icon: "/Teckstack/github.svg" },
  { name: "Git", icon: "/Teckstack/git.svg" },
  { name: "ESLint", icon: "/Teckstack/eslint.svg" },
  { name: "Figma", icon: "/Teckstack/figma.svg" },
  { name: "Photoshop", icon: "/Teckstack/photoshop.svg" },
  { name: "Lightroom", icon: "/Teckstack/lightroom.svg" },
  { name: "Raspberry Pi", icon: "/Teckstack/Raspberrypi.svg" },
];

// Duplicate once for a seamless CSS loop
const duplicatedTech = [...techStack, ...techStack];

function TechCard({ tech, prefix }: { tech: TechItem; prefix?: string }) {
  return (
    <div className="flex flex-shrink-0 items-center gap-3 md:gap-6 rounded-xl md:rounded-2xl border border-white/10 bg-black/40 md:bg-white/5 px-6 py-3 md:px-12 md:py-6">
      <Image
        src={tech.icon}
        alt={tech.name}
        width={48}
        height={48}
        className="w-8 h-8 md:w-12 md:h-12 object-contain"
        loading="lazy"
      />
      <span className="text-lg md:text-2xl font-medium text-white whitespace-nowrap">
        {prefix}{tech.name}
      </span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="overflow-hidden pt-2 pb-60 md:pt-4 md:pb-70">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-left  { animation: marquee-left  60s linear infinite; }
        .marquee-right { animation: marquee-right 60s linear infinite; }
        @media (max-width: 768px) {
          .marquee-left  { animation-duration: 150s; }
          .marquee-right { animation-duration: 150s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-left, .marquee-right { animation: none; }
        }
      `}</style>

      <h2 className="mb-6 md:mb-12 text-center text-2xl font-bold text-white md:text-4xl">Tech Stack</h2>

      <div className="space-y-4 md:space-y-8">
        {/* First Row — scrolls left */}
        <div className="relative overflow-hidden">
          <div className="marquee-left flex gap-8 md:gap-16 w-max will-change-transform">
            {duplicatedTech.map((tech, index) => (
              <TechCard key={index} tech={tech} />
            ))}
          </div>
        </div>

        {/* Second Row — scrolls right */}
        <div className="relative overflow-hidden">
          <div className="marquee-right flex gap-8 md:gap-16 w-max will-change-transform">
            {duplicatedTech.map((tech, index) => (
              <TechCard key={`r-${index}`} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
