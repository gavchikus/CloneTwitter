// constants/theme.ts
export const COLORS = {
    primary: "#1DA1F2",
    background: "#000000",
    surface: "#16181C",
    surfaceLight: "#2F3336",
    white: "#E7E9EA",
    grey: "#71767B",
} as const;

export const THEME = {
    colors: COLORS,
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
    }
};