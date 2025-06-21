import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowLeft} from 'lucide-react';
import { properties as rawProperties } from "../Properties";


interface MapPageProps {
  language: "th" | "en";
  onBack: () => void;
}

const typeToThai: Record<string, string> = {
  Condo: "คอนโด",
  House: "บ้าน",
  Land: "ที่ดิน",
  Townhouse: "ทาวน์เฮาส์",
  Commercial: "อาคารพาณิชย์",
};

const icons: Record<string, L.Icon> = {
  บ้าน: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
    iconSize: [30, 30],
  }),
  คอนโด: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    iconSize: [30, 30],
  }),
  ที่ดิน: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
    iconSize: [30, 30],
  }),
  ทาวน์เฮาส์: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6195/6195700.png",
    iconSize: [30, 30],
  }),
  อาคารพาณิชย์: new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/190/190406.png",
    iconSize: [30, 30],
  }),
};

const trendsTH = ["เพิ่มขึ้น", "ลดลง", "คงที่"];
const trendsEN = ["Increasing", "Decreasing", "Stable"];

const properties = rawProperties.map((p) => {
  const trend = Math.floor(Math.random() * 3);
  return {
    id: p.id,
    name: `${p.type} ${p.location}`,
    type: typeToThai[p.type] || p.type,
    price: `${Number(p.price).toLocaleString()} บาท`,
    lat: p.lat,
    lng: p.lng,
    image: "https://via.placeholder.com/100",
    trendIndex: trend,
    amenities: [
      `ขนาด ${p.sizeSqM} ตร.ม.`,
      `${p.bedrooms} ห้องนอน`,
      `${p.bathrooms} ห้องน้ำ`,
      `เฟอร์ฯ: ${p.furnished}`,
    ],
  };
});

export default function MapPage({ language, onBack }: MapPageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trends = language === "th" ? trendsTH : trendsEN;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
    <div className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <button
      onClick={onBack}
      className="flex items-center text-gray-800 hover:text-black font-medium text-lg"
    >
      <ArrowLeft className="text-xl mr-2" />
      <span className="font-medium">{language === 'th' ? 'กลับ' : 'Back'}</span>
    </button>
  </div>
</div>

<div className="bg-[#f0f4ff] px-4 py-6 text-center">
  <h1 className="text-4xl font-extrabold text-gray-900">
    {language === "th"
      ? "แผนที่อสังหาริมทรัพย์"
      : "Property Map"}
  </h1>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
    {language === "th"
      ? "สำรวจทำเลอสังหาริมทรัพย์ที่คุณสนใจผ่านแผนที่"
      : "Explore property locations of interest through the map"}
  </p>
</div>

      {/* Search */}
      <div className="p-4 bg-white shadow z-10">
        <input
          type="text"
          placeholder={
            language === "th"
              ? "ค้นหาทำเลหรือชื่ออสังหา..."
              : "Search location or property name..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer center={[13.75, 100.5]} zoom={6} className="h-full w-full z-0">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          {filtered.map((p) => (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              icon={icons[p.type] || icons["บ้าน"]}
            >
              <Popup>
                <div className="text-sm">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <div className="font-bold mb-1">{p.name}</div>
                  <div className="mb-1">
                    💰 {language === "th" ? "ราคา" : "Price"}:{" "}
                    <span className="text-red-500">{p.price}</span>
                  </div>
                  <div className="mb-1">📐 {p.amenities[0]}</div>
                  <div className="mb-1">
                    🛏 {p.amenities[1]} | 🛁 {p.amenities[2]}
                  </div>
                  <div className="mb-1">
                    📊 {language === "th" ? "แนวโน้ม" : "Trend"}:{" "}
                    <span className="text-blue-600">
                      {trends[p.trendIndex]}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
