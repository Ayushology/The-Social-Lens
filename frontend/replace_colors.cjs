const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInFiles(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Obsidian & Gold Theme
            content = content.replace(/emerald/g, 'amber');
            content = content.replace(/slate/g, 'zinc');
            fs.writeFileSync(fullPath, content);
        }
    }
}
replaceInFiles('./src');
console.log('Color theme replaced successfully!');
