import env from "hardhat";
import { HttpNetworkConfig } from "hardhat/types";
import * as ethers from "ethers";
// eslint-disable-next-line node/no-missing-import
import { MyToken721 } from "../typechain";
const artifacts = require("../artifacts/contracts/MyToken.sol/MyToken721.json");

const main = async () => {
  const rpcUrl = (env.network.config as HttpNetworkConfig).url;
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(
    "0x1a00e76fbed93287CaDBC0e355AC415bd102DEd4",
    artifacts.abi,
    provider
  ) as MyToken721;

  const res = await contract.tokenURI(1); // gasLimit is necessary
  console.log("result:", res);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
