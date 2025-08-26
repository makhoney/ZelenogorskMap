import { Map, List, Filter, Settings } from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="bg-background border-t border-border px-4 py-2 flex items-center justify-around z-40">
      <button 
        className="flex flex-col items-center gap-1 py-2 px-3 text-primary"
        data-testid="nav-map"
      >
        <Map className="w-5 h-5" />
        <span className="text-xs font-medium">Карта</span>
      </button>
      <button 
        className="flex flex-col items-center gap-1 py-2 px-3 text-muted-foreground hover:text-foreground transition-colors"
        data-testid="nav-list"
      >
        <List className="w-5 h-5" />
        <span className="text-xs">Список</span>
      </button>
      <button 
        className="flex flex-col items-center gap-1 py-2 px-3 text-muted-foreground hover:text-foreground transition-colors"
        data-testid="nav-filter"
      >
        <Filter className="w-5 h-5" />
        <span className="text-xs">Фильтры</span>
      </button>
      <button 
        className="flex flex-col items-center gap-1 py-2 px-3 text-muted-foreground hover:text-foreground transition-colors"
        data-testid="nav-settings"
      >
        <Settings className="w-5 h-5" />
        <span className="text-xs">Настройки</span>
      </button>
    </nav>
  );
}
