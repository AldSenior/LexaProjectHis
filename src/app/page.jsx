import HomeClient from "./components/HomeClient";
export const revalidate = 3600;

export const metadata = {
  title: "Революция 1917 года",
  description:
    "Исследуйте события, личности и документы Российской революции 1917 года через интерактивные карты, викторины и хронологии.",
  keywords:
    "Революция 1917, Февральская революция, Октябрьская революция, история России",
};

export default function Home() {
  return <HomeClient />;
}
