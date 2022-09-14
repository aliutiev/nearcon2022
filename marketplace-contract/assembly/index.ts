import { Collection, listedNFTS } from "./model";
import { ContractPromiseBatch, context } from 'near-sdk-as';

export function mintNFT(collection: Collection): void {
    let tempNftID = listedNFTS.get(collection.id);
    
    if (tempNftID != null){
        throw new Error(`an NFT with ${collection.id} already exists`);
    }
    
    listedNFTS.set(collection.id, Collection.fromPayload(collection));
}

export function getNFT(id:string): Collection | null {
    return listedNFTS.get(id);
}

export function getNFTs(): Collection[]{
    return listedNFTS.values();
}

export function buyNFT(productId: string): void {
    const collection = getNFT(productId);
    if (collection == null){
        throw new Error(`NFT not found`);
    }

    if (collection.price.toString() != context.attachedDeposit.toString()){
        throw new Error("attached deposit should equal the NFT's price");
    }

    if (collection.sold === collection.mintAmount) {
        throw new Error('NFT release has sold out, contact Eco City if you are still interested');
    }

    ContractPromiseBatch.create(collection.owner).transfer(context.attachedDeposit);
    collection.incrementSoldAmount();
    listedNFTS.set(collection.id, collection);

}
