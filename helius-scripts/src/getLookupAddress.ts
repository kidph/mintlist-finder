import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';




export default async function getLookupAddress(connection: Connection, mint: string) {

    const metaplex = new Metaplex(connection);
    const mintAddress = new PublicKey(mint);

    let collectionData: any[] = []
    const nft = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
    if (nft.collection) {
        const newNft = await metaplex.nfts().findByMint({ mintAddress: nft.collection.address });
        const lookupAddress = nft.collection.address.toBase58();
        const name = newNft.name.replace(" ", "-")!
        const collection = true
        const newObj = {
            name: name,
            collection: collection,
            lookupAddress: lookupAddress
        }
        return newObj
    } else {
        let name: string
        if (nft.json?.collection) {
            name = nft.json.collection.name?.replace(" ", "-")!
        } else {
            name = nft.symbol!
        }
        const lookupAddress = nft.creators[0].address.toBase58();
        const collection = false
        const newObj = {
            name: name,
            collection: collection,
            lookupAddress: lookupAddress
        }
        return newObj
    }
}


