import { Poppins as FontPoppins } from "next/font/google";


export const Poppins = FontPoppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: "--font-poppins",
});