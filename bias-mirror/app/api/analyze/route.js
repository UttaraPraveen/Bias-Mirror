import { NextResponse } from "next/server";

const mockGeminiResponse = {
  neutral_reframe: "The statement suggests that remote work negatively affects employee productivity.",
  perspectives: {
    affected_individual: "Employees may feel judged without consideration of different working styles.",
    authority: "Managers may associate visibility with productivity.",
    societal: "Work culture is still adapting to non-traditional environments.",
    ethical: "It raises questions about trust and autonomy in professional relationships."
  },
  assumptions: [
    "Productivity is best measured by physical presence",
    "All roles require the same working conditions"
  ],
  bias_mirror: "Remote work can actually increase productivity by allowing flexibility and focus.",
  bias_tags: ["Framing Effect", "Confirmation Bias"]
};

export async function POST() {
  return NextResponse.json(mockGeminiResponse);
}
