import { Search, X } from "lucide-react";
import { useRef, useState } from "react";

export function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
      aria-label="Search GitHub user"
    >
      <div className="search-input-wrapper">
        <Search className="search-icon" size={16} strokeWidth={2} />
        <input
          ref={inputRef}
          id="usernameInput"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search a GitHub username…"
          disabled={loading}
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button
            type="button"
            className="clear-input-btn"
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
            aria-label="Clear input"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}
      </div>
      <button
        id="searchBtn"
        type="submit"
        className="search-btn"
        disabled={loading || !value.trim()}
      >
        {loading ? <span className="spinner" /> : "Search"}
      </button>
    </form>
  );
}
