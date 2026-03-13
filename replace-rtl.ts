import fs from 'fs';
import path from 'path';

function replaceInFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace margin left/right
  content = content.replace(/\bml-(\d+|px|auto)\b/g, 'ms-$1');
  content = content.replace(/\bmr-(\d+|px|auto)\b/g, 'me-$1');
  content = content.replace(/\b-ml-(\d+|px)\b/g, '-ms-$1');
  content = content.replace(/\b-mr-(\d+|px)\b/g, '-me-$1');
  
  // Replace padding left/right
  content = content.replace(/\bpl-(\d+|px)\b/g, 'ps-$1');
  content = content.replace(/\bpr-(\d+|px)\b/g, 'pe-$1');
  
  // Replace text alignment
  content = content.replace(/\btext-left\b/g, 'text-start');
  content = content.replace(/\btext-right\b/g, 'text-end');
  
  // Replace positioning
  content = content.replace(/\bleft-(\d+|px|1\/2|full|auto)\b/g, 'start-$1');
  content = content.replace(/\bright-(\d+|px|1\/2|full|auto)\b/g, 'end-$1');
  content = content.replace(/\b-left-(\d+|px|1\/2|full)\b/g, '-start-$1');
  content = content.replace(/\b-right-(\d+|px|1\/2|full)\b/g, '-end-$1');
  
  // Replace borders
  content = content.replace(/\bborder-l\b/g, 'border-s');
  content = content.replace(/\bborder-r\b/g, 'border-e');
  content = content.replace(/\bborder-l-(\d+|transparent|white|gray-\d+)\b/g, 'border-s-$1');
  content = content.replace(/\bborder-r-(\d+|transparent|white|gray-\d+)\b/g, 'border-e-$1');

  // Replace rounded corners
  content = content.replace(/\brounded-l(-[a-z0-9]+)?\b/g, 'rounded-s$1');
  content = content.replace(/\brounded-r(-[a-z0-9]+)?\b/g, 'rounded-e$1');
  content = content.replace(/\brounded-tl(-[a-z0-9]+)?\b/g, 'rounded-ss$1');
  content = content.replace(/\brounded-tr(-[a-z0-9]+)?\b/g, 'rounded-se$1');
  content = content.replace(/\brounded-bl(-[a-z0-9]+)?\b/g, 'rounded-es$1');
  content = content.replace(/\brounded-br(-[a-z0-9]+)?\b/g, 'rounded-ee$1');

  fs.writeFileSync(filePath, content, 'utf-8');
}

function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('./src');
console.log('Done replacing logical properties');
