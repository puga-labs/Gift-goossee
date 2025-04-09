export const SMART_CONTRACT_ADDRESS = "0x977b85EFb23aDa2f33E53a5CB31Ec34dcE23c11E";
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
