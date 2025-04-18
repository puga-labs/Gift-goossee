import { supabase } from '../supabaseConfig';

type actionType = 'sent' | 'mint';

export async function getLeaderboard(type = 'sent' as actionType) {
  let { data: leaderboard, error } = await supabase
    .from('leaderboard')
    .select()
    .order(type, { ascending: false })
  if (error) {
    console.error('Ошибка загрузки лидеров:', error);
    return [];
  }
  
  // Формируем URL для каждого стикера
  return leaderboard;
}

export async function updateLeaderboard(address: string, action: actionType) {
    try {
        const { data, error } = await supabase.rpc('increment_or_insert', {
            user_id: address,
            column_name: action
        })
        if (error) {
            console.error('Ошибка обновления лидеров:', error);
            return false;
        }
        console.log('Лидеры обновлены:', data);
        return true;
    } catch (error) {
        console.error('Ошибка обновления лидеров:', error);
        return false;
    }
}
