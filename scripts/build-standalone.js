import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const assetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(assetsDir)) {
  console.error('Assets directory not found at', assetsDir);
  process.exit(1);
}

const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.endsWith('.css'));
const jsFile = files.find(f => f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error('Could not find CSS or JS bundle in assets/');
  process.exit(1);
}

const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf-8');

// Escape any closing script tags inside JS string literals
const safeJs = jsContent.replace(/<\/script>/gi, '<\\/script>');

const standaloneHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%230F172A'/><path d='M26 68 L42 28 L50 48 L58 28 L74 68 M32 54 L68 54' fill='none' stroke='%23E11D48' stroke-width='6'/></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aura Western — Trendy Western Fashion | Rajasthan, India</title>
    <meta name="description" content="Discover trendy western fashion, modern dresses, co-ord sets, shirts, trousers, t-shirts, and winter wear for modern women across Rajasthan. Order seamlessly via WhatsApp." />
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
${cssContent}
    </style>
  </head>
  <body class="bg-[#FAF8F5] text-slate-900 font-sans antialiased selection:bg-rose-500 selection:text-white">
    <div id="root"></div>
    <script>
${safeJs}
    </script>
  </body>
</html>`;

// Write to root preview.html (double-clickable directly by user in Windows Explorer!)
fs.writeFileSync(path.join(process.cwd(), 'preview.html'), standaloneHtml, 'utf-8');
console.log('✓ Successfully created self-contained preview.html in root folder!');

// Also write to dist/preview.html
fs.writeFileSync(path.join(distDir, 'preview.html'), standaloneHtml, 'utf-8');
console.log('✓ Successfully created dist/preview.html!');
