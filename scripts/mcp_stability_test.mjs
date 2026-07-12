// MCP Stability Test — restart cycles for all 4 servers
import { spawn } from 'child_process';

async function testStability(name, cmd, args, env, iterations) {
  console.log(`Testing stability: ${name} (${iterations} cycles)...`);
  const results = [];
  for (let i = 0; i < iterations; i++) {
    try {
      const isWin = process.platform === 'win32';
      const proc = spawn(cmd, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, ...env },
        shell: isWin, // Required on Windows for npx.cmd resolution
      });
      let out = '', err = '';
      proc.stdout.on('data', (d) => { out += d; });
      proc.stderr.on('data', (d) => { err += d; });

      const result = await new Promise((resolve) => {
        const to = setTimeout(() => {
          proc.kill();
          resolve({ cycle: i + 1, error: 'TIMEOUT' });
        }, 8000);

        setTimeout(() => {
          proc.stdin.write(JSON.stringify({
            jsonrpc: '2.0', id: 1, method: 'initialize',
            params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'stability', version: '1.0' } },
          }) + '\n');
        }, 1000);

        setTimeout(() => {
          proc.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
        }, 2000);

        setTimeout(() => {
          proc.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }) + '\n');
        }, 3000);

        setTimeout(() => {
          clearTimeout(to);
          proc.kill();
          const msgs = out.split('\n').filter(Boolean)
            .map((l) => { try { return JSON.parse(l); } catch { return null; } })
            .filter(Boolean);
          const hasInit = msgs.some((m) => m.result?.serverInfo);
          const hasTools = msgs.some((m) => m.result?.tools);
          const toolCount = msgs.find((m) => m.result?.tools)?.result?.tools?.length || 0;
          resolve({ cycle: i + 1, init: hasInit, tools: hasTools, toolCount, stderr: err.trim().split('\n').slice(0, 2).join(' | ') });
        }, 4500);
      });
      results.push(result);
    } catch (e) {
      results.push({ cycle: i + 1, error: e.message.substring(0, 80) });
    }
  }
  const passCount = results.filter((r) => r.init && r.tools).length;
  console.log(`  Result: ${passCount}/${iterations} PASS (tool count: ${results[0]?.toolCount || 'N/A'})`);
  if (passCount < iterations) {
    console.log('  Failures:', JSON.stringify(results.filter((r) => !r.init || !r.tools)));
  }
  return { pass: passCount === iterations, results, name };
}

async function main() {
  console.log('=== MCP STABILITY TESTING (3 restart cycles each) ===\n');

  const tests = [
    { name: 'Firecrawl', cmd: 'npx', args: ['-y', 'firecrawl-mcp'], env: {} },
    { name: 'Exa Search', cmd: 'npx', args: ['-y', 'exa-mcp-server'], env: {} },
    { name: 'Tavily', cmd: 'npx', args: ['-y', 'tavily-mcp'], env: { TAVILY_API_KEY: 'tvly-test-stability' } },
    { name: 'Desktop Commander', cmd: 'node', args: ['C:/Users/Momolili/AppData/Roaming/npm/node_modules/@wonderwhy-er/desktop-commander/dist/index.js'], env: {} },
  ];

  const outcomes = [];
  for (const t of tests) {
    const outcome = await testStability(t.name, t.cmd, t.args, t.env, 3);
    outcomes.push(outcome);
  }

  console.log('\n=== STABILITY SUMMARY ===');
  outcomes.forEach((o) => console.log(`  ${o.name}: ${o.pass ? 'STABLE' : 'UNSTABLE'} (tool count: ${o.results[0]?.toolCount || 'N/A'})`));
  const allPass = outcomes.every((o) => o.pass);
  console.log(`\nOverall: ${allPass ? 'ALL STABLE - PASS' : 'ISSUES FOUND - FAIL'}`);
  process.exit(allPass ? 0 : 1);
}

main();
