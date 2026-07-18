const CATEGORIES = ["All", "Anxiety", "Career", "Relationship", "Stress"];

export default function FilterButtons({ active, onChange }) {
  return (
    <div className="filter-group" role="group" aria-label="Filter by specialization">
      {CATEGORIES.map((category) => {
        const value = category.toLowerCase();
        const isActive = active.toLowerCase() === value;
        return (
          <button
            key={category}
            type="button"
            className={`filter-btn${isActive ? " active" : ""}`}
            onClick={() => onChange(value)}
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
