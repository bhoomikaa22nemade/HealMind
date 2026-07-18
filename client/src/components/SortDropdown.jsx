export default function SortDropdown({ value, onChange }) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select">Sort by</label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Relevance</option>
        <option value="rating">Highest Rating</option>
        <option value="experience">Most Experience</option>
      </select>
    </div>
  );
}
