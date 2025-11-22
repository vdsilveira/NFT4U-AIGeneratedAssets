// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ForuNFT is ERC1155, Ownable {
    constructor() ERC1155("") Ownable(msg.sender) {}

    uint256 private idCounter = 0;
    uint256 public fee = 0.001 ether;

    mapping(uint256 => string) private _tokenURIs;
    mapping(address=>uint256[]) private _userTokens;

    event Minted(address indexed minter, uint256 indexed tokenId, uint256 amount, string uri);
    event FeeUpdated(uint256 newFee);

    function setTokenURI(uint256 tokenId, string memory tokenURI) public onlyOwner {
        _tokenURIs[tokenId] = tokenURI;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function setFee(uint256 newFee) public onlyOwner {
        fee = newFee;
        emit FeeUpdated(newFee);
    }

    function mint(uint256 amount, string memory link, bytes memory data)
        public
        payable
    {
        require(bytes(link).length > 0, "Invalid URI");
        require(amount > 0, "Amount must be greater than 0");
        require(msg.value >= fee, "Insufficient fee");

        idCounter += 1;
        _tokenURIs[idCounter] = link;

        _mint(msg.sender, idCounter, amount, data);
        _userTokens[msg.sender].push(idCounter);

        emit Minted(msg.sender, idCounter, amount, link);
    }
    function getTokens(address user) public view returns (uint256[] memory) {
    return _userTokens[user];
    }

    function withdraw() external onlyOwner {
        (bool sent, ) = payable(owner()).call{value: address(this).balance}("");
        require(sent, "Withdraw failed");
    }
}
