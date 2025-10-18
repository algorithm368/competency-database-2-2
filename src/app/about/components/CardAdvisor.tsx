import Image, { type StaticImageData } from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { advisorInfo } from "@/app/about/data/advisorData";

export default function CardAdvisor() {
  return (
    <section
      id="advisor"
      className="relative flex flex-col items-center justify-center"
    >
      <Card className="border border-border/40 shadow-sm w-full">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            src={advisorInfo.image as StaticImageData | string}
            alt={advisorInfo.name ?? "Advisor"}
            width={128}
            height={128}
            className="rounded-full object-cover ring-2 ring-primary/10"
          />
          <div>
            <h3 className="text-xl font-semibold">{advisorInfo.name}</h3>
            <p className="text-sm text-muted-foreground">
              {advisorInfo.englishName}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <div className="space-y-1">
            {advisorInfo.affiliations?.map((a) => (
              <p key={a.name}>
                {a.url ? (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline"
                  >
                    {a.name}
                  </a>
                ) : (
                  <span>{a.name}</span>
                )}
              </p>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="text-sm text-muted-foreground space-y-1">
            <p>{advisorInfo.contact?.address}</p>
            <p>
              <strong>Email:</strong> {advisorInfo.contact?.email}
            </p>
            <p>
              <strong>Phone:</strong> {advisorInfo.contact?.officePhone}
            </p>
            {advisorInfo.contact?.appointmentUrl && (
              <a
                href={advisorInfo.contact.appointmentUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Book Appointment
              </a>
            )}
          </div>

          <div className="flex justify-center gap-4 pt-3">
            {advisorInfo.socialLinks?.map((s) => (
              <a
                key={s.label ?? s.url}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:opacity-80 text-xl"
                aria-label={s.label ?? "social-link"}
              >
                {s.icon ?? s.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
