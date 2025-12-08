import React from 'react';
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Coverage = () => {
    const [centers, setCenters] = useState([]);
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("");

    const mapRef = useRef();

    useEffect(() => {
        fetch("/serviceCenters.json")
            .then((res) => res.json())
            .then((data) => setCenters(data));
    }, []);

    // Handle search
    const handleSearch = () => {
        const match = centers.find((center) =>
            center.city.toLowerCase().includes(search.toLowerCase())
        );

        if (!match) {
            setMessage("❌ No service center found in this location.");
            return;
        }

        setMessage(`✅ Service available at: ${match.city}`);

        // Fly to location
        mapRef.current.flyTo(match.coords, 12, {
            duration: 1.8
        });
    };

    return (
        <section className="py-20 bg-[#F7F9F9]">
            <div className="w-11/12 mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E595D]">
                    Check <span className="text-[#C8A870]">Service Coverage</span>
                </h2>

                <p className="mt-3 text-gray-600 max-w-lg mx-auto">
                    Search your area to check if StyleDecor provides service there.
                </p>

                {/* Search Box */}
                <div className="mt-8 flex justify-center">
                    <input
                        type="text"
                        placeholder="Enter your city name..."
                        className="w-72 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:border-[#C8A870]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        onClick={handleSearch}
                        className="px-6 py-3 bg-[#1E595D] text-white rounded-r-lg hover:bg-[#144043] transition"
                    >
                        Search
                    </button>
                </div>

                {message && (
                    <div className="mt-4 text-lg font-medium text-[#1E595D]">
                        {message}
                    </div>
                )}

                {/* Map Section */}
                <div className="mt-12 h-[450px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <MapContainer
                        center={[23.685, 90.3563]}
                        zoom={7}
                        ref={mapRef}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {centers.map((center) => (
                            <Marker key={center.id} position={center.coords}>
                                <Popup>
                                    <strong className="text-[#1E595D]">{center.name}</strong>
                                    <p className="text-sm text-gray-600">{center.city}</p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default Coverage;
