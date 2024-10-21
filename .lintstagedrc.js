const tsc = () => "bun --bun tsc --noEmit";

export default {
	"**/*.{js,jsx,ts,tsx,json,yaml,yml,md,css,scss}": () => "bun run lint",
	"**/*.{ts,tsx,mjs,cjs}": [tsc],
	// './package.json': ['npm pkg fix', 'fixpack'],
};
