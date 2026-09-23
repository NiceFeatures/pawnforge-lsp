const esbuild = require('esbuild');

const production = process.argv.includes('--production');

async function main() {
    // 1. Bundle CLI entry point
    await esbuild.build({
        entryPoints: ['src/cli.ts'],
        bundle: true,
        format: 'cjs',
        minify: production,
        banner: {
            js: '#!/usr/bin/env node',
        },
        sourcemap: !production,
        platform: 'node',
        target: 'node18',
        outfile: 'dist/cli.js',
    });

    // 2. Bundle Server module
    await esbuild.build({
        entryPoints: ['src/server/server.ts'],
        bundle: true,
        format: 'cjs',
        minify: production,
        sourcemap: !production,
        platform: 'node',
        target: 'node18',
        outfile: 'dist/server.js',
    });

    console.log(`[build] Complete: dist/cli.js and dist/server.js (production: ${production})`);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
