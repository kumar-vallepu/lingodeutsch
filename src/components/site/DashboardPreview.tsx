import { motion } from "motion/react";
import { Flame, BookMarked, Target, TrendingUp, Zap, CheckCircle2 } from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">Dashboard</p>
        <h2 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
          A learning command center built for <span className="text-gradient-neon">serious progress</span>.
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong shadow-elegant relative mt-14 overflow-hidden rounded-3xl p-5 sm:p-8"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard icon={Zap} label="XP Points" value="12,840" delta="+340 today" tone="neon" />
          <StatCard icon={Flame} label="Daily Streak" value="14 days" delta="Best: 22 days" tone="cyan" />
          <StatCard icon={BookMarked} label="Vocabulary" value="1,287 words" delta="+12 this week" tone="neon" />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="glass rounded-2xl p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Weekly Progress</p>
                <p className="font-display text-lg font-semibold">5h 42m of practice</p>
              </div>
              <span className="rounded-full bg-neon/15 px-2.5 py-1 text-[11px] font-medium text-neon">+18% vs last week</span>
            </div>
            <WeeklyChart />
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="text-xs text-muted-foreground">Fluency Level</p>
            <div className="mt-4 flex items-center justify-center">
              <ProgressRing value={68} />
            </div>
            <p className="mt-3 text-center text-sm">
              <span className="font-semibold">B1 · Intermediate</span>
            </p>
            <p className="mt-1 text-center text-xs text-muted-foreground">320 XP to B2</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Target className="size-3.5 text-neon" /> Grammar Accuracy
            </div>
            <p className="mt-2 font-display text-3xl font-semibold">94.2%</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {["Dative case mastery", "Modal verb usage", "Word order in subordinate clauses"].map((x) => (
                <li key={x} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-neon" /> {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="size-3.5 text-neon" /> Recent Activity
            </div>
            <ul className="mt-3 space-y-3">
              {[
                { t: "Conversation: At the bakery", x: "+85 XP", time: "2h ago" },
                { t: "Grammar drill: Akkusativ", x: "+40 XP", time: "Yesterday" },
                { t: "Vocabulary review (24 words)", x: "+60 XP", time: "Yesterday" },
              ].map((a) => (
                <li key={a.t} className="flex items-center justify-between rounded-xl bg-white/[0.02] px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium">{a.t}</p>
                    <p className="text-[11px] text-muted-foreground">{a.time}</p>
                  </div>
                  <span className="rounded-full bg-neon/15 px-2 py-0.5 text-[11px] font-semibold text-neon">{a.x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StatCard({
  icon: Icon, label, value, delta, tone,
}: { icon: any; label: string; value: string; delta: string; tone: "neon" | "cyan" }) {
  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className={`grid size-8 place-items-center rounded-lg ${tone === "neon" ? "bg-neon/15 text-neon" : "bg-cyan/15 text-cyan"}`}>
          <Icon className="size-4" />
        </div>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{delta}</p>
    </div>
  );
}

function WeeklyChart() {
  const data = [42, 58, 35, 80, 65, 90, 72];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="mt-5 flex h-40 items-end gap-2">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: `${v}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            className="w-full rounded-t-md bg-gradient-to-t from-primary/30 to-primary shadow-[0_0_18px_-3px_oklch(0.86_0.22_145/0.6)]"
          />
          <span className="text-[10px] text-muted-foreground">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressRing({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative grid size-32 place-items-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} stroke="oklch(0.97 0.005 250 / 0.08)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="60" cy="60" r={r}
          stroke="url(#ring)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="ring" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.22 145)" />
            <stop offset="100%" stopColor="oklch(0.82 0.14 210)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="text-center">
        <p className="font-display text-2xl font-semibold">{value}%</p>
        <p className="text-[10px] text-muted-foreground">to B2</p>
      </div>
    </div>
  );
}
