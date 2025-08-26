import { useEffect, useState } from "react";
import type { TelegramWebApp } from "@/types/telegram";

export function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      setWebApp(tg);
      setUser(tg.initDataUnsafe.user);

      // Initialize Telegram WebApp
      tg.ready();
      tg.expand();

      // Set theme colors
      tg.setHeaderColor('#0088CC');
      tg.setBackgroundColor('#FFFFFF');

      // Handle viewport changes
      const handleViewportChange = () => {
        // Force map resize if needed
        const event = new Event('resize');
        window.dispatchEvent(event);
      };

      tg.onEvent('viewportChanged', handleViewportChange);

      setIsReady(true);

      return () => {
        tg.offEvent('viewportChanged', handleViewportChange);
      };
    } else {
      console.log('Running outside Telegram WebApp environment');
      setIsReady(true);
    }
  }, []);

  const shareMessage = (text: string) => {
    if (webApp) {
      webApp.shareMessage(text);
    } else {
      console.log('Share message:', text);
    }
  };

  const showAlert = (message: string) => {
    if (webApp) {
      webApp.showAlert(message);
    } else {
      alert(message);
    }
  };

  const showConfirm = (message: string, callback: (confirmed: boolean) => void) => {
    if (webApp) {
      webApp.showConfirm(message, callback);
    } else {
      const confirmed = confirm(message);
      callback(confirmed);
    }
  };

  return {
    webApp,
    user,
    isReady,
    shareMessage,
    showAlert,
    showConfirm,
  };
}
