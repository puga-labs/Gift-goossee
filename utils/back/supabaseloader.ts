import axios from 'axios';
import sharp from 'sharp';
import { uploadImage } from '../../lib/utils/images';

const DECORATION_TYPES = {
  STICKER: 'sticker', // Стикеры/наклейки
  TEXT: 'text',       // Текстовые элементы
};


/**
 * Создает изображение с фоном, подарком и декорациями на сервере
 * @param {Object} options - Опции изображения
 * @param {number} options.background - Индекс фонового изображения
 * @param {number} options.gift - Индекс изображения подарка
 * @param {number} options.decoration - Индекс стандартного украшения 
 * @param {Array} options.decorations - Массив пользовательских декораций
 * @param {string} message - Сообщение для подарка
 * @returns {Promise<Buffer>} - Buffer с готовым изображением
 */
export async function createGiftImage(options: {
  background: number,
  gift: number,
  decoration?: number,
  decorations?: Array<{
    id: number,
    type: string,
    option: string | number,
    url: string,
    x: number,
    y: number,
    size: { width: number, height: number },
    rotation: number
  }>
},
message:string
): Promise<Buffer> {
  try {
    // Размер выходного изображения
    const outputWidth = 500;
    const outputHeight = 500;
    
    console.log('Создание базового изображения фона...');
    
    // 1. Сначала создаем базовое изображение только с фоном
    const baseImage = await sharp(`public/GIFT_IMAGES/BACKGROUND/${options.background}.png`)
      .resize(outputWidth, outputHeight, { fit: 'cover' })
      .toBuffer();
    
    console.log(`Создано базовое изображение с размерами ${outputWidth}x${outputHeight}`);
    
    // 2. Подготавливаем массив слоев для финальной композиции
    const compositeLayers = [];
    
    // 3. Подготавливаем подарок
    try {
      console.log('Подготовка изображения подарка...');
      const giftWidth = Math.round(outputWidth * 0.8);
      const giftHeight = Math.round(outputHeight * 0.8);
      const giftTop = Math.round((outputHeight - giftHeight) / 2);
      const giftLeft = Math.round((outputWidth - giftWidth) / 2);
      
      const giftBuffer = await sharp(`public/GIFT_IMAGES/GIFT/${options.gift}.png`)
        .resize(giftWidth, giftHeight, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toBuffer();
      
      compositeLayers.push({
        input: giftBuffer,
        top: giftTop,
        left: giftLeft
      });
    } catch (error) {
      console.error('Ошибка при подготовке подарка:', error);
    }
    
    
    // 5. Подготавливаем пользовательские декорации
    if (options.decorations && options.decorations.length > 0) {
      console.log(`Подготовка ${options.decorations.length} пользовательских декораций...`);
      console.log(`[DEBUG] Данные декораций с клиента:`, JSON.stringify(options.decorations));
      
      const buffersArrayPromises = options.decorations.map(async (decoration) => {
        try {
          return axios.get(decoration.url, { responseType: 'arraybuffer' })
        } catch (error) {
          console.error(`Ошибка при подготовке декорации ${decoration.id}:`, error);
          // Продолжаем с другими декорациями
        }
      })

      const buffersArray: { id: number, buffer: Buffer|null }[] = []
      await Promise.all(buffersArrayPromises)
        .then((buffers) => {
          console.log(buffers.length)
          buffers.map((buffer, index) => {
            buffersArray.push({
              id: options.decorations[index].id,
              buffer: Buffer.from(buffer.data , 'binary')
            })
          })
        })
        .catch((error) => {
          console.error('Ошибка при получении всех декораций:', error);
        })

      for (const decoration of options.decorations) {
        try {
          // Сначала получаем процентные значения координат из клиента
          const xPercent = decoration.x;
          const yPercent = decoration.y;
          
          // Рассчитываем размеры в пикселях 
          const width = Math.round((decoration.size.width / 100) * outputWidth);
          const height = Math.round((decoration.size.height / 100) * outputHeight);
          
          // Рассчитываем точную позицию центра элемента в пикселях
          const centerX = Math.round((xPercent / 100) * outputWidth);
          const centerY = Math.round((yPercent / 100) * outputHeight);
          
          // Рассчитываем левый верхний угол с учетом того, что координаты - это левый нижний угол
          const left = Math.round(centerX - width);
          const top = Math.round(centerY - height);
          
          console.log(`[DEBUG] Декорация ${decoration.id}:
            - Входные данные: x=${xPercent}%, y=${yPercent}%
            - Размер изображения: ${outputWidth}x${outputHeight}px
            - Размер декорации: ${width}x${height}px
            - Центр (px): ${centerX}, ${centerY}
            - Верхний левый угол (px): ${left}, ${top}`);
          
          let itemBuffer;
          
          // Обрабатываем по типу декорации
          const decorationType = String(decoration.type).toLowerCase();
          console.log(`Фактический тип декорации (после приведения): "${decorationType}"`);
          console.log(`Ожидаемые типы (приведенные): sticker="${String(DECORATION_TYPES.STICKER).toLowerCase()}", text="${String(DECORATION_TYPES.TEXT).toLowerCase()}"`);
          
          if (decorationType === String(DECORATION_TYPES.STICKER).toLowerCase()) {
            // Стикер
            console.log(`Подготовка стикера ${decoration.option}...`);
            
            // Обрабатываем rotation - убеждаемся, что это число
            const rotation = typeof decoration.rotation === 'number' ? decoration.rotation : 0;
            console.log(`Стикер поворот: ${rotation}°`);
            
            // Создаем изображение стикера и применяем поворот с защитой от обрезки
            // const response = await axios.get(decoration.url, { responseType: 'arraybuffer' });
            // const buffer = Buffer.from(response.data, 'binary');

            const buffer = buffersArray.find((buffer) => buffer.id === decoration.id)?.buffer

            if (!buffer) {
              console.error(`Декорация ${decoration.id} не найдена в массиве декораций`);
              continue;
            }
            
            const stickerImage = sharp(buffer)
              .resize(width, height, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
              });
              
            itemBuffer = await rotateImage(stickerImage, rotation, width, height);
          } else if (decorationType === String(DECORATION_TYPES.TEXT).toLowerCase()) {
            // Текст
            console.log(`Подготовка текста "${decoration.option}"...`);
            
            // Обрабатываем rotation - убеждаемся, что это число
            const rotation = typeof decoration.rotation === 'number' ? decoration.rotation : 0;
            console.log(`Текст поворот: ${rotation}°`);
            
            const safeText = String(decoration.option)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;');
            
            // Масштабируем размер шрифта в соответствии с размером декорации
            // Ограничиваем максимальный размер шрифта до 36px для 500x500 изображения
            const fontSize = Math.min(Math.floor(height * 0.5), 36);
            
            const textSvg = Buffer.from(`
              <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                <text 
                  x="50%" 
                  y="50%" 
                  font-family="Arial, sans-serif" 
                  font-size="${fontSize}" 
                  font-weight="bold"
                  text-anchor="middle" 
                  dominant-baseline="middle"
                  fill="black"
                  stroke="white"
                  stroke-width="1"
                >${safeText}</text>
              </svg>
            `);
            
            // Создаем изображение текста и применяем поворот с защитой от обрезки
            const textImage = sharp(textSvg)
              .resize(width, height, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
              });
              
            itemBuffer = await rotateImage(textImage, rotation, width, height);
          } else {
            // Неизвестный тип декорации
            console.error(`Неизвестный тип декорации: "${decoration.type}" (нормализовано: "${decorationType}")`);
            console.log(`Ожидаемые типы: sticker="${String(DECORATION_TYPES.STICKER).toLowerCase()}", text="${String(DECORATION_TYPES.TEXT).toLowerCase()}"`);
            console.log(`Игнорирование декорации с ID=${decoration.id}`);
            continue;
          }
          
          // Добавляем в композицию
          compositeLayers.push({
            input: itemBuffer,
            top: top,
            left: left,
            premultiplied: true,        // Оптимизация для изображений с прозрачностью
            limitInputOffsetToSize: true // Важный параметр - обрезать выходящие части
          });
        } catch (error) {
          console.error(`Ошибка при подготовке декорации ${decoration.id}:`, error);
          // Продолжаем с другими декорациями
        }
      }
    }
    
    // 6. Применяем все слои в одной финальной композиции
    console.log(`Объединение всех слоев (${compositeLayers.length}) в финальное изображение...`);
    
    // Проверяем слои на валидность и корректируем координаты
    const validLayers = compositeLayers.filter((layer, index) => {
      if (!layer.input) {
        console.warn(`Пропущен слой #${index} без input`);
        return false;
      }
      if (layer.top === undefined || layer.left === undefined) {
        console.warn(`Пропущен слой #${index} без координат`);
        return false;
      }
      
      // Логируем для отладки
      console.log(`Слой #${index}: top=${layer.top}, left=${layer.left}`);
      
      return true;
    });
    
    console.log(`После валидации осталось ${validLayers.length} слоев`);
    
    // Безопасная композиция - последовательное наложение слоев
    console.log(`Применяем безопасный метод композиции (последовательно) для изображения ${outputWidth}x${outputHeight}...`);
    let finalImage = baseImage;
    
    for (let i = 0; i < validLayers.length; i++) {
      try {
        console.log(`Применяем слой ${i}...`);
        finalImage = await sharp(finalImage)
          .composite([validLayers[i]])
          .toBuffer();
      } catch (layerError) {
        console.error(`Ошибка при добавлении слоя ${i}:`, layerError);
        // Продолжаем со следующим слоем
      }
    }
    
    // Добавляем фиксированный текст внизу изображения
    try {
      const text = message || 'test'; // Используем переданный текст или значение по умолчанию
      const fontSize = 24;
      const textBottom = 30; // Отступ от нижней границы в пикселях
      
      const textSvg = Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${outputWidth}" height="${outputHeight}">
          <text 
            x="50%" 
            y="${outputHeight - textBottom}" 
            font-family="inter, sans-serif" 
            font-size="${fontSize}" 
            font-weight="bold"
            text-anchor="middle" 
            dominant-baseline="middle"
            fill="white"
            stroke="black"
            stroke-width="1"
          >${text}</text>
        </svg>
      `);
      
      const textLayer = {
        input: textSvg,
        top: 0,
        left: 0,
        premultiplied: true
      };
      
      finalImage = await sharp(finalImage)
        .composite([textLayer])
        .toBuffer();
        
      console.log('Добавлен фиксированный текст внизу изображения');
    } catch (textError) {
      console.error('Ошибка при добавлении фиксированного текста:', textError);
    }
    
    console.log('Композиция успешно создана');
    // Проверяем размеры итогового изображения
    try {
      const metadata = await sharp(finalImage).metadata();
      console.log(`Размеры финального изображения: ${metadata.width}x${metadata.height}`);
    } catch (e) {
      console.error('Ошибка при получении метаданных финального изображения:', e);
    }
    
    return finalImage;
  } catch (error) {
    console.error('Общая ошибка при создании изображения:', error);
    throw new Error('Не удалось создать изображение подарка');
  }
}

/**
 * Обрабатывает изображение с поворотом вокруг центра
 * Учитывает особенности sharp и обеспечивает корректный поворот без обрезки
 * @param {sharp.Sharp} image - Sharp объект с изображением
 * @param {number} rotation - Угол поворота в градусах
 * @param {number} width - Ширина итогового изображения
 * @param {number} height - Высота итогового изображения
 * @returns {Promise<Buffer>} - Обработанное изображение
 */
async function rotateImage(image: any, rotation: number, width: number, height: number): Promise<Buffer> {
  // Если нет поворота, просто возвращаем изображение без изменений
  if (rotation === 0 || rotation === 360) {
    return image.png().toBuffer();
  }
  
  // Для поворотов, кратных 90 градусам, sharp хорошо справляется
  const isRightAngle = Math.abs(rotation % 90) < 0.1;
  
  if (isRightAngle) {
    // Для поворотов 90, 180, 270 - прямое применение
    return image
      .rotate(rotation, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  } else {
    try {
      // Для наиболее точного соответствия с клиентом:
      // 1. Используем тот же размер, что на клиенте
      // 2. Сохраняем исходные размеры
      
      // Поворачиваем изображение без изменения размера
      // Используем квадратное пространство для поворота, чтобы избежать обрезки
      const maxDimension = Math.max(width, height);
      const padding = Math.ceil((maxDimension - Math.min(width, height)) / 2);
      
      return image
        // Временно расширяем холст для поворота
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        // Поворачиваем изображение
        .rotate(rotation, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
        // Возвращаем к исходным размерам
        .resize(width, height, {
          fit: 'contain',
          position: 'center',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
    } catch (error) {
      console.error('Ошибка при повороте изображения:', error);
      
      // Запасной вариант - просто вернуть исходное изображение без поворота
      console.log('Применяем запасной вариант без поворота');
      return image.png().toBuffer();
    }
  }
}

/**
 * Создает изображение и загружает его в Pinata
 * @param {Object} options - Опции изображения
 * @param {string} message - Сообщение для подарка
 * @param {string} image_id - Идентификатор изображения
 * @returns {Promise<Object>} - Результат загрузки с URL
 */
export async function createAndUploadImage(options: {
  background: number,
  gift: number,
  decoration?: number,
  decorations?: Array<any>,
},   
    message: string, 
    image_id: string
) {
  try {
    // Создаем изображение
    const imageBuffer = await createGiftImage(options, message);
    
    // Загружаем в Pinata
    const result = await uploadToSupabase(imageBuffer, image_id);
    
    return result;
  } catch (error) {
    console.error('Ошибка при создании и загрузке изображения:', error);
    return {
      link: null,
      status: 'error',
      message: error.message || 'Unknown error'
    };
  }
}

/**
 * Загружает изображение в Pinata
 * @param {string|Buffer} image - Изображение в формате base64 или Buffer
 * @param {string} image_id - Имя файла
 * @returns {Promise<Object>} - Результат загрузки с URL
 */
export async function uploadToSupabase(image: string | Buffer, image_id: string) {
  try {
    // Проверяем, что image это строка или Buffer
    let imageBuffer;
    
    if (Buffer.isBuffer(image)) {
      imageBuffer = image;
    } else if (typeof image === 'string') {
      // Если image - строка, удаляем префикс data:image/, если он присутствует
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      // Преобразуем base64 в бинарные данные
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      throw new Error('Неверный формат изображения: ожидается строка base64 или Buffer');
    }

    await uploadImage(image_id,imageBuffer)

    return {
      status: 'success',
      message: 'success'
    };
  } catch (error) {
    console.error('Ошибка при загрузке в Pinata:', error);
    return {
      status: 'error',
      message: 'Unknown error'
    };
  }
}

