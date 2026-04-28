import { useEffect, useState } from 'react';

const HISTORY_KEY = 'githubSearchHistory';
const MAX_HISTORY = 8;

export function useGithubSearch() {
  const [user, setUser] = useState(null);
  const [readme, setReadme] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const searchUser = async (username) => {
    const query = username.trim();
    if (!query) return;

    setLoading(true);
    setError(null);
    setUser(null);
    setReadme(null);
    setRepos([]);

    try {
      const res = await fetch(`https://api.github.com/users/${query}`);
      if (res.status === 404) throw new Error(`User "${query}" not found`);
      if (res.status === 403) throw new Error('GitHub API rate limit exceeded. Try again later.');
      if (!res.ok) throw new Error('Something went wrong. Please try again.');

      const data = await res.json();
      setUser(data);

      setHistory((prev) => {
        const filtered = prev.filter((u) => u.login !== data.login);
        return [{ login: data.login, avatar: data.avatar_url }, ...filtered].slice(0, MAX_HISTORY);
      });

      const [readmeRes, reposRes] = await Promise.allSettled([
        fetch(`https://api.github.com/repos/${query}/${query}/readme`, {
          headers: { Accept: 'application/vnd.github.raw+json' }
        }),
        fetch(`https://api.github.com/users/${query}/repos?sort=updated&per_page=6`)
      ]);

      if (readmeRes.status === 'fulfilled' && readmeRes.value.ok) {
        const text = await readmeRes.value.text();
        setReadme(text);
      }

      if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
        const reposData = await reposRes.value.json();
        setRepos(reposData || []);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { user, readme, repos, loading, error, history, searchUser, clearHistory };
}
