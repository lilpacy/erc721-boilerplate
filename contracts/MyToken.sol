//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./lib/ERC721Mintable.sol";

interface IMyToken721 is IERC721 {
    function setDefaultURI(string memory _defaultURI) external;
}

abstract contract MyToken721 is ERC721Mintable, IMyToken721 {
    string public _defaultURI;

    function setDefaultURI(string memory defaultURI) public override onlyOwner {
        _defaultURI = defaultURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _defaultURI;
    }
}

contract MyToken is MyToken721 {
    constructor() ERC721("Sample:Token", "SMP") {
        setDefaultURI(
            "https://pacy-metadata-test.s3.ap-northeast-1.amazonaws.com/jsons/"
        );
    }
}
