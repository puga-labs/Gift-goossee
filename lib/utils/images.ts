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

export async function uploadImage(id, buffer){
  // Получаем список файлов из бакета stickers
  const { data, error } = await supabase
    .storage
    .from('nfts')
    .upload(`${id}.png`,buffer, {
      cacheControl: '3600',
      upsert: false,
    })

  console.log(data);
  if (error) {
    console.error('Upload result image error', error);
    return [];
  }
  
  return true
}
