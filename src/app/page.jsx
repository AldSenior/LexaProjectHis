import HomeClient from "./components/HomeClient";
export const revalidate = 3600;

export default function Home() {
  return <HomeClient />;
}
