import { ethers } from 'ethers';
export const SMART_CONTRACT_ADDRESS = "0xFaaE03372f7f263434f3B4649e496F45956E6b3f";
export const MONAD_RPC_URL = 'https://testnet-rpc.monad.xyz';
export const MONAD_CHAIN_ID = 0x279f;

export const CONTRACT_ABI = new ethers.Interface([
    "function tokenURI(uint256 tokenId) public view override returns (string memory)",
    "function getUserNFTs(address user) external view returns (uint256[] memory)",
    'function createGift(address receiver, string memory message, uint8 commissionLevel, string memory animation, uint256 timestamp, uint256 mintDate) external payable',
    'function claimGift(uint256 tokenId) external'
])
