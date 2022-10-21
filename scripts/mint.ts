import * as ethers from "ethers";
import { kmsSigner } from "../common";

const artifacts = require("../artifacts/contracts/MyToken.sol/MyToken721.json");

const main = async () => {
  const signer = kmsSigner();
  const contract = new ethers.Contract(
    "0x1a00e76fbed93287CaDBC0e355AC415bd102DEd4",
    artifacts.abi,
    signer
  );

  const res = await contract.mint(
    "0xD75F45a1922869fEE15f87EC5451772c087347D9",
    1
  );
  console.log("result:", res);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
