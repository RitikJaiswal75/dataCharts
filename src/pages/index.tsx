import Image from "next/image";
import { Inter } from "next/font/google";
import MainComponent from "@/components/MainComponent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <MainComponent />;
}
