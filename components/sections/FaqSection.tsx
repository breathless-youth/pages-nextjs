import { FAQS } from "@/lib/content";

/** 시안 공용 FAQ 아코디언 — 스타일은 시안이 프롭으로 주입한다. */
export function FaqSection({
  heading = "자주 묻는 질문",
  className = "",
  headingClassName = "",
  itemClassName = "",
  questionClassName = "",
  answerClassName = "",
}: {
  heading?: string;
  className?: string;
  headingClassName?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
}) {
  return (
    <section className={className}>
      <h2 className={headingClassName}>{heading}</h2>
      <div className="mt-10 space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className={`group ${itemClassName}`}>
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden ${questionClassName}`}
            >
              {f.q}
              <span
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className={`mt-3 ${answerClassName}`}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
