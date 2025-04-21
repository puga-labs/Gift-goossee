export const SMART_CONTRACT_ADDRESS = "0x287ff8ba364ef5ac6cdb8109d5218ca523ab702f";
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
