import React, { createContext, useContext, useState, ReactNode } from "react";
import { COLORS } from "@constants/theme";

export interface ThemeColors {
    background: string;
    surface: string;
    text: string;
    textLight: string;
    primary: string;
}

const LIGHT_COLORS: ThemeColors = {
    background: COLORS.background,
    surface: COLORS.surface,
    text: COLORS.text,
    textLight: COLORS.textLight,
    primary: COLORS.primary,
};

const DARK_COLORS: ThemeColors = {
    background: "#121212",
    surface: "#1E1E1E",
    text: "#F5F5F5",
    textLight: "#9BA1A6",
    primary: COLORS.primary,
};

interface ThemeContextValue {
    isDark: boolean;
    colors: ThemeColors;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);

    const value: ThemeContextValue = {
        isDark,
        colors: isDark ? DARK_COLORS : LIGHT_COLORS,
        toggleTheme: () => setIsDark((prev) => !prev),
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme phải được gọi bên trong <ThemeProvider>");
    return ctx;
};