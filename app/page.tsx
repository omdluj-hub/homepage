import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "후한의원 구미점-여드름, 다이어트, 교통사고 입원실",
  openGraph: {
    title: "후한의원 구미점-여드름, 다이어트, 교통사고 입원실",
  },
};

export default function Page() {
  return <HomeClient />;
}
