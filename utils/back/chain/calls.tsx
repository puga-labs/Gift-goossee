import axios from 'axios'
import { ethers } from 'ethers'
import { MONAD_RPC_URL, SMART_CONTRACT_ADDRESS } from '../../../config'
const iface = new ethers.Interface(["function tokenURI(uint256 tokenId) public view override returns (string memory)","function getUserNFTs(address user) external view returns (uint256[] memory)"])



export async function getNftToken(sender:string, reciever:string) {
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
            "data":  `0x3d3ea9d4${sender.slice(2).padStart(64, '0')}${reciever.slice(2).padStart(64, '0')}${new Date().getTime().toString(16).padStart(64, '0')}`
        },
            "latest"
        ]
    }
)
    if(response.data.result === '0x0000000000000000000000000000000000000000000000000000000000000000') {
        return null
    } else {
        return parseInt(response.data.result, 16)
    }
    } catch (error) {
        console.error('Error in getNftToken:', error)
        return null
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
        return nftList
    }
    } catch (error) {
        console.error('Error in getNftToken:', error)
        return null
    }
}

export async function getNftData (tokenId:number) {
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
        // console.log(response.data)
        const data = response.data.result
        const decode = await iface.decodeFunctionResult('tokenURI', data)
        const tokenURI = decode[0]
        return tokenURI
    }
    } catch (error) {
        console.error('Error in getNftToken:', error)
        return null
    }
}
