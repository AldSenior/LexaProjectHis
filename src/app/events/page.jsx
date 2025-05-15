import { events } from "../events";
import EventsClient from "../components/EventClient";

export const revalidate = 3600;

export const metadata = {
  title: "События войны в Афганистане",
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F2F2F] to-[#A0522D] flex flex-col items-center p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D4A017] font-['Cinzel'] mb-6 text-center">
        События войны
      </h1>
      <EventsClient events={events} />
    </div>
  );
}
