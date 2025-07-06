#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');

// Run TypeScript script with ts-node
const scriptPath = path.join(__dirname, 'updateSlugs.ts');
console.log(`Running script: ${scriptPath}`);

// Execute with ts-node
const result = spawnSync('npx', ['ts-node', scriptPath], {
  stdio: 'inherit',
  shell: true
});

if (result.error) {
  console.error('Failed to execute script:', result.error);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`Script exited with code ${result.status}`);
  process.exit(result.status);
}
