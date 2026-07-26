import { FEATURES } from "@/lib/content";

/** 시안 공용 기능 그리드 — 스타일은 시안이 프롭으로 주입한다. */
export function FeatureGrid({
  heading = "이런 기능도 있습니다",
  className = "",
  headingClassName = "",
  cardClassName = "",
  titleClassName = "",
  bodyClassName = "",
}: {
  heading?: string;
  className?: string;
  headingClassName?: string;
  cardClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={className}>
      <h2 className={headingClassName}>{heading}</h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <li key={f.title} className={cardClassName}>
            <h3 className={titleClassName}>{f.title}</h3>
            <p className={bodyClassName}>{f.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
