# ⚠️ Deprecated - Use Envin Instead

  This package is deprecated and no longer maintained.

  Please use **[envin](https://envin.turbostarter.dev/)** instead for environment variable validation with Valibot.

  ## Why Envin?

  Envin provides the same type-safe environment variable validation using Valibot, but with better developer experience and active maintenance from the Turbostarter team.

  ## Migration

  Migrating to envin is straightforward. Visit the [envin documentation](https://envin.turbostarter.dev/) for complete setup instructions.

  **Example with envin:**
  ```ts
  import { createEnv } from "envin";
  import * as v from "valibot";

  export const env = createEnv({
    client: {
      VITE_API_URL: v.pipe(v.string(), v.url()),
    },
    server: {
      DATABASE_URL: v.pipe(v.string(), v.url()),
      API_SECRET: v.string(),
    },
  });

  ---
  Legacy Documentation

  About

  This package helped avoid deploying apps with invalid environment variables.
  Inspired by https://github.com/t3-oss/t3-env, but using Valibot instead of Zod for smaller bundle size.

  Build Notes

  - Using https://stackoverflow.com/questions/72380007/what-typescript-configuration-produces-output-closest-to-node-js-18-capabilities/72380008#72380008 for current LTS
  - using tsc for types until https://github.com/oven-sh/bun/issues/5141#issuecomment-1727578701 comes around

  Contributing

  This package used https://github.com/changesets/changesets for version management.

  This version:
  - Clearly deprecates the package upfront
  - Directs users to envin with proper links
  - Provides a migration example
  - Collapses the legacy docs to keep the README clean
  - Maintains historical information for existing users
