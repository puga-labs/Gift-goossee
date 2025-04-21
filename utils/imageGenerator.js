/**
 * Генерирует изображение подарка через API
 * @param {Object} imageOptions - Опции базового изображения
 * @param {Array} decorations - Массив декораций
 * @returns {Promise<string>} - URL сгенерированного изображения
 */
export async function generateGiftImage(imageOptions, decorations = [], image_id, giftMessage) {
  try {
    console.log('Запрос на генерацию изображения:', { imageOptions, decorationCount: decorations.length });
    console.log(decorations)
    
    const response = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageOptions,
        decorations,
        image_id,
        giftMessage
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Ошибка API:', error);
      throw new Error(error.error || 'Ошибка при генерации изображения');
    }

    return true;
  } catch (error) {
    console.error('Ошибка при запросе к API генерации изображения:', error);
    throw error;
  }
}

/**
 * Получает превью изображения из DOM для отображения (используется только для превью, не для фактического изображения)
 * @param {HTMLElement} element - HTML-элемент для преобразования
 * @returns {Promise<string>} - Data URL изображения в формате base64
 */
export async function getImagePreview(element) {
  try {
    // Модули импортируются только на клиенте
    const html2canvas = (await import('html2canvas')).default;
    
    // Опции для html2canvas
    const options = {
      scale: 1, // Низкое качество для превью
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false
    };
    
    // Преобразуем элемент в canvas
    const canvas = await html2canvas(element, options);
    
    // Возвращаем data URL с низким качеством
    return canvas.toDataURL('image/jpeg', 0.5);
  } catch (error) {
    console.error('Ошибка при создании превью изображения:', error);
    return null;
  }
} 