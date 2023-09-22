# Env validation with valibot

Deploying your app with invalid environment variables is a hassle. This package helps you to avoid that.
Inspired by [t3-env](https://github.com/t3-oss/t3-env) which I highly recommend using if zod is already a production dependency.
Otherwise, valibot may more efficient for just environment variable checking.

## Installation

```bash
bun add @enalmada/env-valibot
```

## Usage

### Define your schema

```ts
// src/env.mjs
// @ts-check
import { createEnvSchema, required, validateEnv } from 'env-valibot';
import { enumType, optional, string } from 'valibot';

const serverSchema = createEnvSchema({
    LOG_LEVEL: enumType(['debug', 'info', 'warn', 'error']),
    ANALYZE: optional(string()),
    DATABASE_URL: required('DATABASE_URL'),
});

const clientSchema = createEnvSchema({
    NEXT_PUBLIC_APP_ENV: required('NEXT_PUBLIC_APP_ENV'),
});

const serverEnv = validateEnv(
    serverSchema,
    {
        LOG_LEVEL: process.env.LOG_LEVEL,
        ANALYZE: process.env.ANALYZE,
        DATABASE_URL: process.env.DATABASE_URL,
    },
    process.env.SKIP_ENV_VALIDATION
);

const clientEnv = validateEnv(
    clientSchema,
    {
        NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    },
    process.env.SKIP_ENV_VALIDATION
);

export { serverEnv, clientEnv };
```

`required` is a helper from this library that keeps DRY the message error returned if it doesn't exist

## Alternatives

[t3-env](https://github.com/t3-oss/t3-env)
* only supported zod.  I wanted to use valibot for smaller package size
* only supported buildtime (in progress at time of writing).  I needed runtime variable support.