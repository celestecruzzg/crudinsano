'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

import { isAuthenticated } from "@/infracstructure/services/session";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!isAuthenticated()) {
        router.replace("/");
        return false;
      }
      return true;
    };

    if (check()) setReady(true);

    const onPageShow = () => check();
    const onPopState = () => check();
    const onVisibility = () => { if (!document.hidden) check(); };

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("popstate", onPopState);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("popstate", onPopState);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [router]);

  if (!ready) return null;

  return (
    <div className="relative h-screen w-screen bg-gradient-to-b from-white to-[var(--color-green)]">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex flex-col ml-16 h-full">
        {/* Header fijo */}
        <div className="sticky top-0 z-20 backdrop-blur-md">
          <Header />
        </div>

        {/* Área scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="container">{children}</div>
        </main>
      </div>
    </div>
  );
}
