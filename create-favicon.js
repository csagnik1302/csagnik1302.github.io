const fs = require('fs');
const path = require('path');

// For now, copy favicon.png to favicon.ico
// This is a temporary solution - ideally you'd convert PNG to ICO using a library
const sourceFile = path.join(__dirname, 'public', 'favicon.png');
const destFile = path.join(__dirname, 'public', 'favicon.ico');

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destFile);
  console.log('✓ favicon.ico created from favicon.png');
} else {
  console.error('✗ favicon.png not found');
  process.exit(1);
}
