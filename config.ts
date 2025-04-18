export const SMART_CONTRACT_ADDRESS = "0x619bb8b3b2cf1139870af56ad23d618dacfb52f1";
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
