import fs from 'fs';
import path from 'path';

export function loadGiftImages() {
    const imagesDir = path.join(process.cwd(), 'public', 'GIFT_IMAGES');
    const images: { [key: string]: string } = {};

    try {
        const files = fs.readdirSync(imagesDir);
        files.forEach(file => {
            if (file.endsWith('.png') || file.endsWith('.jpg')) {
                const name = path.parse(file).name;
                images[name] = `/GIFT_IMAGES/${file}`;
            }
        });
    } catch (error) {
        console.error('Error loading gift images:', error);
    }

    return images;
}
