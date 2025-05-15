import HomeClient from "./components/HomeClient";
export const revalidate = 3600;

export const metadata = {
  title: "Афганская Война",
  description: ".",
  keywords: "Афганская Война",
};

export default function Home() {
  return <HomeClient />;
}
