import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import { teams } from "../data/memberData";
import type { MemberProps } from "../data/memberData";

function CardMember({ member }: { member: MemberProps }) {
  return (
    <Card className="border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-7">
          {/* Profile Image */}
          <Image
            src={member.image}
            alt={member.name}
            width={128}
            height={128}
            className="rounded-full object-cover ring-2 ring-primary/10"
          />

          {/* Info */}
          <div className="text-center md:text-left space-y-2">
            <p className="text-lg font-semibold text-primary">{member.name}</p>

            <div className="text-sm text-muted-foreground">
              <p>Computer Engineering Student</p>
              <p>Faculty of Engineering</p>
            </div>

            <a
              href={`mailto:${member.email}`}
              className="block text-sm text-primary hover:underline break-words font-medium"
            >
              {member.email}
            </a>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function CardTeam() {
  return (
    <section className="space-y-10">
      {teams.map(({ teamName, teamYear, members }) => (
        <div key={`${teamName}-${teamYear}`} className="space-y-4">
          <header>
            <h3 className="text-xl font-bold text-primary">{teamName}</h3>
            <p className="text-sm text-muted-foreground">{teamYear}</p>
          </header>

          <div className="grid grid-cols-1 gap-2">
            {members.map((member) => (
              <CardMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
