"use client";

// ...existing code...
import { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Search, Hospital, Pill, Stethoscope, LocateFixed, MapPin, Navigation, Star } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';

// Using your imported Header and Dock components
import Header from '../../components/header';
import Dock from '../../components/Dock';


// --- Enhanced Map & UI Components ---

// --- Main Page Component ---

// --- Main Page Component ---

// Map Controller for smooth "flyTo" animations
function MapFlyToController({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom, { animate: true, duration: 1.5 });
        }
    }, [center, zoom, map]);
    return null;
}

// --- Helper Functions ---

const isValidCoords = (coords) =>
    Array.isArray(coords) && coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1]);

function haversineDistance(coords1, coords2) {
    function toRad(x) { return (x * Math.PI) / 180; }
    const R = 6371; // Earth's radius in km
    const dLat = toRad(coords2[0] - coords1[0]);
    const dLon = toRad(coords2[1] - coords1[1]);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(coords1[0])) * Math.cos(toRad(coords2[0])) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// --- Main Page Component ---

const NearbyFacilitiesPage = () => {
    // Only color at first, no JSX or window usage
    const initialTypeVisuals = {
        Hospital: { icon: null, color: '#3b82f6', marker: null },
        Pharmacy: { icon: null, color: '#16a34a', marker: null },
        Clinic: { icon: null, color: '#ec4899', marker: null },
    };
    const [facilities, setFacilities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);

    // Client-only icons and visuals
    const [typeVisuals, setTypeVisuals] = useState(initialTypeVisuals);
    const [userLocationIcon, setUserLocationIcon] = useState(null);

    // Filters & Sorting
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [sortBy, setSortBy] = useState('distance');
    const [distanceRange, setDistanceRange] = useState(50); // State for distance range

    // UI State
    const [selectedFacilityId, setSelectedFacilityId] = useState(null);
    const listRefs = useRef({});

    // Setup client-only icons after mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const createFacilityIcon = (color) => {
                return L.divIcon({
                    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 drop-shadow-lg"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
                    className: 'bg-transparent border-0',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                });
            };
            setUserLocationIcon(
                L.divIcon({
                    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 h-8"><circle cx="12" cy="12" r="10" fill="#0ea5e9" fill-opacity="0.3"/><circle cx="12" cy="12" r="6" fill="#fff" stroke="#0ea5e9" stroke-width="2"/></svg>`,
                    className: 'bg-transparent border-0',
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                })
            );
            setTypeVisuals({
                Hospital: { icon: <Hospital size={18} />, color: '#3b82f6', marker: createFacilityIcon('#3b82f6') },
                Pharmacy: { icon: <Pill size={18} />, color: '#16a34a', marker: createFacilityIcon('#16a34a') },
                Clinic: { icon: <Stethoscope size={18} />, color: '#ec4899', marker: createFacilityIcon('#ec4899') },
            });
        }
    }, []);

    // Simulate fetching data on component mount
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const initialFacilities = [
                 { id: 'HOS1', position: [26.1205, 85.3647], type: 'Hospital', name: 'Prabhat Tara Hospital', address: 'Brahmapura, Muzaffarpur', contact: '0621-224-1234', hours: '24/7' },
                 { id: 'HOS2', position: [26.1158, 85.3908], type: 'Hospital', name: 'Sadar Hospital', address: 'Club Road, Muzaffarpur', contact: '0621-221-5678', hours: '24/7' },
                 { id: 'PHA1', position: [26.1211, 85.3789], type: 'Pharmacy', name: 'Mithila Pharmacy', address: 'Motijheel, Muzaffarpur', contact: '0987-654-3210', hours: '8am-11pm' },
                 { id: 'CLN1', position: [26.1250, 85.3850], type: 'Clinic', name: 'City Clinic', address: 'Juran Chapra, Muzaffarpur', contact: '0555-555-5555', hours: '9am-6pm' },
                 { id: 'PHA2', position: [26.1095, 85.3755], type: 'Pharmacy', name: 'Apollo Pharmacy', address: 'Kalambag Chowk, Muzaffarpur', contact: '0111-222-3333', hours: '24/7' },
            ];
            setFacilities(initialFacilities);
            setIsLoading(false);
            toast.info("Showing all facilities in the area.");
        }, 1500);
    }, []);
    
    // Fetch real facilities from OpenStreetMap Overpass API
    const fetchFacilitiesFromOSM = async (center, radiusKm = 5) => {
        if (!center) return [];
        const [lat, lon] = center;
        // Query for hospitals, clinics, pharmacies within radius
        const query = `[out:json][timeout:25];(
            node["amenity"~"hospital|clinic|pharmacy"](around:${radiusKm * 1000},${lat},${lon});
            way["amenity"~"hospital|clinic|pharmacy"](around:${radiusKm * 1000},${lat},${lon});
            relation["amenity"~"hospital|clinic|pharmacy"](around:${radiusKm * 1000},${lat},${lon});
        );out center tags;`;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            // Map OSM results to facility objects
            return data.elements.map((el, idx) => ({
                id: el.id || idx,
                position: el.type === 'node' ? [el.lat, el.lon] : [el.center?.lat, el.center?.lon],
                type: el.tags.amenity === 'hospital' ? 'Hospital' : el.tags.amenity === 'clinic' ? 'Clinic' : 'Pharmacy',
                name: el.tags.name || `${el.tags.amenity.charAt(0).toUpperCase() + el.tags.amenity.slice(1)}`,
                address: el.tags['addr:full'] || el.tags['addr:street'] || '',
                contact: el.tags['contact:phone'] || el.tags['phone'] || '',
                hours: el.tags['opening_hours'] || '',
            })).filter(f => isValidCoords(f.position));
        } catch (err) {
            toast.error('Failed to fetch facilities from OpenStreetMap.');
            return [];
        }
    };

    // Update: Fetch facilities when userLocation changes
    useEffect(() => {
        if (userLocation) {
            setIsLoading(true);
            fetchFacilitiesFromOSM(userLocation, distanceRange).then(facilities => {
                setFacilities(facilities);
                setIsLoading(false);
                toast.info(`Showing facilities within ${distanceRange} km.`);
            });
        }
    }, [userLocation, distanceRange]);
    
    // Memoized calculation with distance range filter
    const processedFacilities = useMemo(() => {
        let result = facilities
            .map(f => ({
                ...f,
                distance: userLocation ? haversineDistance(userLocation, f.position) : null,
            }))
            .filter(f =>
                (activeFilter === 'All' || f.type === activeFilter) &&
                f.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (f.distance === null || f.distance <= distanceRange) // Filter by distance if available
            );

        if (sortBy === 'distance' && userLocation) {
            result.sort((a, b) => a.distance - b.distance);
        } else { // Default to name sort if distance sort is not possible
            result.sort((a, b) => a.name.localeCompare(b.name));
        }
        return result;
    }, [facilities, userLocation, activeFilter, searchQuery, sortBy, distanceRange]);

    useEffect(() => {
        if (selectedFacilityId && listRefs.current[selectedFacilityId]) {
            listRefs.current[selectedFacilityId].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [selectedFacilityId]);

    const handleLocate = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const coords = [pos.coords.latitude, pos.coords.longitude];
                    if (isValidCoords(coords)) {
                        setUserLocation(coords);
                        setSortBy('distance');
                        toast.success('Location found! You can now filter by distance.');
                    } else { toast.error('Invalid location data received.'); }
                },
                (err) => { toast.error(err.code === 1 ? 'Location permission denied.' : 'Unable to get location.'); }
            );
        } else { toast.error('Geolocation is not supported by your browser.'); }
    };
    
    const selectedFacility = processedFacilities.find(f => f.id === selectedFacilityId);
    const mapCenter = selectedFacility ? selectedFacility.position : userLocation;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Header />
            <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 pb-28">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                         <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Nearby Facilities</h1>
                         <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLocate} className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg shadow-md hover:bg-sky-600 transition-colors">
                             <LocateFixed size={18} /> Get My Location
                         </motion.button>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center mb-6 p-4 bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-slate-200/80">
                         <div className="relative w-full">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                             <input type="text" placeholder="Search by name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-lg border-transparent focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"/>
                         </div>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                             {['All', 'Hospital', 'Clinic', 'Pharmacy'].map(type => (
                                 <motion.button key={type} onClick={() => setActiveFilter(type)} className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${activeFilter === type ? 'bg-sky-500 text-white shadow' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>
                                     {typeVisuals[type]?.icon || null} {type}
                                 </motion.button>
                             ))}
                         </div>
                         <div className={`lg:col-span-2 p-3 bg-slate-100 rounded-lg transition-opacity ${!userLocation ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <label htmlFor="distance" className="block text-sm font-medium text-slate-700 mb-2">
                                Distance Range: <span className="font-bold text-sky-600">Within {distanceRange} km</span>
                            </label>
                            <input
                                id="distance"
                                type="range"
                                min="1"
                                max="50"
                                value={distanceRange}
                                disabled={!userLocation}
                                onChange={e => setDistanceRange(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
                            />
                         </div>
                     </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 h-[calc(100vh-320px)] min-h-[500px]">
                    <motion.div layout className="lg:col-span-1 overflow-y-auto pr-2 -mr-2">
                        <LayoutGroup>
                            <AnimatePresence>
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-full"><motion.div animate={{ rotate: 360 }} transition={{ ease: "linear", duration: 1, repeat: Infinity }}><Star className="w-10 h-10 text-sky-500" /></motion.div></div>
                                ) : processedFacilities.length > 0 ? (
                                    processedFacilities.map((facility, idx) => (
                                        <motion.div
                                            key={facility.id} ref={el => (listRefs.current[facility.id] = el)} layoutId={facility.id}
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                                            onClick={() => setSelectedFacilityId(facility.id)}
                                            className={`p-4 mb-3 rounded-xl cursor-pointer transition-all duration-300 border-2 ${selectedFacilityId === facility.id ? 'bg-sky-50 border-sky-400 shadow-lg' : 'bg-white hover:bg-slate-50 border-transparent shadow-sm'}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg text-slate-800">{facility.name}</h3>
                                                <div className={`flex items-center gap-1.5 text-xs font-bold px-2 py-1 rounded-full`} style={{backgroundColor: `${typeVisuals[facility.type].color}1A`, color: typeVisuals[facility.type].color}}>
                                                  {typeVisuals[facility.type].icon} {facility.type}
                                                </div>
                                            </div>
                                            <p className="text-slate-500 text-sm mt-1">{facility.address}</p>
                                            {facility.distance !== null && (
                                                <p className="text-sm font-semibold text-sky-600 mt-2">{facility.distance.toFixed(1)} km away</p>
                                            )}
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-slate-500"><p className="font-semibold">No facilities found.</p><p className="text-sm">Try adjusting your search or distance range.</p></div>
                                )}
                            </AnimatePresence>
                        </LayoutGroup>
                    </motion.div>
                    
                    <div className="lg:col-span-2 rounded-2xl shadow-lg overflow-hidden h-full mt-4 lg:mt-0 border border-slate-200" style={{zIndex:1}}>
                        <MapContainer center={userLocation || [26.12, 85.37]} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'/>
                            {userLocation && userLocationIcon && (
                                <Marker position={userLocation} icon={userLocationIcon}>
                                    <Popup>Your current location</Popup>
                                </Marker>
                            )}
                            {processedFacilities.map(facility => (
                                typeVisuals[facility.type]?.marker ? (
                                    <Marker key={facility.id} position={facility.position} icon={typeVisuals[facility.type].marker} eventHandlers={{ click: () => setSelectedFacilityId(facility.id) }}>
                                        <Popup>
                                            <div className="font-sans">
                                                <h4 className="font-bold text-md">{facility.name}</h4>
                                                <p className="text-sm text-slate-600">{facility.type}</p>
                                                <a 
                                                    href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation ? `saddr=${userLocation.join(',')}&` : ''}daddr=${facility.position.join(',')}`} 
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 mt-2 text-sky-600 font-semibold hover:underline"
                                                >
                                                    <Navigation size={14} /> Get Directions
                                                </a>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ) : null
                            ))}
                            <MapFlyToController center={mapCenter} zoom={15} />
                        </MapContainer>
                    </div>
                </div>
            </main>
            <Dock />
            <ToastContainer position="bottom-right" theme="light" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default NearbyFacilitiesPage;