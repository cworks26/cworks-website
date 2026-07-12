// MCP Test Harness — sends JSON-RPC init + tools/list to MCP servers
// Usage: node mcp_test_harness.mjs <package-name> [env vars...]

import { spawn } from 'child_process';

const PKG = process.argv[2];
if (!PKG) {
  console.error('Usage: node mcp_test_harness.mjs <package-name>');
  process.exit(1);
}

const env = { ...process.env };
for (let i = 3; i < process.argv.length; i++) {
  const [k, v] = process.argv[i].split('=');
  if (k && v) env[k] = v;
}

console.log(`\n=== TEST: ${PKG} ===`);
console.log(`Environment: Node ${process.version}, Platform ${process.platform}`);

const proc = spawn('npx', ['-y', PKG], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env,
  shell: process.platform === 'win32',
});

let stdout = '';
let stderr = '';
const results = [];

proc.stdout.on('data', (d) => { stdout += d.toString(); });
proc.stderr.on('data', (d) => { stderr += d.toString(); });
proc.on('error', (e) => { results.push(['PROCESS_ERROR', e.message]); });

// Phase 1: Send MCP initialize
setTimeout(() => {
  const initMsg = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'mcp-test-harness', version: '1.0.0' },
    },
  }) + '\n';
  proc.stdin.write(initMsg);
  results.push(['SENT', 'initialize']);
}, 1000);

// Phase 2: Send initialized notification
setTimeout(() => {
  const notif = JSON.stringify({
    jsonrpc: '2.0',
    method: 'notifications/initialized',
  }) + '\n';
  proc.stdin.write(notif);
  results.push(['SENT', 'notifications/initialized']);
}, 2000);

// Phase 3: List tools
setTimeout(() => {
  const listMsg = JSON.stringify({
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list',
    params: {},
  }) + '\n';
  proc.stdin.write(listMsg);
  results.push(['SENT', 'tools/list']);
}, 3000);

// Phase 4: Collect and report
setTimeout(() => {
  proc.kill();
  console.log('\n--- RESULTS ---');
  results.forEach((r) => console.log(`  [${r[0]}] ${r[1]}`));

  // Parse MCP responses from stdout
  const lines = stdout.split('\n').filter(Boolean);
  const responses = lines
    .map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter(Boolean);

  console.log(`\nMCP responses received: ${responses.length}`);
  responses.forEach((r) => {
    if (r.result) {
      if (r.result.serverInfo) {
        console.log(`  INIT: server=${r.result.serverInfo.name} v${r.result.serverInfo.version}`);
      }
      if (r.result.tools) {
        console.log(`  TOOLS: ${r.result.tools.length} tools listed`);
        r.result.tools.slice(0, 10).forEach((t) => {
          console.log(`    - ${t.name}: ${(t.description || '').substring(0, 80)}`);
        });
        if (r.result.tools.length > 10) console.log(`    ... and ${r.result.tools.length - 10} more`);
      }
    }
    if (r.error) {
      console.log(`  ERROR: code=${r.error.code} message=${r.error.message}`);
    }
  });

  if (stderr.trim()) {
    const errLines = stderr.trim().split('\n').filter(Boolean).slice(0, 5);
    console.log(`\nStderr (first 5 lines):`);
    errLines.forEach((l) => console.log(`  ${l.substring(0, 120)}`));
  }

  const passed = responses.length > 0 && responses.some((r) => r.result?.tools);
  console.log(`\n=== RESULT: ${passed ? 'PASS' : 'FAIL'} ===\n`);
  process.exit(passed ? 0 : 1);
}, 6000);
