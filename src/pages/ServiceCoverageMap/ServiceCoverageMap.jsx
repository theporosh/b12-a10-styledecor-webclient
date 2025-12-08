import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const serviceAreas = [
    {
        id: 1,
        name: "Dhaka City",
        coords: [23.8103, 90.4125],
        radius: 12000,
    },
    {
        id: 2,
        name: "Chattogram City",
        coords: [22.3569, 91.7832],
        radius: 9000,
    },
    {
        id: 3,
        name: "Sylhet City",
        coords: [24.8949, 91.8687],
        radius: 7000,
    },
];

const ServiceCoverageMap = () => {
    return (
        <section className="py-20 bg-[#F7F9F9]">
            <div className="w-11/12 mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1E595D]">
                    Our <span className="text-[#C8A870]">Service Coverage</span>
                </h2>

                <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                    StyleDecor currently offers home & event decoration services across major cities in Bangladesh.
                </p>

                <div className="mt-12 h-[450px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                    <MapContainer
                        center={[23.685, 90.3563]}
                        zoom={7}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {serviceAreas.map((area) => (
                            <div key={area.id}>
                                <Marker position={area.coords}>
                                    <Popup>
                                        <div className="text-[#1E595D] font-semibold">
                                            {area.name}
                                        </div>
                                        <p className="text-sm text-gray-600">Service Available</p>
                                    </Popup>
                                </Marker>

                                <Circle
                                    center={area.coords}
                                    radius={area.radius}
                                    pathOptions={{
                                        color: "#1E595D",
                                        fillColor: "#C8A870",
                                        fillOpacity: 0.25,
                                    }}
                                />
                            </div>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default ServiceCoverageMap;
