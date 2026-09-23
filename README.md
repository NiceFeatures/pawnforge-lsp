# PawnForge LSP (Language Server Protocol)

<p align="center">
  <strong>High-performance, standalone Language Server Protocol engine for AMX Mod X Pawn scripting.</strong>
</p>

<p align="center">
  <a href="https://github.com/NiceFeatures/pawnforge-lsp/releases">
    <img alt="GitHub Release" src="https://img.shields.io/github/v/release/NiceFeatures/pawnforge-lsp?style=for-the-badge&color=22c55e">
  </a>
  <img alt="License" src="https://img.shields.io/badge/License-GPL--3.0-blue?style=for-the-badge">
  <img alt="AMXX Compatibility" src="https://img.shields.io/badge/AMXX-1.8.2%20|%201.9%20|%201.10%20|%20ReAPI-orange?style=for-the-badge">
</p>

---

## 🌟 Overview

**`pawnforge-lsp`** is the standalone language intelligence engine extracted from **[PawnForge](https://github.com/NiceFeatures/pawnforge-vscode)**. It provides industry-grade IDE features to any editor that supports the **Language Server Protocol (LSP)**, including:

- **Sublime Text** (via `LSP` package)
- **Notepad++** (via `NppLSPClient`)
- **Neovim / Vim** (via `nvim-lspconfig`)
- **Helix, Emacs, Kate, Zed**, and more.

It runs over **Standard I/O (`--stdio`)** or **TCP Socket (`--socket=<port>`)**, communicating via standard JSON-RPC.

---

## ⚡ Key Capabilities

- **Blazing Fast $O(1)$ Symbol Lookups:** Constant-time hash maps for functions, variables, and constants (~560x faster than linear scans).
- **Workspace References Across `.inc` and `.sma` (`Shift+F12`):** Find occurrences across multiple files even when opening an `.inc` header in isolation.
- **Smart Definition Filtering:** When checking references on a definition, the definition is omitted from results to display only real call sites.
- **Strict Local Scope Isolation:** Local variables are strictly scoped to their enclosing function.
- **Smart String Callback Navigation:** Jump straight to callback targets in `set_task(1.0, "@Callback")`.
- **Workspace Symbols (`Ctrl+T`):** Project-wide fuzzy symbol search.
- **Code Folding:** Folding ranges for preprocessor conditionals (`#if/#else/#endif`), block comments, enums, and functions.
- **Diagnostics:** Captures compilation errors, warnings, and fatal errors (`fatal error 100`) directly.

---

## 🚀 Quick Start & Installation

### Option 1: Standalone Native Binary (No Node.js Required)
Download the standalone executable from [GitHub Releases](https://github.com/NiceFeatures/pawnforge-lsp/releases):
- **Windows:** `pawnforge-lsp.exe`
- **Linux:** `pawnforge-lsp-linux`

Run directly in terminal:
```bash
# Check version
pawnforge-lsp.exe --version

# Run in stdio mode (used by LSP clients)
pawnforge-lsp.exe --stdio
```

### Option 2: Run via Node.js
If you have Node.js installed:
```bash
npm install -g pawnforge-lsp
pawnforge-lsp --stdio
```

---

## 🔌 Editor Integration Guides

### 1. Sublime Text (with LSP Package)
1. Install **Package Control** in Sublime Text.
2. Install the **LSP** package: `Ctrl+Shift+P` -> `Package Control: Install Package` -> `LSP`.
3. Open `Preferences` -> `Package Settings` -> `LSP` -> `Settings`.
4. Add to `clients`:
```json
{
  "clients": {
    "pawnforge": {
      "enabled": true,
      "command": ["C:\\path\\to\\pawnforge-lsp.exe", "--stdio"],
      "selector": "source.pawn, source.amxxpawn",
      "schemes": ["file"]
    }
  }
}
```

### 2. Notepad++ (with NppLSPClient)
1. Install the **NppLSPClient** plugin in Notepad++ (Plugins Admin).
2. Open `Plugins` -> `NppLSPClient` -> `Settings`.
3. Configure the server command:
```json
{
  "pawn": {
    "command": ["C:\\path\\to\\pawnforge-lsp.exe", "--stdio"],
    "rootPatterns": [".git", "scripting", "include"],
    "fileExtensions": [".sma", ".inc"]
  }
}
```

### 3. Neovim (with nvim-lspconfig)
In your `init.lua`:
```lua
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.pawnforge then
  configs.pawnforge = {
    default_config = {
      cmd = { 'pawnforge-lsp', '--stdio' },
      filetypes = { 'pawn', 'amxxpawn' },
      root_dir = lspconfig.util.root_pattern('.git', 'scripting', 'include'),
      settings = {},
    },
  }
end

lspconfig.pawnforge.setup{}
```

---

## 🛠️ CLI Arguments

| Argument | Description |
| :--- | :--- |
| `--stdio` | Use standard input/output for LSP communication (default). |
| `--socket=<port>` | Listen on or connect to a TCP socket port. |
| `--node-ipc` | Use Node.js IPC transport. |
| `-v`, `--version` | Display version and exit. |
| `-h`, `--help` | Display help message and exit. |

---

## 📄 License
This project is licensed under the [GNU General Public License v3.0](LICENSE.txt).
