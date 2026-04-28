import {
  ArrowRight,
  BookOpen,
  Building2,
  GitFork,
  Link2,
  MapPin,
  Star,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export function UserCard({ user, readme, repos }) {
  if (!user) return null;

  const stats = [
    { label: "Repos", value: user.public_repos },
    { label: "Followers", value: user.followers },
    { label: "Following", value: user.following },
  ];

  return (
    <div className="user-card" role="region" aria-label="User profile">
      <div className="user-card-header">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${user.login}'s GitHub profile`}
        >
          <img
            className="user-avatar"
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
          />
        </a>
        <div className="user-info">
          <h2 className="user-name">{user.name || user.login}</h2>
          <a
            className="user-login"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{user.login}
          </a>
          {user.bio && <p className="user-bio">{user.bio}</p>}
        </div>
      </div>

      <div className="user-stats">
        {stats.map(({ label, value }) => (
          <div key={label} className="stat-item">
            <span className="stat-value">{value ?? "–"}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="user-meta">
        {user.location && (
          <span className="meta-item">
            <MapPin size={14} strokeWidth={1.75} />
            {user.location}
          </span>
        )}
        {user.blog && (
          <a
            className="meta-item meta-link"
            href={
              user.blog.startsWith("http") ? user.blog : `https://${user.blog}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link2 size={14} strokeWidth={1.75} />
            {user.blog}
          </a>
        )}
        {user.company && (
          <span className="meta-item">
            <Building2 size={14} strokeWidth={1.75} />
            {user.company}
          </span>
        )}
      </div>

      {readme && (
        <div className="profile-readme">
          <h3 className="section-title">
            <BookOpen size={16} strokeWidth={2} /> Profile README
          </h3>
          <div className="markdown-body">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{readme}</ReactMarkdown>
          </div>
        </div>
      )}

      {repos && repos.length > 0 && (
        <div className="popular-repos">
          <h3 className="section-title">Recently Updated Repositories</h3>
          <div className="repos-grid">
            {repos.map((repo) => (
              <a
                key={repo.id}
                className="repo-card"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h4 className="repo-name">{repo.name}</h4>
                <p className="repo-desc">
                  {repo.description || "No description provided."}
                </p>
                <div className="repo-meta">
                  {repo.language && (
                    <span className="repo-stat">
                      <span className="language-color"></span> {repo.language}
                    </span>
                  )}
                  <span className="repo-stat">
                    <Star size={12} /> {repo.stargazers_count}
                  </span>
                  <span className="repo-stat">
                    <GitFork size={12} /> {repo.forks_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <a
        id="viewProfileBtn"
        className="view-profile-btn"
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View GitHub Profile
        <ArrowRight size={15} strokeWidth={2} />
      </a>
    </div>
  );
}
