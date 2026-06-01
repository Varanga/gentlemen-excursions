// convert-webp.js (ES Module version)
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __dirname équivalent pour ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT_DIR = join(__dirname, 'src/assets');
const OUTPUT_DIR = join(__dirname, 'src/assets-webp');

async function convertRecursive(inputPath, outputPath) {
  // Créer le dossier de destination s'il n'existe pas
  await mkdir(outputPath, { recursive: true });

  const entries = await readdir(inputPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullInput = join(inputPath, entry.name);
    const fullOutput = join(outputPath, entry.name);

    if (entry.isDirectory()) {
      // 🔁 Récursion dans les sous-dossiers
      await convertRecursive(fullInput, fullOutput);
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        try {
          const webpName = basename(entry.name, ext) + '.webp';
          
          await sharp(fullInput)
            .webp({ quality: 80 })
            .toFile(join(outputPath, webpName));
            
          console.log(`✅ ${inputPath.replace(INPUT_DIR, '')}/${entry.name} → ${webpName}`);
        } catch (err) {
          console.error(`❌ Échec: ${fullInput}`, err.message);
        }
      }
    }
  }
}

// Lancer la conversion
console.log('🔄 Conversion en cours...');
convertRecursive(INPUT_DIR, OUTPUT_DIR)
  .then(() => console.log('\n🎉 Conversion terminée !'))
  .catch(err => console.error('💥 Erreur:', err));