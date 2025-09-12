"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIcon = new L.Icon({
    iconUrl: '/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '/images/marker-shadow.png',
    shadowSize: [41, 41],
});

interface Props {
    position: [number, number];
    technicianName: string;
}

const LiveTrackingMap: React.FC<Props> = ({ position, technicianName }) => {
    return (
        <div>
            <div className="h-[400px] lg:h-full w-full rounded-2xl overflow-hidden shadow-lg">
                <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={markerIcon}>
                        <Popup>
                            {technicianName} sedang menuju lokasi Anda.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default LiveTrackingMap;