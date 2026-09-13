import { ArrowLeft, MapPin, Phone, Navigation, Star, AlertCircle, Search } from 'lucide-react';
import { Page } from '../App';

interface NearbyHospitalsPageProps {
  navigateTo: (page: Page) => void;
}

interface Hospital {
  id: number;
  name: string;
  distance: number;
  rating: number;
  address: string;
  phone: string;
  lat: number;
  lng: number;
}

export default function NearbyHospitalsPage({ navigateTo }: NearbyHospitalsPageProps) {
  const hospitals: Hospital[] = [
    {
      id: 1,
      name: 'City General Hospital',
      distance: 1.2,
      rating: 4.5,
      address: '123 Main St, Downtown',
      phone: '+1 555-0101',
      lat: 37.7749,
      lng: -122.4194
    },
    {
      id: 2,
      name: 'St. Mary Medical Center',
      distance: 2.1,
      rating: 4.7,
      address: '456 Oak Ave, Central',
      phone: '+1 555-0102',
      lat: 37.7739,
      lng: -122.4312
    },
    {
      id: 3,
      name: 'Metropolitan Health Clinic',
      distance: 3.5,
      rating: 4.3,
      address: '789 Pine Rd, Uptown',
      phone: '+1 555-0103',
      lat: 37.7859,
      lng: -122.4264
    },
    {
      id: 4,
      name: 'Riverside Hospital',
      distance: 4.8,
      rating: 4.6,
      address: '321 River St, Westside',
      phone: '+1 555-0104',
      lat: 37.7699,
      lng: -122.4394
    }
  ];

  return (
    <div className="w-full max-w-[375px] min-h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4">
          <button
            onClick={() => navigateTo('home')}
            className="mb-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: '#E8E2DB' }}
          >
            <ArrowLeft size={20} style={{ color: '#1A3263' }} />
          </button>
          <h1 className="text-2xl mb-1" style={{ color: '#1A3263' }}>
            Nearby Hospitals
          </h1>
          <p className="text-sm" style={{ color: '#547792' }}>
            Find medical help near you
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Map Section */}
          <div className="relative h-48 mx-6 mb-4 rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: '#E0F2FE' }}>
            {/* Mock Map Background */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, #E0F2FE 25%, transparent 25%), linear-gradient(-45deg, #E0F2FE 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E0F2FE 75%), linear-gradient(-45deg, transparent 75%, #E0F2FE 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
              opacity: 0.1
            }} />

            {/* User Location Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
              <div className="relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-pulse" style={{ backgroundColor: '#1A3263' }}>
                  <MapPin size={20} color="white" fill="white" />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-3" style={{ backgroundColor: '#1A3263' }} />
              </div>
            </div>

            {/* Hospital Pins */}
            <div className="absolute top-6 right-8">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#ef4444' }}>
                <MapPin size={16} color="white" fill="white" />
              </div>
            </div>
            <div className="absolute bottom-8 left-12">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#ef4444' }}>
                <MapPin size={16} color="white" fill="white" />
              </div>
            </div>
            <div className="absolute top-12 left-20">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: '#ef4444' }}>
                <MapPin size={16} color="white" fill="white" />
              </div>
            </div>

            {/* Map Label */}
            <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#1A3263' }}>
              📍 Your Location
            </div>
          </div>

          {/* Emergency Button */}
          <div className="px-6 mb-4">
            <button className="w-full py-4 rounded-2xl text-white shadow-xl transition-transform active:scale-98 flex items-center justify-center gap-2 relative overflow-hidden" style={{ backgroundColor: '#ef4444' }}>
              <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: '#dc2626', opacity: 0.3 }} />
              <span className="text-2xl">🚨</span>
              <span className="text-lg relative z-10">Emergency Call</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-6 mb-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: '#547792' }} />
              <input
                type="text"
                placeholder="Search hospital..."
                className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
                style={{ backgroundColor: '#F3F4F6', color: '#1A3263', border: '2px solid #E8E2DB' }}
              />
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="px-6 mb-4">
            <div className="rounded-2xl p-4" style={{ backgroundColor: '#FEF3C7' }}>
              <div className="flex items-start gap-3">
                <AlertCircle size={20} style={{ color: '#92400e' }} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm" style={{ color: '#92400e' }}>
                    Based on your symptoms, we recommend visiting a hospital for professional evaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital List */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
            <h3 className="text-sm mb-2" style={{ color: '#1A3263' }}>Nearby Hospitals ({hospitals.length})</h3>

            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="rounded-2xl p-4 shadow-md"
                style={{ backgroundColor: 'white', border: '2px solid #E8E2DB' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm mb-1" style={{ color: '#1A3263' }}>
                      {hospital.name}
                    </h4>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} style={{ color: '#547792' }} />
                        <span className="text-xs" style={{ color: '#547792' }}>{hospital.distance} km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} style={{ color: '#FAB95B' }} fill="#FAB95B" />
                        <span className="text-xs" style={{ color: '#547792' }}>{hospital.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs" style={{ color: '#94a3b8' }}>{hospital.address}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-xl text-white transition-transform active:scale-98 flex items-center justify-center gap-2 text-sm" style={{ backgroundColor: '#22c55e' }}>
                    <Phone size={16} />
                    <span>Call</span>
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl transition-transform active:scale-98 flex items-center justify-center gap-2 text-sm" style={{ backgroundColor: '#1A3263', color: 'white' }}>
                    <Navigation size={16} />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
