
import React from "react";

type LineUserAvatarProps = {
  lineUserId: string;
  size?: number;
  className?: string;
};

function hashString(value: string): number {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function generateAvatarColors(lineUserId: string) {
  const hash = hashString(lineUserId);

  // Background hue: 0–359 degrees.
  const backgroundHue = hash % 360;

  // Offset foreground hue to keep the colors distinct.
  const foregroundHue = (backgroundHue + 140 + ((hash >>> 9) % 80)) % 360;

  return {
    background: `hsl(${backgroundHue}, 65%, 42%)`,
    foreground: `hsl(${foregroundHue}, 75%, 90%)`,
  };
}

export function LineUserAvatar({
  lineUserId,
  size = 36,
  className,
}: LineUserAvatarProps) {
  const { background, foreground } = generateAvatarColors(lineUserId);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 90 90"
      className={className}
      role="img"
      aria-label="LINE user avatar"
      style={{ flexShrink: 0, display: "block" }}
    >
      {/* Background circle */}
      <circle cx="45" cy="45" r="45" fill={background} />

      {/* Person silhouette */}
      <path
        d="M45 22.007c8.899 0 16.14 7.241 16.14 16.14
        0 8.9-7.241 16.14-16.14 16.14
        -8.9 0-16.14-7.24-16.14-16.14
        C28.86 29.248 36.1 22.007 45 22.007z
        M45 83.843c-11.135 0-21.123-4.885-27.957-12.623
        3.177-5.75 8.144-10.476 14.05-13.341
        2.009-.974 4.354-.958 6.435.041
        2.343 1.126 4.857 1.696 7.473 1.696
        2.615 0 5.13-.571 7.473-1.696
        2.083-1 4.428-1.015 6.435-.041
        5.906 2.864 10.872 7.591 14.049 13.341
        C66.123 78.957 56.135 83.843 45 83.843z"
        fill={foreground}
      />
    </svg>
  );
}