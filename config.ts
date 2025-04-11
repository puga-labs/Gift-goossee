export const SMART_CONTRACT_ADDRESS = "0x138db00ba0db3ab7cf4879a8664de30bffa33b03";
export const MONAD_RPC_URL = 'https://testnet-rpc.monad.xyz';
export const MONAD_CHAIN_ID = 0x279f;

export const CONTRACT_ABI = {
    "CHECK_ELIGIBILITY": {
        "method": "0xdc5f560e",
        "abi": [
            "bool",
            "string",
            "uint256",
            "uint256"
          ]
    },
    "SEND_GIFT": "0x3edd1128",
    "MINT_GIFT": "0x494cf979",
}
