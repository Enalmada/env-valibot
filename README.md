# Env validation with valibot

Deploying your app with invalid environment variables is a hassle. This package helps you to avoid that.
Inspired by [t3-env](https://github.com/t3-oss/t3-env) which I highly recommend using if zod is already a production dependency.
Otherwise, valibot may more efficient for just environment variable checking.

## Getting Started
Read the [documentation](https://env-valibot.vercel.app)

## Build Notes
* Using [latest module and target settings](https://stackoverflow.com/questions/72380007/what-typescript-configuration-produces-output-closest-to-node-js-18-capabilities/72380008#72380008) for current LTS
* using tsc for types until [bun support](https://github.com/oven-sh/bun/issues/5141#issuecomment-1727578701) comes around

## Contribute
Using [changesets](https://github.com/changesets/changesets) so please remember to run "changeset" with any PR.  
Give consideration for the summary as it is what will show up in the changelog.