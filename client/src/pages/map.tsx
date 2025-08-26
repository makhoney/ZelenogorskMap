import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/layout/NavigationHeader";
import BottomNavigation from "@/components/layout/BottomNavigation";
import LeafletMap from "@/components/map/LeafletMap";
import MarkerDetailsPanel from "@/components/map/MarkerDetailsPanel";
import FloatingControls from "@/components/layout/FloatingControls";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import type { Location } from "@shared/schema";

export default function MapPage() {
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { user, isReady } = useTelegramWebApp();

  const { data: locations = [], isLoading, refetch } = useQuery<Location[]>({
    queryKey: ['/api/locations'],
    enabled: isReady,
  });

  const handleMarkerClick = (location: Location) => {
    setSelectedMarker(location);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedMarker(null);
  };

  if (!isReady) {
    return (
      <div className="telegram-webapp-viewport flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="telegram-webapp-viewport flex flex-col">
      <NavigationHeader user={user} />
      
      <main className="flex-1 relative">
        <LeafletMap
          locations={locations}
          onMarkerClick={handleMarkerClick}
          isLoading={isLoading}
        />
        
        <FloatingControls
          markersCount={locations.length}
          onRefresh={() => refetch()}
        />
      </main>

      <MarkerDetailsPanel
        marker={selectedMarker}
        isVisible={showDetails}
        onClose={handleCloseDetails}
      />

      <BottomNavigation />
    </div>
  );
}
