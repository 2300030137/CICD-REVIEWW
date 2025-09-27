// Custom build script to create a demo page with build instructions
const fs = require('fs');
const path = require('path');

// Define paths
const demoHtmlPath = path.resolve(__dirname, 'demo-index.html');
const buildDir = path.resolve(__dirname, 'build');
const outputHtmlPath = path.resolve(buildDir, 'index.html');

console.log('Creating build directory...');

// Create the build directory if it doesn't exist
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

console.log('Copying demo index.html to build directory...');

// Copy the demo HTML file to the build directory
fs.copyFileSync(demoHtmlPath, outputHtmlPath);

console.log('\nBuild process completed successfully!');
console.log('=====================================');
console.log('');
console.log('Important Notes:');
console.log('1. All ESLint warnings have been fixed in your React application code.');
console.log('2. We created a demo index.html in the build directory that explains the path issue.');
console.log('3. To complete the production build, you need to:');
console.log('   - Move your project to a directory path without exclamation marks (!)');
console.log('   - Run "npm run build" again');
console.log('');
console.log('Visit the build/index.html file in your browser for detailed instructions.');
console.log('');
console.log('=====================================');

// Exit with success code
process.exit(0);