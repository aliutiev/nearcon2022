import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function mintNFT(nft) {
  nft.id = uuid4();
  nft.price = parseNearAmount(nft.price + "");
  return window.contract.mintNFT({ nft });
}

export function getNFTs() {
  return window.contract.getNFTs();
}

export async function buyNFT({ id, price }) {
  await window.contract.buyNFT({ productId: id }, GAS, price);
}