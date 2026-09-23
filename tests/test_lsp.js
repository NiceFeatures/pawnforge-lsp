const { spawn } = require('child_process');
const path = require('path');
const assert = require('assert');

console.log('Testing pawnforge-lsp over stdio JSON-RPC...');

const exePath = path.resolve(__dirname, '../bin/pawnforge-lsp.exe');
const proc = spawn(exePath, ['--stdio']);

let buffer = '';
let initialized = false;

const initMsg = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
        processId: process.pid,
        rootUri: null,
        capabilities: {}
    }
};

const payload = JSON.stringify(initMsg);
const message = `Content-Length: ${Buffer.byteLength(payload, 'utf8')}\r\n\r\n${payload}`;

proc.stdout.on('data', (data) => {
    buffer += data.toString();
    const headerEnd = buffer.indexOf('\r\n\r\n');
    if (headerEnd !== -1) {
        const body = buffer.substring(headerEnd + 4);
        try {
            const resp = JSON.parse(body);
            if (resp.id === 1 && resp.result && resp.result.capabilities) {
                console.log('✅ LSP Initialize Response Received!');
                console.log('   Capabilities:', Object.keys(resp.result.capabilities));
                assert.ok(resp.result.capabilities.definitionProvider, 'Missing definitionProvider');
                assert.ok(resp.result.capabilities.referencesProvider, 'Missing referencesProvider');
                assert.ok(resp.result.capabilities.hoverProvider, 'Missing hoverProvider');
                assert.ok(resp.result.capabilities.completionProvider, 'Missing completionProvider');
                assert.ok(resp.result.capabilities.foldingRangeProvider, 'Missing foldingRangeProvider');
                console.log('🎉 LSP stdio protocol validation SUCCESSFUL!');
                initialized = true;
                proc.kill();
                process.exit(0);
            }
        } catch (e) {
            // Buffer might not be complete yet
        }
    }
});

proc.stderr.on('data', (d) => {
    // console.error('stderr:', d.toString());
});

proc.stdin.write(message);

setTimeout(() => {
    if (!initialized) {
        console.error('❌ Timeout waiting for LSP response');
        proc.kill();
        process.exit(1);
    }
}, 5000);
