import Image from "next/image";

export function Logo({
  variant = "black",
  className = "",
}: {
  variant?: "black" | "white";
  className?: string;
}) {
  const src = variant === "white" ? "/zed-law-white.webp" : "/zed-law-black.webp";
  return (
    <Image
      src={src}
      alt="Zed Law"
      width={1186}
      height={300}
      priority
      className={className}
    />
  );
}
