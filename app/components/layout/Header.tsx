import Image from "next/image";
import { Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5">
      {/* Welcome */}
      <h1 className="text-lg md:text-xl font-semibold text-gray-700 truncate">
        Hola, Celeste! Qué bueno que regresaste.
      </h1>

      {/* Actions */}
      <div className="flex items-center space-x-3 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm">
        <div className="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </div>
        <div className="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-600" />
        </div>
        <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer border relative">
          <Image
            src="/img/portada-login.webp"
            alt="Profile"
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
