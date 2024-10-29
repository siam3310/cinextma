import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            //@ts-expect-error this is a custom color name
            "secondary-background": "#F4F4F5",
          },
        },
        dark: {
          colors: {
            background: "#0D0C0F",
            //@ts-expect-error this is a custom color name
            "secondary-background": "#18181B",
          },
        },
      },
    }),
  ],
};

export default config;
