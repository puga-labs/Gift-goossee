import axios from 'axios'
import { ethers } from 'ethers'
import { MONAD_RPC_URL, SMART_CONTRACT_ADDRESS } from '../../../config'
import { encodePacked, keccak256 } from "viem"
const iface = new ethers.Interface(["function tokenURI(uint256 tokenId) public view override returns (string memory)","function getUserNFTs(address user) external view returns (uint256[] memory)"])

/**
 * Декодирует данные NFT из формата data:application/json;base64
 * @param {string} dataUri - Строка в формате data URI с base64 данными
 * @returns {Object|null} - Декодированные JSON данные или null в случае ошибки
 */
export function decodeNftData(dataUri: string) {
    try {
        console.log('Raw data URI:', dataUri);
        
        // Проверяем, что строка имеет правильный формат
        if (!dataUri.startsWith('data:application/json;base64,')) {
            console.error('Invalid data URI format');
            return null;
        }
        
        // Извлекаем часть base64 из data URI
        const base64Data = dataUri.split('base64,')[1];
        
        // Декодируем base64 в строку
        const jsonString = Buffer.from(base64Data, 'base64').toString('utf-8');
        
        // Исправляем форматирование JSON
        const fixedJsonString = jsonString
            .replace(/"attributes":\s*\[([^\]]*)\]/g, (match, attributes) => {
                // Разбиваем атрибуты на отдельные объекты
                const attributesArray = attributes
                    .split('},{')
                    .map(attr => {
                        // Очищаем каждый атрибут
                        return attr
                            .trim()
                            .replace(/^{/, '')
                            .replace(/}$/, '')
                            .replace(/"\s*:\s*"/g, '":"')
                            .replace(/"\s*:\s*([^"}\s]+)/g, '":"$1"');
                    })
                    .filter(attr => attr.length > 0)
                    .map(attr => `{${attr}}`);
                
                return `"attributes":[${attributesArray.join(',')}]`;
            });
        
        console.log('Fixed JSON string:', fixedJsonString);
        
        // Парсим исправленный JSON
        const parsedData = JSON.parse(fixedJsonString);
        
        // Проверяем и исправляем формат attributes
        if (parsedData.attributes && Array.isArray(parsedData.attributes)) {
            parsedData.attributes = parsedData.attributes.map(attr => {
                if (typeof attr === 'string') {
                    try {
                        return JSON.parse(attr);
                    } catch (e) {
                        return attr;
                    }
                }
                return attr;
            });
        }
        
        return parsedData;
    } catch (error) {
        console.error('Error decoding NFT data:', error);
        return null;
    }
}

export async function getNftList (address:string) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    try {
        const response = await axios.post(
            MONAD_RPC_URL,
            {
            jsonrpc: "2.0",
            method: "eth_call",
            id: 1,
        params: [
           {
            "to": SMART_CONTRACT_ADDRESS,
            "data":  `0x52de4ee5${address.slice(2).padStart(64, '0')}`
        },
            "latest"
        ]
    }
)
    if(response.data?.result) {
        const decode = await iface.decodeFunctionResult('getUserNFTs', response.data.result)
        const nftList = decode.map((item: bigint) => item.toString());
        return nftList[0].split(',')
    }
    } catch (error) {
        console.error('Error in getNftToken:', error)
        return null
    }
}

export async function getNftData (tokenId:string) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    try {
        const response = await axios.post(
            MONAD_RPC_URL,
            {
            jsonrpc: "2.0",
            method: "eth_call",
            id: 1,
        params: [
           {
            "to": SMART_CONTRACT_ADDRESS,
            "data":  `0xc87b56dd${Number(tokenId).toString(16).padStart(64, '0')}`
        },
            "latest"
        ]
    }
)
    if(response.data?.result) {
        console.log(response.data)
        const data = response.data.result
        const decode = await iface.decodeFunctionResult('tokenURI', data)
        console.log(decode)
        const tokenURI = decode[0]
        return decodeNftData(tokenURI)
    }
    } catch (error) {
        console.error('Error in getNftToken:', error)
        return null
    }
}

export function generateTokenId(receiver:string, timestamp:number){
    const packed = encodePacked(
        ['uint256', 'uint256'],
        [BigInt(receiver), BigInt(timestamp)]
      );
      return String(BigInt(keccak256(packed)) % (BigInt(10) ** BigInt(8)));
}