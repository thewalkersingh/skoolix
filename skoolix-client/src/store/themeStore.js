import {create} from "zustand";

const KEY = "skoolix-theme"; // same key the landing page already used

const read = () => {
   try {
      return localStorage.getItem(KEY) || "dark"; // dark by default
   } catch {
      return "dark";
   }
};

const apply = (theme) => {
   document.documentElement.setAttribute("data-theme", theme);
   try {
      localStorage.setItem(KEY, theme);
   } catch { /* storage unavailable */ }
};

export const useThemeStore = create((set, get) => ({
   theme: read(),
   toggle: () => {
      const next = get().theme === "dark" ? "light" : "dark";
      apply(next);
      set({theme: next});
   },
}));

// Apply the saved theme as soon as this module loads (import it in main.jsx).
apply(useThemeStore.getState().theme);