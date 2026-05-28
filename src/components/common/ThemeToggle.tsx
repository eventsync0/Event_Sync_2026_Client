"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-xl bg-secondary hover:bg-secondary-hover text-txt-secondary transition-colors cursor-pointer"
      aria-label="Changer de thème"
    >
      {isDark
        ? <SunIcon className="w-5 h-5" />
        : <MoonIcon className="w-5 h-5" />
      }
    </button>
  );
}