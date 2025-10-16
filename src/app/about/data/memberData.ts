export interface TeamProps {
  teamName?: string;
  teamYear: string;
  members: MemberProps[];
}

export interface MemberProps {
  name: string;
  image: string; // e.g. "/images/Jeerapat.png"
  email?: string;
}

export const teams: TeamProps[] = [
  {
    teamName: "Team SFIA",
    teamYear: "2024",
    members: [
      {
        name: "Ms. Kornkanok Rinphon",
        image: "/images/Kornkanok.png",
        email: "kornkanok@gmail.com",
      },
      {
        name: "Mr. Tanabodee Boonrak",
        image: "/images/Tanabodee.png",
        email: "tanabodee@gmail.com",
      },
      {
        name: "Ms. Phannita Khamsaem",
        image: "/images/Phannita.png",
        email: "phannita.forwork16@gmail.com",
      },
    ],
  },
  {
    teamName: "Team TPQI",
    teamYear: "2024",
    members: [
      {
        name: "Ms. Phatnarin Saewang",
        image: "/images/Phatnarin.png",
        email: "phatnarin@gmail.com",
      },
      {
        name: "Ms. Sukanya Wandi",
        image: "/images/Sukanya.png",
        email: "sukanyawandi@gmail.com",
      },
    ],
  },
  {
    teamName: "Team Competency Database V2",
    teamYear: "2025",
    members: [
      {
        name: "Mr. Jeerapat Kahyaisiang",
        image: "/images/Jeerapat.png",
        email: "jeerapat5870@gmail.com",
      },
      {
        name: "Mr. Natthaphat Jaichue",
        image: "/images/Natthapat.png",
        email: "natthaphat@gmail.com",
      },
      {
        name: "Mr. Siriwat Chairak",
        image: "/images/Siriwat.jpeg",
        email: "siriwat.chr@gmail.com",
      },
    ],
  },
];
