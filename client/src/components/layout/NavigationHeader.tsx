import { MapPin, User } from "lucide-react";

interface NavigationHeaderProps {
  user?: {
    first_name?: string;
    username?: string;
  } | null;
}

export default function NavigationHeader({ user }: NavigationHeaderProps) {
  return (
    <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between shadow-sm z-50 relative">
      <div className="flex items-center gap-3">
        <MapPin className="w-5 h-5" />
        <h1 className="font-semibold text-lg">Зеленогорск</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm opacity-90">
          {user?.first_name || user?.username || 'Пользователь'}
        </div>
        <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
