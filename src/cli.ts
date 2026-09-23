/**
 * PawnForge Language Server (LSP)
 * Standalone Language Server Protocol engine for AMX Mod X Pawn.
 * Compatible with VS Code, Sublime Text, Notepad++, Neovim, and any LSP client.
 */

const version = '1.0.1';

if (process.argv.includes('--version') || process.argv.includes('-v')) {
    console.log(`pawnforge-lsp v${version}`);
    process.exit(0);
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`PawnForge Language Server (LSP) for AMX Mod X Pawn
Version: ${version}
Repository: https://github.com/NiceFeatures/pawnforge-lsp

Usage:
  pawnforge-lsp [options]

Options:
  --stdio            Use standard I/O for LSP communication (default)
  --socket=<port>    Listen on or connect to a TCP socket port
  --node-ipc         Use Node.js IPC transport
  -v, --version      Print version number and exit
  -h, --help         Display this help message and exit
`);
    process.exit(0);
}

// If no transport is specified, default to --stdio for seamless editor integration
const hasTransport = process.argv.some(arg => arg === '--stdio' || arg === '--node-ipc' || arg.startsWith('--socket'));
if (!hasTransport) {
    process.argv.push('--stdio');
}

// Start the LSP server
require('./server/server');
