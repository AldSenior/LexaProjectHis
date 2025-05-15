// components/MyMapComponent.tsx
import MyMapClient from "./MyMapClient";
import { events } from "../events";
export default function MyMapComponent({ events }) {
  return (
    <div className="relative w-full h-[600px] mx-auto">
      <MyMapClient events={events} />
    </div>
  );
}
