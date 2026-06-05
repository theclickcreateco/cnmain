const fs = require('fs');
const path = require('path');

const eventsDir = path.join(__dirname, '..', 'public', 'uploads', 'events');
const outputFile = path.join(__dirname, '..', 'src', 'lib', 'event-images.json');

function generate() {
  if (!fs.existsSync(eventsDir)) {
    console.error(`Directory not found: ${eventsDir}`);
    process.exit(1);
  }

  const result = {};
  const booths = fs.readdirSync(eventsDir);

  for (const booth of booths) {
    const boothPath = path.join(eventsDir, booth);
    if (fs.statSync(boothPath).isDirectory()) {
      const files = fs.readdirSync(boothPath);
      const images = files
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
        })
        .map(file => `/uploads/events/${encodeURIComponent(booth)}/${encodeURIComponent(file)}`);
      
      result[booth] = images;
      console.log(`Found ${images.length} images in ${booth}`);
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log(`Generated JSON file at ${outputFile}`);
}

generate();
