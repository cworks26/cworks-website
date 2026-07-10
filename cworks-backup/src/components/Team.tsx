"use client";

import { useState, useEffect } from "react";
import SpotlightCard from "./SpotlightCard";
import { AnimatedSection } from "./AnimatedSection";

// ---------------------------------------------------------------------------
// Team data
// ---------------------------------------------------------------------------

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  github: string;
  githubUsername: string;
  linkedin: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Anwaar Batala",
    role: "Developer",
    focus: "Turning ideas into real solutions through code.",
    github: "https://github.com/AnwaarBatala",
    githubUsername: "AnwaarBatala",
    linkedin: "https://linkedin.com/in/anwaar-batala",
  },
  {
    name: "Benjamin Ongom",
    role: "UI/UX Designer",
    focus: "Simple, intuitive, and meaningful user experiences.",
    github: "https://github.com/benjimanongom",
    githubUsername: "benjimanongom",
    linkedin: "https://linkedin.com/in/benjamin-ongom",
  },
  {
    name: "Elisha Benjamin",
    role: "Web Developer",
    focus: "Responsive websites with simplicity, performance, and modern design.",
    github: "https://github.com/Elisha-Benjamin",
    githubUsername: "Elisha-Benjamin",
    linkedin: "https://linkedin.com/in/elisha-benjamin",
  },
  {
    name: "Jonathan Miyingo",
    role: "Developer",
    focus: "Building impactful things through curiosity and code.",
    github: "https://github.com/JonathanMiyingo",
    githubUsername: "JonathanMiyingo",
    linkedin: "https://linkedin.com/in/jonathan-miyingo",
  },
  {
    name: "Mark Lui",
    role: "Software Developer & Cloud Architect",
    focus: "Desktop apps, inventory systems, and automation tools.",
    github: "https://github.com/marklui",
    githubUsername: "marklui",
    linkedin: "https://linkedin.com/in/mark-lui",
  },
  {
    name: "Moses Leo",
    role: "Developer",
    focus: "Combining creativity with AI for intelligent solutions.",
    github: "https://github.com/mosesleo01",
    githubUsername: "mosesleo01",
    linkedin: "https://linkedin.com/in/moses-leo",
  },
  {
    name: "Otwiine Olweny",
    role: "Developer & Geospatial Analyst",
    focus: "Geospatial studies meets modern web development.",
    github: "https://github.com/OtwiineOlweny",
    githubUsername: "OtwiineOlweny",
    linkedin: "https://linkedin.com/in/otwiine-olweny",
  },
];

// ---------------------------------------------------------------------------
// GitHub avatar hook
// ---------------------------------------------------------------------------

const avatarCache = new Map<string, string>();

function useGitHubAvatar(username: string) {
  const cached = avatarCache.get(username) ?? null;
  const [avatarUrl, setAvatarUrl] = useState<string | null>(cached);
  const [loading, setLoading] = useState(cached === null);

  useEffect(() => {
    if (cached !== null) return;

    let cancelled = false;

    fetch(`https://api.github.com/users/${username}`, {
      signal: AbortSignal.timeout(8000),
    })
      .then((res) => {
        if (!res.ok) throw new Error("GitHub user not found");
        return res.json();
      })
      .then((data: { avatar_url?: string }) => {
        if (cancelled) return;
        const url = data.avatar_url ?? null;
        if (url) avatarCache.set(username, url);
        setAvatarUrl(url);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setAvatarUrl(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username, cached]);

  return { avatarUrl, loading };
}

// ---------------------------------------------------------------------------
// Member card — SpotlightCard wrapper with avatar + info
// ---------------------------------------------------------------------------

function MemberCard({ member }: { member: TeamMember }) {
  const { avatarUrl, loading } = useGitHubAvatar(member.githubUsername);
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <SpotlightCard
      spotlightColor="rgba(8, 21, 166, 0.15)"
      className="flex flex-col gap-4 h-full"
    >
      {/* Avatar */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-neutral-700/50">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-neutral-800" />
        ) : avatarUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatarUrl}
            alt={`${member.name}'s GitHub profile picture`}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : null}
        <span
          className={`absolute inset-0 flex items-center justify-center text-xl font-bold text-neutral-400 ${
            avatarUrl && !loading ? "opacity-0" : ""
          }`}
          aria-hidden
        >
          {initials}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white leading-tight">
          {member.name}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-cyan">{member.role}</p>
        <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
          {member.focus}
        </p>
      </div>

      {/* Social links */}
      <div className="flex gap-4 pt-2 border-t border-neutral-800">
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 transition-colors hover:text-white"
          aria-label={`${member.name} on GitHub`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 transition-colors hover:text-white"
          aria-label={`${member.name} on LinkedIn`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </SpotlightCard>
  );
}

// ---------------------------------------------------------------------------
// Public Team component
// ---------------------------------------------------------------------------

export function Team() {
  return (
    <section
      id="team"
      className="relative bg-surface/50 py-24 md:py-32"
      role="region"
      aria-label="Team member profiles"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <span className="text-sm font-mono text-cyan uppercase tracking-wider">
            The People Behind CWorks
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            A team that learns,
            <br />
            <span className="text-neutral-500">builds, and grows together.</span>
          </h2>
        </AnimatedSection>

        {/* Grid of member cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
