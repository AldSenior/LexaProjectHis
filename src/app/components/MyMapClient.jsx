"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import EventPopup from "./EventPopup";
import { urezpers } from "../events";

export default function MyMapClient({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [allowAddingMarkers, setAllowAddingMarkers] = useState(false);
  const [customEvents, setCustomEvents] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("customEvents");
      if (saved) {
        setCustomEvents(JSON.parse(saved));
      }
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    const rect = containerRef.current.getBoundingClientRect();
    const mapWidth = mapRef.current.offsetWidth * scale;
    const mapHeight = mapRef.current.offsetHeight * scale;

    const newTranslateX = Math.max(rect.width - mapWidth, Math.min(0, dx));
    const newTranslateY = Math.max(rect.height - mapHeight, Math.min(0, dy));
    setTranslate({ x: newTranslateX, y: newTranslateY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMarkerClick = (event) => {
    const eventsAtCoordinates = allEvents.filter(
      (e) =>
        e.coords.lat === event.coords.lat && e.coords.lng === event.coords.lng,
    );
    setSelectedEvent(eventsAtCoordinates);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  const handleMapClick = (e) => {
    if (isDragging || showPopup || !allowAddingMarkers) return;
    const bounds = mapRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    const lng =
      ((e.clientX - bounds.left - translate.x) /
        scale /
        mapRef.current.offsetWidth -
        0.5) *
      360;
    const lat =
      ((e.clientY - bounds.top - translate.y) /
        scale /
        mapRef.current.offsetHeight -
        0.5) *
      180;

    setClickedCoordinates({ x, y, lat, lng });
    setShowPopup(true);
  };

  const handlePopupSubmit = (formData) => {
    const newEvent = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      date: formData.date || new Date().toISOString().split("T")[0],
      coords: { lat: clickedCoordinates.lat, lng: clickedCoordinates.lng },
      description: formData.description || "Событие добавлено пользователем",
      category: formData.category || "Пользовательское",
      personalities: formData.personalities.map((id) => ({
        ...urezpers.find((p) => p.id === id),
      })),
    };

    const updatedEvents = [...customEvents, newEvent];
    setCustomEvents(updatedEvents);

    if (typeof window !== "undefined") {
      localStorage.setItem("customEvents", JSON.stringify(updatedEvents));
    }

    setShowPopup(false);
    setClickedCoordinates(null);
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
    setClickedCoordinates(null);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newScale = Math.max(1, Math.min(3, scale * delta));
    const mapWidth = mapRef.current.offsetWidth * newScale;
    const mapHeight = mapRef.current.offsetHeight * newScale;

    const newTranslateX = Math.max(
      rect.width - mapWidth,
      Math.min(0, mouseX - (mouseX - translate.x) * (newScale / scale)),
    );
    const newTranslateY = Math.max(
      rect.height - mapHeight,
      Math.min(0, mouseY - (mouseY - translate.y) * (newScale / scale)),
    );

    setScale(newScale);
    setTranslate({ x: newTranslateX, y: newTranslateY });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    if (!isClient) return;

    const mapElement = mapRef.current;
    const containerElement = containerRef.current;
    if (mapElement && containerElement) {
      mapElement.addEventListener("wheel", handleWheel, { passive: false });
      mapElement.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);

      return () => {
        mapElement.removeEventListener("wheel", handleWheel);
        mapElement.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange,
        );
      };
    }
  }, [isDragging, scale, translate, isClient]);

  if (!isClient) return null;

  const allEvents = [...(events || []), ...customEvents];

  return (
    <div className="relative w-full h-[600px] mx-auto">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl"
      >
        <div
          id="map"
          ref={mapRef}
          className="absolute w-full h-full bg-cover bg-center cursor-grab"
          onClick={handleMapClick}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: "top left",
            backgroundImage: "url('/kartalexa.jpg')",
            backgroundColor: "#F4A261",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <motion.button
            onClick={toggleFullscreen}
            className="bg-[#D4A017] text-[#2F2F2F] px-4 py-2 rounded-full hover:bg-[#F4A261] transition-shadow shadow-md hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFullscreen ? "Выйти из полноэкранного" : "Полноэкранный режим"}
          </motion.button>
        </div>
        <EventPopup
          isVisible={showPopup}
          coordinates={clickedCoordinates}
          onSubmit={handlePopupSubmit}
          onCancel={handlePopupCancel}
        />
        <Modal
          isVisible={modalVisible}
          onClose={closeModal}
          event={selectedEvent}
        />
      </div>
    </div>
  );
}
