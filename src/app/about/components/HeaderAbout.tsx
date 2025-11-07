import React from "react";

type SectionHeaderProps = {
  readonly title: string;
  /** Use "h1" for page main title or "h2" for section title */
  readonly titleAs?: "h1" | "h2";
  /** Optional small decorative line under the title (default: true) */
  readonly showDecorativeLine?: boolean;
  /** Optional short description paragraph */
  readonly description?: string;
  /** center content (default: true) */
};

export default function HeaderAbout({
  title,
  titleAs = "h2",
  showDecorativeLine = true,
  description,
}: SectionHeaderProps) {
  const isH1 = titleAs === "h1";

  const titleCls = isH1
    ? "text-4xl md:text-5xl font-bold bg-primary bg-clip-text text-transparent mb-4 pt-5"
    : "text-2xl md:text-3xl font-bold text-primary mb-4";

  return (
    <section className="text-center mb-10">
      <div>
        {isH1 ? (
          <h1 className={titleCls}>{title}</h1>
        ) : (
          <h2 className={titleCls}>{title}</h2>
        )}

        {showDecorativeLine && (
          <div
            className={
              isH1
                ? "w-12 h-px bg-primary mx-auto mb-6"
                : "w-16 h-px bg-primary mx-auto mb-6"
            }
            aria-hidden
          />
        )}

        {description && (
          <p
            className={`${
              isH1 ? "text-lg md:text-xl" : "text-base md:text-lg"
            } text-primary leading-relaxed max-w-3xl mx-auto`}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
