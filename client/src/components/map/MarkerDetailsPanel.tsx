import { X, Share, Navigation } from "lucide-react";
import { useTelegramWebApp } from "@/hooks/useTelegramWebApp";
import type { Location } from "@shared/schema";

interface MarkerDetailsPanelProps {
  marker: Location | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function MarkerDetailsPanel({ marker, isVisible, onClose }: MarkerDetailsPanelProps) {
  const { shareMessage } = useTelegramWebApp();

  if (!marker) return null;

  const handleShare = () => {
    const shareText = `${marker.title}\n${marker.address}\n${marker.description || ''}`;
    shareMessage(shareText);
  };

  const handleDirections = () => {
    const url = `https://maps.google.com/maps?daddr=${marker.lat},${marker.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className={`slide-up fixed inset-x-0 bottom-0 bg-background border-t border-border rounded-t-3xl shadow-2xl z-50 ${isVisible ? 'active' : ''}`}
      data-testid="marker-details-panel"
    >
      <div className="p-6">
        {/* Panel Handle */}
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6"></div>
        
        {/* Marker Details Content */}
        <div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-mapAccent/10 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-mapAccent">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground" data-testid="text-marker-title">
                {marker.title}
              </h3>
              <p className="text-muted-foreground text-sm" data-testid="text-marker-address">
                {marker.address}
              </p>
            </div>
            <button 
              className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center"
              onClick={onClose}
              data-testid="button-close-details"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          {/* Marker Data */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Тип</div>
                <div className="font-medium text-sm" data-testid="text-marker-type">
                  {marker.type}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Статус</div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${marker.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`}></div>
                  <span className={`font-medium text-sm ${marker.status === 'active' ? 'text-success' : 'text-muted-foreground'}`} data-testid="text-marker-status">
                    {marker.status === 'active' ? 'Активен' : 'Неактивен'}
                  </span>
                </div>
              </div>
            </div>
            
            {marker.description && (
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-2">Описание</div>
                <p className="text-sm text-foreground" data-testid="text-marker-description">
                  {marker.description}
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleShare}
                className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                data-testid="button-share-marker"
              >
                <Share className="w-4 h-4" />
                Поделиться
              </button>
              <button 
                onClick={handleDirections}
                className="flex-1 bg-secondary text-secondary-foreground py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                data-testid="button-get-directions"
              >
                <Navigation className="w-4 h-4" />
                Маршрут
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
