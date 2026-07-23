type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-center md:text-left";

  return (
    <div className={`${subtitle ? "mb-12" : "mb-6 md:mb-12"} ${alignClass} ${className}`}>
      <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">{title}</h2>
      {subtitle && <p className="text-sm md:text-base text-white/70">{subtitle}</p>}
    </div>
  );
}