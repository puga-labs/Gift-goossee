import  {ethers} from 'ethers';

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
    commissionLevel: number,
    giftAnimation: number,
    timestamp: number | string,
    imageCloseUrl: string,
    imageOpenUrl: string
) {
    // Определяем ABI интерфейс для функции createGift
    const iface = new ethers.Interface([
        'function createGift(address receiver, string memory message, uint8 commissionLevel, uint8 animation, uint256 timestamp, string memory imageClose, string memory imageOpen) external payable'
    ]);
    
    // Кодируем вызов функции с параметрами
    const data = iface.encodeFunctionData('createGift', [
        receiverAddress,
        giftMessage,
        commissionLevel,
        giftAnimation,
        timestamp,
        imageCloseUrl,
        imageOpenUrl
    ]);
    
    return data;
}

/**
 * Создает данные для вызова функции claimGift контракта
 * @param {number|string} tokenId - ID токена, который необходимо получить
 * @returns {string} - Закодированные данные транзакции
 */

export function createClaimData(tokenId: number | string) {
    // Определяем ABI интерфейс для функции claimGift
    const iface = new ethers.Interface([
        'function claimGift(uint256 tokenId) external'
    ]);
    
    // Кодируем вызов функции с параметром
    const data = iface.encodeFunctionData('claimGift', [tokenId]);
    
    return data;
}