import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('🧹 Cleaning dist folder...');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

console.log('🏗️  Building project...');
try {
  // Run the build command
  execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
  console.log('\n✅ Build successful!');
  
  // Report sizes
  const assetsDir = path.resolve(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    console.log('\n📊 Build Statistics:');
    
    let totalSize = 0;
    files.forEach(file => {
      const stats = fs.statSync(path.join(assetsDir, file));
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalSize += stats.size;
      console.log(`- ${file}: ${sizeKB} KB`);
    });
    
    console.log(`\n📦 Total Assets Size: ${(totalSize / 1024).toFixed(2)} KB`);
  }
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}
