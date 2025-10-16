// components/about/advisor-section.tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const advisors = [
  {
    name: "Dr. Sarah Wilson",
    title: "Academic Advisor",
    image: "/advisors/sarah.jpg",
  },
  // Add more advisors
];

export function AdvisorSection() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Advisors</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {advisors.map((advisor) => (
            <Card key={advisor.name}>
              <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={advisor.image} alt={advisor.name} />
                  <AvatarFallback>
                    {advisor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{advisor.name}</CardTitle>
                  <p className="text-muted-foreground">{advisor.title}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
