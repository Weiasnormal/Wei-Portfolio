type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-black/40 md:bg-white/5 ${
        hover ? "transition hover:bg-white/10" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}