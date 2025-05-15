// components/EventFilter.tsx
import EventFilterClient from "./EventFilterClient";

export default function EventFilter({ onFilter }) {
  return <EventFilterClient onFilter={onFilter} />;
}
