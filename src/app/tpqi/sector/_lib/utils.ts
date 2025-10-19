import { CategoryInfo } from "./types";

export function getCategoryInfo(name: string): CategoryInfo {
  if (name.startsWith("สมรรถนะสนับสนุน")) {
    return {
      type: "สมรรถนะสนับสนุน",
      variant: "default" as const,
    };
  }
  if (name.startsWith("สาขาวิชาชีพ")) {
    return {
      type: "สาขาวิชาชีพ",
      variant: "secondary" as const,
    };
  }
  return {
    type: "ทั่วไป",
    variant: "outline" as const,
  };
}
