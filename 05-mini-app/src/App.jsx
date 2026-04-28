import { AlertCircle } from "lucide-react";
import { SearchBar } from "./components/SearchBar";
import { SearchHistory } from "./components/SearchHistory";
import { UserCard } from "./components/UserCard";
import { useGithubSearch } from "./hooks/useGithubSearch";

function App() {
  const {
    user,
    readme,
    repos,
    loading,
    error,
    history,
    searchUser,
    clearHistory,
  } = useGithubSearch();

  return (
    <div className="app">
      <main className="card">
        <header className="app-header">
          <svg
            className="github-logo"
            style={{ width: "36px", height: "36px" }}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <div>
            <h1 className="app-title">GitHub Finder</h1>
            <p className="app-subtitle">Search any GitHub user instantly</p>
          </div>
        </header>

        <SearchBar onSearch={searchUser} loading={loading} />

        {error && (
          <div className="error-banner" role="alert">
            <AlertCircle size={16} strokeWidth={2} />
            {error}
          </div>
        )}

        {loading && (
          <div
            className="loading-state"
            aria-live="polite"
            aria-label="Loading user data"
          >
            <div className="skeleton-avatar" />
            <div className="skeleton-lines">
              <div className="skeleton-line w-60" />
              <div className="skeleton-line w-40" />
              <div className="skeleton-line w-80" />
            </div>
          </div>
        )}

        {!loading && <UserCard user={user} readme={readme} repos={repos} />}

        <SearchHistory
          history={history}
          onSelect={searchUser}
          onClear={clearHistory}
        />
      </main>
    </div>
  );
}

export default App;
