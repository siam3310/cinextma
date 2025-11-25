import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PROTECTED_PATHS: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_AVATAR_PROVIDER_URL: z.url().optional(),
  },
  runtimeEnv: {
    PROTECTED_PATHS: process.env.PROTECTED_PATHS,
    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN,
    NEXT_PUBLIC_AVATAR_PROVIDER_URL: process.env.NEXT_PUBLIC_AVATAR_PROVIDER_URL,
  },
});
