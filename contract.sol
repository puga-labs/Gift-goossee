// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
using Strings for uint256;
using Strings for address;

contract GiftNFT is ERC721, Ownable, ReentrancyGuard {
    struct Gift {
        address sender;
        uint256 amount;
        string message;
        uint8 commissionLevel;
        string animation;
        uint256 mintTime;
        bool claimed;
        string imageClose;
        string imageOpen;
    }

    uint256 public commission = 0.01 ether;
    mapping(uint256 => Gift) public gifts;
    mapping(address => uint256[]) private userNFTs;

    event GiftCreated(uint256 indexed tokenId, address indexed sender, address indexed receiver, uint256 amount, string imageCloseUrl, string imageOpenUrl);
    event GiftClaimed(uint256 indexed tokenId, address indexed receiver, uint256 amount);
    event CommissionClaimed(address indexed owner, uint256 amount);
    event CommissionUpdated(uint256 newCommission);

    constructor() ERC721("GiftNFT", "GNFT") Ownable(msg.sender) {}

    function generateUniqueTokenId(address receiver, uint256 timestamp) internal pure returns (uint256) {
        require(receiver != address(0), "Invalid address");
        uint256 tokenId = uint256(keccak256(abi.encodePacked(uint256(uint160(receiver)), timestamp))) % (10**8);
        return tokenId;
    }

    function createGift(
        address receiver,
        string memory message,
        uint8 commissionLevel,
        string memory animation,
        uint256 timestamp,
        uint256 mintTime
    ) external payable {
        require(receiver != address(0), "Receiver is zero address");
        require(msg.value > commission * commissionLevel, "Gift must have value greater than commission");

        uint256 tokenId = generateUniqueTokenId(receiver, timestamp);
        uint256 giftAmount = msg.value - commission * commissionLevel;

        _safeMint(receiver, tokenId);
        userNFTs[receiver].push(tokenId);

        string memory imageClose = "https://ubxepdefdxmhsobptpnm.supabase.co/storage/v1/object/public/nfts/base.png";
        string memory imageOpen = string(
            abi.encodePacked(
                "https://ubxepdefdxmhsobptpnm.supabase.co/storage/v1/object/public/nfts/",
                _toString(tokenId),
                ".png"
            )
        );

        gifts[tokenId] = Gift({
            sender: msg.sender,
            amount: giftAmount,
            message: message,
            commissionLevel: commissionLevel,
            animation: animation,
            mintTime: mintTime,
            claimed: false,
            imageClose: imageClose,
            imageOpen: imageOpen
        });

        emit GiftCreated(tokenId, msg.sender, receiver, giftAmount, imageClose, imageOpen);
    }

    function claimGift(uint256 tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Not NFT owner");

        Gift storage gift = gifts[tokenId];
        require(gift.mintTime <= block.timestamp, "Gift is not minted yet");
        require(!gift.claimed, "Already claimed");
        require(gift.amount > 0, "No funds to claim");

        uint256 amount = gift.amount;
        gift.claimed = true;
        gift.amount = 0;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit GiftClaimed(tokenId, msg.sender, amount);
    }

    function claimCommission() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Commission transfer failed");

        emit CommissionClaimed(owner(), balance);
    }

    function setCommission(uint256 newCommission) external onlyOwner {
        commission = newCommission;
        emit CommissionUpdated(newCommission);
    }

    function getUserNFTs(address user) external view returns (uint256[] memory) {
        return userNFTs[user];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        Gift memory gift = gifts[tokenId];
        require(bytes(gift.imageClose).length > 0 || bytes(gift.imageOpen).length > 0, "Image URL is empty");

        string memory image = gift.claimed ? gift.imageOpen : gift.imageClose;
        string memory message = gift.claimed ? gift.message : "Claim gift to get drop and know what write u friend!";

        string memory attributes = string(
            abi.encodePacked(
                '{"trait_type": "Claimed", "value": "', gift.claimed ? "true" : "false", '" }, ',
                '{"trait_type": "Mint date", "value": "', _toString(gift.mintTime), '" }, ',
                '{ "trait_type": "Sender", "value": "', Strings.toHexString(uint160(gift.sender), 20), '" }'
            )
        );

        if (gift.claimed) {
            attributes = string(
                abi.encodePacked(
                    attributes, ', ',
                    '{ "trait_type": "Animation", "value": "', gift.animation, '" }, ',
                    '{ "trait_type": "Commission Level", "value": "', _toString(gift.commissionLevel), '" }'
                )
            );
        }

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{',
                            '"name": "Gift #', _toString(tokenId), '", ',
                            '"description": "@goose_gift", ',
                            '"message": "', message, '", ',
                            '"image": "', image, '", ',
                            '"attributes": [', attributes, ']',
                        '}'
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function _removeUserNFT(address user, uint256 tokenId) internal {
        uint256[] storage nfts = userNFTs[user];
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i] == tokenId) {
                nfts[i] = nfts[nfts.length - 1];
                nfts.pop();
                break;
            }
        }
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
