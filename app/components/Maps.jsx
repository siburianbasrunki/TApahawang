"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [-5.6766, 105.2181];

export default function Maps() {
  const attributionRef = useRef("Your attribution text");

  return (
    <MapContainer
      className="container mx-auto"
      center={position}
      zoom={13}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution={attributionRef.current}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <p>Desa Wisata Pulau Pahawang</p>
          <a
            href="https://maps.app.goo.gl/mKww9oqeCjUZpWQb8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

Maps.useClient = true;
