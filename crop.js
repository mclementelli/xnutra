const Jimp = require('jimp');

async function cropIcon() {
    try {
        const image = await Jimp.read('public/xnutra-icon.png');
        image.autocrop();
        await image.writeAsync('public/xnutra-icon.png');
        console.log('Successfully cropped the icon!');
    } catch (e) {
        console.error('Error cropping:', e);
    }
}

cropIcon();
