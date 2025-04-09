
export function createSendData(
    receiverAddress: string,
    giftMessage: string,
    tokenId: number,
    giftAnimation: number,
    commissionLevel: number,    
    imageUrl: string
) {
        // Конвертируем сообщение в hex
        const messageHex = Buffer.from(giftMessage).toString('hex');
        const data = `0xc4c8978d` + // сигнатура функции createGift
        receiverAddress.slice(2).padStart(64, '0') + // адрес получателя
        '0000000000000000000000000000000000000000000000000000000000000120' + // смещение для message (288 байт)
        Number(giftAnimation).toString(16).padStart(64, '0') + // animation
        Number(tokenId).toString(16).padStart(64, '0') + // tokenId
        '0000000000000000000000000000000000000000000000000000000000000160' + // смещение для imageUrl (352 байт)
        messageHex.length.toString(16).padStart(64, '0') + // длина сообщения
        messageHex.padEnd(64, '0') + // сообщение
        imageUrl.length.toString(16).padStart(64, '0') + // длина URL
        Buffer.from(imageUrl).toString('hex').padEnd(64, '0'); // URL изображения

    return data;
}