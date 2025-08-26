import { useState } from "react";
import { Target, RotateCcw, MapPin, Wifi } from "lucide-react";

interface FloatingControlsProps {
  markersCount: number;
  onRefresh: () => void;
}

// Zelenogorsk city bounds
const ZELENOGORSK_BOUNDS = [
  [56.100, 94.520], // Southwest
  [56.140, 94.600]  // Northeast
];

export default function FloatingControls({ markersCount, onRefresh }: FloatingControlsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          
          // Check if location is within Zelenogorsk bounds
          if (lat >= ZELENOGORSK_BOUNDS[0][0] && lat <= ZELENOGORSK_BOUNDS[1][0] &&
              lng >= ZELENOGORSK_BOUNDS[0][1] && lng <= ZELENOGORSK_BOUNDS[1][1]) {
            // Dispatch custom event for map to handle
            window.dispatchEvent(new CustomEvent('centerUserLocation', {
              detail: { lat, lng, zoom: 16 }
            }));
          } else {
            // Center on city center if outside bounds
            window.dispatchEvent(new CustomEvent('centerUserLocation', {
              detail: { lat: 56.120, lng: 94.560, zoom: 14 }
            }));
            alert('Вы находитесь за пределами Зеленогорска');
          }
        },
        () => {
          alert('Не удалось определить местоположение');
        }
      );
    } else {
      alert('Геолокация не поддерживается');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <>
      {/* Right side controls */}
      <div className="floating-controls top-4 right-4">
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleLocationClick}
            className="w-12 h-12 bg-background shadow-lg rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            data-testid="button-locate"
          >
            <Target className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handleRefresh}
            className="w-12 h-12 bg-background shadow-lg rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            data-testid="button-refresh"
          >
            <RotateCcw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Top left stats */}
      <div className="floating-controls top-4 left-4">
        <div className="bg-background/90 backdrop-blur rounded-xl shadow-lg border border-border px-4 py-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-mapAccent" />
              <span className="font-medium" data-testid="text-markers-count">{markersCount}</span>
              <span className="text-muted-foreground">точек</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-1">
              <Wifi className="w-4 h-4 text-success" />
              <span className="text-success text-xs">Онлайн</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom left legend */}
      <div className="floating-controls bottom-20 left-4">
        <div className="bg-background/90 backdrop-blur rounded-xl shadow-lg border border-border p-4 max-w-xs">
          <h3 className="font-semibold text-sm mb-3 text-foreground">Легенда</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-mapAccent rounded-full border border-white"></div>
              <span className="text-muted-foreground">Точки данных</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full border border-white"></div>
              <span className="text-muted-foreground">Активные локации</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
