import { NextResponse } from 'next/server';
import { getLeaderboard, updateLeaderboard } from '../../../lib/utils/leaderboard';
/**
 * API для генерации и загрузки изображения подарка
 * @route POST /api/generate-image
 * @param {Object} request - Объект запроса
 * @returns {Object} - Объект ответа с URL изображения 
 */
export async function POST(request) {
    // Получаем данные из запроса
    const {address,action,hash} = await request.json();
    if(!hash.startsWith('0x') || hash.length !== 66) {
        return NextResponse.json({ success: false, status: 400, message: 'Invalid hash' });
    }

    const leaderboard = await updateLeaderboard(address,action);
    if (leaderboard) {
        return NextResponse.json({ success: true, status: 200 });
    } else {
        return NextResponse.json({ success: false, status: 500 });
    }

}

export async function GET(){
    const leaderboard = await getLeaderboard();
    return NextResponse.json({data: leaderboard, status: 200});
}
/**
 * 
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