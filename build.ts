import { bunBuild, getSourceFiles } from "@enalmada/bun-externals";

async function buildWithExternals(): Promise<void> {
	const entrypoints = await getSourceFiles();

	await bunBuild({
		entrypoints,
		outdir: "./dist",
		target: "node",
		external: ["*"],
		root: "./src",
	});
}

void buildWithExternals();
