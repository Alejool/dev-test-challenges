import { ChevronRight } from "lucide-react";

export function SearchHistory({ history, onSelect, onClear }) {
  if (history.length === 0) return null;

  return (
    <div
      className="history-panel"
      role="complementary"
      aria-label="Search history"
    >
      <div className="history-header">
        <h3 className="history-title">Recent Searches</h3>
        <button
          id="clearHistory"
          className="clear-history-btn"
          onClick={onClear}
          aria-label="Clear all search history"
        >
          Clear all
        </button>
      </div>
      <ul className="history-list" role="list">
        {history.map((item) => (
          <li key={item.login}>
            <button
              className="history-item"
              onClick={() => onSelect(item.login)}
              aria-label={`Search for ${item.login} again`}
            >
              <img
                className="history-avatar"
                src={item.avatar}
                alt={item.login}
              />
              <span className="history-login">@{item.login}</span>
              <ChevronRight
                className="history-arrow"
                size={15}
                strokeWidth={2}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
