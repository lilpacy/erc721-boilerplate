// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC721Mintable {
    function exists(uint256 _tokenId) external view returns (bool);

    function mint(address _to, uint256 _tokenId) external;
}

abstract contract ERC721Mintable is ERC721Enumerable, IERC721Mintable, Ownable {
    function exists(uint256 tokenId) public view override returns (bool) {
        return super._exists(tokenId);
    }

    function mint(address to, uint256 tokenId)
        public
        virtual
        override
        onlyOwner
    {
        super._mint(to, tokenId);
    }

    function bulkMint(address[] memory _tos, uint256[] memory _tokenIds)
        public
        onlyOwner
    {
        require(_tos.length == _tokenIds.length);
        uint8 i;
        for (i = 0; i < _tos.length; i++) {
            mint(_tos[i], _tokenIds[i]);
        }
    }
}
