"use client";

import { Dumbbell, LayoutDashboard, BicepsFlexed, Salad, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession } from "@/infracstructure/services/session";
import toast from "react-hot-toast";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { icon: LayoutDashboard, href: "/dashboard" },
    { icon: BicepsFlexed, href: "/health" },
    { icon: Salad, href: "/nutrition" },
  ];

  const handleLogout = () => {
    // Limpia tokens/usuario
    clearSession();
    // Opcional: limpieza adicional (estado global, caches)
    // Redirige al login/home
    toast.success("Sesión cerrada");
    router.replace("/auth");
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-22 flex flex-col items-center py-8">
      {/* Logo */}
      <div className="mb-10">
        <Dumbbell className="w-7 h-7 text-[#B6D99B]" />
      </div>

      {/* Nav */}
      <nav className="flex flex-col items-center space-y-6 flex-1">
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link href={item.href} key={i}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition cursor-pointer ${
                  isActive ? "bg-[#B6D99B] text-white" : "bg-white text-gray-500 hover:shadow-md"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto">
        <button
          type="button"
          onClick={handleLogout}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm hover:shadow-md transition cursor-pointer"
          aria-label="Cerrar sesión"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
