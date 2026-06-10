import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "روتین من",
  description: "با ۵ سوال ساده روتین کاملاً اختصاصی برای پوست، سلامت یا ورزش دریافت کن.",
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
