import {generateTokenId} from './calls'
import {CONTRACT_ABI} from '../../../config'
/**
 * Создает данные для вызова функции createGift смарт-контракта
 * @param {string} receiverAddress - Адрес получателя подарка
 * @param {string} giftMessage - Сообщение к подарку
 * @param {number} commissionLevel - Уровень комиссии (uint8)
 * @param {number} giftAnimation - Тип анимации (uint8)
 * @param {number|string} timestamp - Временная метка (uint256)
 * @param {string} imageCloseUrl - URL закрытого изображения (из Pinata/IPFS)
 * @param {string} imageOpenUrl - URL открытого изображения (из Pinata/IPFS)
 * @returns {string} - Закодированные данные транзакции
 */
export function createSendData(
    receiverAddress: string,
    giftMessage: string,
    giftAnimation: string,
    timestamp: number,
    mintDate: number 
) {
    let commissionLevel = 0;
    switch(giftAnimation) {
        case 'Rare':
            commissionLevel = 1;
            break;
        case 'Legendary':
            commissionLevel = 2;
            break;
        case 'Epic':
            commissionLevel = 3;
            break;
        default:
            commissionLevel = 0;
    }
    // Кодируем вызов функции с параметрами
    const data = CONTRACT_ABI.encodeFunctionData('createGift', [
        receiverAddress,
        giftMessage,
        commissionLevel,
        giftAnimation,
        timestamp,
        Math.floor(mintDate/1000)
    ]);
    
    return {
        data:data,
        tokenId: generateTokenId(receiverAddress, timestamp)
    };
}

/**
 * Создает данные для вызова функции claimGift контракта
 * @param {number|string} tokenId - ID токена, который необходимо получить
 * @returns {string} - Закодированные данные транзакции
 */

export function createClaimData(tokenId: number | string) {

    const data = CONTRACT_ABI.encodeFunctionData('claimGift', [tokenId]);
    
    return data
      
}