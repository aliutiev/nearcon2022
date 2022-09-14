import { PersistentUnorderedMap, u128, context } from "near-sdk-as";
// LINK: https://dacade.org/communities/near/courses/near-101/learning-modules/b52ba9f1-caac-4339-96ed-fad3b1ab6bbd


@nearBindgen
// We use the @nearBindgen decorator to serialize our custom class before storing it on the blockchain.


export class Collection {
    id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    price: u128;
    owner: string;
    sold: u32;
    mintAmount: u32;

    // This numeric data types are specific to NEAR and are recommended to use instead of the TypeScript numeric 
    // types to avoid issues with data type conversion.

    public static fromPayload(payload: Collection): Collection {
        const collection = new Collection();
        
        collection.id = payload.id;
        collection.name = payload.name;
        collection.description = payload.description;
        collection.image = payload.image;
        collection.location = payload.location;
        collection.price = payload.price;
        collection.owner = context.sender;
        collection.mintAmount = 260;

        return collection;
    }

    public incrementSoldAmount(): void {
        this.sold = this.sold + 1;
    }
}

export const listedNFTS = new PersistentUnorderedMap<string, Collection>("COLLECTION_LIST");