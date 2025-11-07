export type StandardProps = {
  label: string;
  link: string;
  description: string;
  lastUpdated: string;
};

export const standards: StandardProps[] = [
  {
    label: "TPQI (Thailand Professional Qualification Institute)",
    link: "https://www.tpqi.go.th/th/standard/rQNWewEb3Q",
    description:
      "National competency standards used as criteria for measuring capabilities in each professional field",
    lastUpdated: "Published in January 2021",
  },
  {
    label: "SFIA (Skills Framework for the Information Age) Version 9",
    link: "https://sfia-online.org",
    description: "Globally recognized digital and IT skills standards",
    lastUpdated: "Published in October 2021",
  },
];