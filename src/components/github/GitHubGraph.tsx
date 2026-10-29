import { site } from "@/lib/site";
import { BlockHead } from "../Page";
import { GraphSweep } from "./GraphSweep";

type Day = { date: string; contributionCount: number; contributionLevel: string; weekday: number };
type Calendar = { totalContributions: number; weeks: { contributionDays: Day[] }[] };

const QUERY = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel weekday}}}}}}`;

const LEVEL: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function fetchCalendar(): Promise<Calendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login: site.githubUser } }),
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors) return null;
    return json.data?.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch {
    return null;
  }
}

const CELL = 10;
const GAP = 3;
const LEFT = 28;
const TOP = 16;
const STEP = CELL + GAP;

function dayLabel(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Renders nothing when the token is missing or GitHub fails, so the home page never shows fake data. */
export async function GitHubGraph() {
  const cal = await fetchCalendar();
  if (!cal || !cal.weeks.length) return null;

  const days = cal.weeks.flatMap((w) => w.contributionDays);
  let streak = 0;
  let run = 0;
  let active = 0;
  for (const d of days) {
    if (d.contributionCount > 0) {
      active++;
      run++;
      streak = Math.max(streak, run);
    } else run = 0;
  }

  const months: { x: number; label: string }[] = [];
  let lastMonth = -1;
  cal.weeks.forEach((w, col) => {
    const first = w.contributionDays[0];
    if (!first) return;
    const d = new Date(first.date + "T00:00:00Z");
    if (d.getUTCMonth() !== lastMonth && d.getUTCDate() <= 7) {
      months.push({ x: LEFT + col * STEP, label: d.toLocaleString("en", { month: "short", timeZone: "UTC" }) });
      lastMonth = d.getUTCMonth();
    }
  });

  const W = LEFT + cal.weeks.length * STEP;
  const H = TOP + 7 * STEP;

  return (
    <section className="mt-16">
      <BlockHead
        title="GitHub"
        all={{ href: `https://github.com/${site.githubUser}`, label: `@${site.githubUser}`, external: true }}
      />
      <div className="panel">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(0,120px)_minmax(0,1fr)]">
          <dl className="m-0 grid grid-cols-3 gap-4 md:grid-cols-1">
            {[
              ["Last 12 months", cal.totalContributions.toLocaleString("en")],
              ["Longest streak", `${streak} days`],
              ["Active days", `${Math.round((active / days.length) * 100)}%`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[13px] text-muted">{k}</dt>
                <dd className="mt-0.5 text-[22px] leading-[1.1] font-bold tabular-nums font-stretch-115% md:text-[28px]">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <GraphSweep>
            <svg
              className="graph block"
              viewBox={`0 0 ${W} ${H}`}
              width={W}
              height={H}
              role="img"
              aria-label={`${cal.totalContributions} contributions in the last 12 months`}
            >
              {months.map((m) => (
                <text key={m.x} x={m.x} y={10}>
                  {m.label}
                </text>
              ))}
              {(
                [
                  ["Mon", 1],
                  ["Wed", 3],
                  ["Fri", 5],
                ] as const
              ).map(([label, r]) => (
                <text key={label} x={0} y={TOP + r * STEP + 9}>
                  {label}
                </text>
              ))}
              {cal.weeks.map((w, col) =>
                w.contributionDays.map((d) => (
                  <rect
                    key={d.date}
                    className="c"
                    data-l={LEVEL[d.contributionLevel] ?? 0}
                    data-n={d.contributionCount}
                    data-d={dayLabel(d.date)}
                    x={LEFT + col * STEP}
                    y={TOP + d.weekday * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    style={{ "--c": col, "--r": d.weekday } as React.CSSProperties}
                  />
                )),
              )}
            </svg>
          </GraphSweep>
        </div>
      </div>
    </section>
  );
}
