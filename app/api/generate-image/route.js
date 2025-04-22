import { createGiftImage, uploadToSupabase } from '../../../utils/back/supabaseloader';
import { NextResponse } from 'next/server';

/**
 * API для генерации и загрузки изображения подарка
 * @route POST /api/generate-image
 * @param {Object} request - Объект запроса
 * @returns {Object} - Объект ответа с URL изображения 
 */
export async function POST(request) {
  try {
    // Получаем данные из запроса
    const requestData = await request.json();
    const { imageOptions, decorations, image_id, giftMessage } = requestData;
    
    if (!imageOptions) {
      return NextResponse.json({ 
        success: false, 
        error: "Не указаны параметры изображения" 
      }, { status: 400 });
    }
    
    console.log('Генерация изображения с параметрами:', {
      background: imageOptions.BACKGROUND,
      gift: imageOptions.GIFT,
      decoration: imageOptions.DECORATION,
      decorationsCount: decorations?.length || 0
    });
    
    // Создаем изображение на сервере
    const imageBuffer = await createGiftImage({
      background: imageOptions.BACKGROUND,
      gift: imageOptions.GIFT,
      decoration: imageOptions.DECORATION,
      decorations: decorations || []
    }, giftMessage);
    
    console.log('Изображение успешно создано, размер буфера:', imageBuffer?.length || 0);
    
    // Загружаем в Pinata
    const result = await uploadToSupabase(imageBuffer, image_id);
    
    console.log('Результат загрузки в Pinata:', result);
    
    if (result.status === 'error') {
      return NextResponse.json({ 
        success: false, 
        error: result.message 
      }, { status: 500 });
    }
    
    // Возвращаем URL изображения
    return NextResponse.json({ 
      success: true, 
      url: result.link 
    });
  } catch (error) {
    console.error('Ошибка при генерации изображения:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

/**
 * Обработчик для запросов OPTIONS (CORS)
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
} 