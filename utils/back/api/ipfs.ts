import axios from 'axios';

/**
 * Загружает изображение через API-маршрут в IPFS на Pinata
 * @param {string} image - Base64 строка изображения
 * @returns {Promise<{link: string, status: string}>} - Результат загрузки
 */
async function uploadImage(image: string) {
    try {
        const response = await axios.post('/api/ipfs', { image });
        
        if (response.data.status === 'error') {
            console.error('Ошибка при загрузке изображения:', response.data.error);
            throw new Error(response.data.error || 'Не удалось загрузить изображение');
        }
        
        return response.data.link;
    } catch (error) {
        console.error('Ошибка при вызове API:', error);
        throw error;
    }
}

export { uploadImage };

