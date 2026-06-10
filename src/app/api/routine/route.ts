import { buildRoutine, type RoutinePath } from "@/lib/routine";

type QuizPayload = {
  answers: string[];
  questions: string[];
  path: RoutinePath;
};

export async function POST(req: Request) {
  const { answers, path }: QuizPayload = await req.json();
  const routine = buildRoutine(path ?? "health", answers);
  return Response.json({ routine });
}
