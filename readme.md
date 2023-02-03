# FE and Scripts for a collection mintlist finder using Helius API

A front end and a couple of scripts used in to create a mintlist tool harnessing the power of helius api. Download the collections mintlist.

## Installation

In each directory fe and helius-scripts install the dependencies using your favorite package manager

```bash
npm install
or
yarn install
```

---

## Usage

See the scripts readme for details on using. The front end uses api calls to helius as well as the metaplex sdk under the hood. I purposefully spread these between two RPC providers as to limit the number of requests run through Helius for credit limiting purposes.

To run your own fork of the code would require a Helius API Key => [Helius.xyz](https://helius.xyz/)

You can choose to use Helius as the RPC provider as well using the same key.

The list of stored collections should automatically update after searches, attempting to add collection information for cached use. I will probably change this to cache only the collection name, whether it uses a verified collection token or the creator address, and the address used for searches. This would be better practice as collections are technically dynamic and could change, but I wanted to limit the number of requests to Helius.

## License

[MIT](https://choosealicense.com/licenses/mit/)
