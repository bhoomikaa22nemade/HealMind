export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="icon" aria-hidden="true">
        {/* magnifying glass icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line
            x1="16.65"
            y1="16.65"
            x2="21"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search by name or specialization..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search counsellors"
      />
    </div>
  );
}
