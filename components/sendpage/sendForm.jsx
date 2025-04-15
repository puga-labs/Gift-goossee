'use client'
import { createSendData } from '../../utils/back/chain/txs'
import { useSendTransaction  } from 'wagmi'
import { useState } from 'react'
import { generateGiftImage } from '../../utils/imageGenerator'
import { rpcConfig } from '../../wagmi'
import { SMART_CONTRACT_ADDRESS } from '../../config'
import { ethers } from 'ethers'

/**
 * Компонент формы отправки подарка
 * @param {Object} props - Свойства компонента
 * @param {Object} props.imageOptions - Опции изображения (фон, подарок, базовое украшение)
 * @param {Array} props.decorations - Массив пользовательских декораций
 */
export function SendForm({ imageOptions, decorations = [] }) {
  const { sendTransactionAsync } = useSendTransaction({ rpcConfig });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Данные транзакции
  const [txData, setTxData] = useState({
    to: '',
    amount: '',
    message: '',
  });

  /**
   * Обработчик отправки подарка
   */
  const handleSend = async () => {
    if (!txData.to.startsWith('0x') || txData.to.length !== 42) {
      setError('Некорректный адрес получателя. Должен начинаться с 0x и содержать 42 символа.');
      return;
    }

    if (!txData.amount || parseFloat(txData.amount) <= 0) {
      setError('Укажите сумму отправки больше 0.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Генерируем изображение через API на сервере
      console.log('Запрос на генерацию изображения...');
      const imageUrl = await generateGiftImage(imageOptions, decorations);

      if (!imageUrl) {
        throw new Error('Не удалось создать и загрузить изображение');
      }

      console.log('Изображение загружено:', imageUrl);

      // Данные для транзакции
      const receiverAddress = txData.to;
      const giftMessage = txData.message || 'Gift for you!';
      const giftValue = txData.amount;

      console.log('Отправка подарка...', {
        to: receiverAddress,
        message: giftMessage,
        amount: giftValue,
        image: imageUrl
      });

      // Создаем данные для вызова контракта
      const sendData = createSendData(
        receiverAddress,
        giftMessage,
        1, // commissionLevel
        1, // animation
        Math.floor(Date.now() / 1000), // timestamp в секундах
        imageUrl, // imageCloseUrl
        imageUrl  // imageOpenUrl
      );

      // Отправляем транзакцию
      const tx = await sendTransactionAsync({
        to: SMART_CONTRACT_ADDRESS,
        data: sendData,
        value: ethers.parseEther(giftValue.toString()),
      });

      console.log('Транзакция отправлена:', tx);
      setSuccess(`Подарок успешно отправлен! Hash: ${tx}`);
      
      // Сбрасываем форму
      setTxData({
        to: '',
        amount: '',
        message: '',
      });
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      setError(`Ошибка: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-gray-700 mt-5">
      {error && (
        <div className="p-2.5 bg-red-50 text-red-800 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-2.5 bg-green-50 text-green-800 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="w-full mb-2.5">
        <span className="text-xs text-gray-500 ml-1.5">Message </span>
        <input
          type="text"
          placeholder="gift message"
          value={txData.message}
          onChange={(e) => setTxData({ ...txData, message: e.target.value })}
          className="w-full p-2.5 rounded border border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={isLoading}
        />
      </div>
      
      <div className="w-full mb-2.5 flex justify-start">
        <span className="text-xs text-gray-500 w-1/4">Amount </span>
        <span className="text-xs text-gray-500 ml-2.5">Receiver </span>
      </div>
      
      <div className="w-full flex mb-2.5">
        <input
          type="text"
          placeholder="0.00"
          value={txData.amount}
          onChange={(e) => setTxData({ ...txData, amount: e.target.value })}
          className="w-1/4 p-2.5 mr-2.5 rounded border border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="0x..."
          value={txData.to}
          onChange={(e) => setTxData({ ...txData, to: e.target.value })}
          className="w-3/4 p-2.5 rounded border border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={isLoading}
        />
      </div>

      <button 
        onClick={handleSend} 
        className={`w-full p-2.5 ${isLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded shadow-sm ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Отправка...' : 'Send Gift'}
      </button>
    </div>
  );
}
