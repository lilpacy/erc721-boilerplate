import "@nomiclabs/hardhat-waffle";
import { ethers } from "hardhat";
import { expect } from "chai";
// eslint-disable-next-line node/no-missing-import
import { MyToken721 } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

let owner: SignerWithAddress;
// let addr1: SignerWithAddress;
// let addr2: SignerWithAddress;

describe("testing for NFTStudioToken", async () => {
  let contract: MyToken721;

  beforeEach(async () => {
    const signers = await ethers.getSigners();
    [owner] = signers;

    const contractFactory = await ethers.getContractFactory("MyToken");
    contract = (await contractFactory.deploy()) as MyToken721;
    await contract.deployed();
  });

  describe("setDefaultURI/tokenURI", async () => {
    it("success", async () => {
      const tokenId = 100000101;
      await contract.mint(owner.address, tokenId);
      await contract.setDefaultURI("https://example.com/metadata/");

      await expect(await contract.tokenURI(tokenId)).to.equal(
        `https://example.com/metadata/${tokenId}`
      );
    });
  });

  describe("supportsInterface", async () => {
    it("success", async () => {
      const erc721InterfaceId = "0x80ac58cd";
      // const erc2981InterfaceId = "0x2a55205a";
      await expect(
        await contract.supportsInterface(erc721InterfaceId)
      ).to.equal(true);
      // expect(await contract.supportsInterface(erc2981InterfaceId)).to.equal(
      //   true
      // );
    });
  });
});
