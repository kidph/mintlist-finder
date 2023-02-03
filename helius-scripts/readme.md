# Helius Collection Scripts

Helper scripts for the Helius Powered Collections Finder

## Installation

cd into the scripts directory

```bash
cd scripts
```

npm or yarn install dependencies

```bash
npm install
```

or

```
yarn install
```

---

## Usage

### Get a mintlist from the creator, collection or just a mint address

#### Creates a JSON file with the collection's mintlist

Requires a Helius Api Key. Visit [Helius.xyz](https://helius.xyz/)

With the NFT collections MCC collection mint address

```bash
yarn getCollection --collection <collection mint address> --collection-name <collection name> --api-key <helius api key>
```

With the NFT collection's first verified creator

```bash
yarn getCollection --creator <first creator address> --collection-name <collection name> --api-key <helius api key>
```

With the just the NFT's mint address

```bash
yarn getCollection --collection <collection mint address> --collection-name <collection name> --api-key <helius api key>
```

With the NFT collection's first verified creator

```bash
yarn getCollection --creator <first creator address> --api-key <helius api key>
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
