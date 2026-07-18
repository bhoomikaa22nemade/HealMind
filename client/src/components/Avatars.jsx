function MaleAvatar({ className = "", size = 70, style = {} }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="var(--color-primary-light)" />

      {/* Shirt */}
      <path
        d="M22 92v-7c0-15 13-27 28-27s28 12 28 27v7H22z"
        fill="var(--color-primary)"
      />

      {/* Collar */}
      <path
        d="M42 60l8 10 8-10"
        fill="#ffffff"
      />

      {/* Neck */}
      <rect
        x="45"
        y="50"
        width="10"
        height="8"
        rx="2"
        fill="#FFD6B3"
      />

      {/* Face */}
      <circle
        cx="50"
        cy="38"
        r="16"
        fill="#FFD6B3"
      />

      {/* Hair */}
      <path
        d="M34 34c0-10 7-18 16-18s16 8 16 18c-4-3-10-5-16-5s-12 2-16 5z"
        fill="var(--color-primary-dark)"
      />
    </svg>
  );
}

function FemaleAvatar({ className = "", size = 70, style = {} }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      {/* Background */}
      <circle cx="50" cy="50" r="50" fill="var(--color-primary-light)" />

      {/* Hair */}
      <path
        d="M24 42c0-16 12-28 26-28s26 12 26 28v16c-3-7-8-12-13-15v-8c0-7-6-13-13-13s-13 6-13 13v8c-5 3-10 8-13 15V42z"
        fill="var(--color-primary-dark)"
      />

      {/* Face */}
      <circle
        cx="50"
        cy="40"
        r="15"
        fill="#FFD6B3"
      />

      {/* Earrings */}
      <circle cx="36" cy="45" r="2" fill="#FFD166" />
      <circle cx="64" cy="45" r="2" fill="#FFD166" />

      {/* Neck */}
      <rect
        x="45"
        y="52"
        width="10"
        height="8"
        rx="2"
        fill="#FFD6B3"
      />

      {/* Dress */}
      <path
        d="M22 92v-8c0-15 13-26 28-26s28 11 28 26v8H22z"
        fill="var(--color-primary)"
      />

      {/* Neckline */}
      <path
        d="M42 60c2 5 6 8 8 8s6-3 8-8"
        fill="#ffffff"
      />
    </svg>
  );
}

export default function Avatar({
  gender,
  className = "",
  size = 70,
  style = {},
}) {
  return gender === "female" ? (
    <FemaleAvatar
      className={className}
      size={size}
      style={style}
    />
  ) : (
    <MaleAvatar
      className={className}
      size={size}
      style={style}
    />
  );
}

export { MaleAvatar, FemaleAvatar };