import { supabase } from '../supabaseConfig';

export async function getStickers() {
  // Получаем список файлов из бакета stickers
  const { data, error } = await supabase
    .storage
    .from('stickers')
    .list();

  console.log(data);
  if (error) {
    console.error('Ошибка загрузки стикеров:', error);
    return [];
  }
  
  // Формируем URL для каждого стикера
  return data.map(file => ({
    name: file.name,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/stickers/${file.name}`
  }));
}
