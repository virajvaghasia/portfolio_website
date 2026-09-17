import { PROFILE, PUBLICATIONS } from "@/content/site"

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border pt-10">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Writing
      </h2>
      <ul className="space-y-3">
        {PUBLICATIONS.map((p) => (
          <li key={p.title} className="text-sm leading-relaxed">
            {p.href ? (
              <a href={p.href} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                {p.title}
              </a>
            ) : (
              <span>{p.title}</span>
            )}
            <span className="text-muted-foreground"> — {p.venue}, {p.year}</span>
          </li>
        ))}
      </ul>
      {/* The photo, demoted from hero to here — spec §7. */}
      <div className="mt-10 flex items-center gap-3">
        <img
          src="/mypic.png"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
        <p className="text-sm text-muted-foreground">
          {PROFILE.location} ·{" "}
          <a href={`mailto:${PROFILE.email}`} className="text-primary hover:underline">
            {PROFILE.email}
          </a>
        </p>
      </div>
    </footer>
  )
}
