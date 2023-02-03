
import { Connection } from '@solana/web3.js'
import axios from 'axios'
import fs from 'fs'
import getLookupAddress from './getLookupAddress'

const args = process.argv.slice(2)

const lookupAddress = args[1]
let collectionName = args[0] === '--mint' ? '' : args[3]
const key = args[0] === '--mint' ? args[3] : args[5]

const RPC = `https://rpc.helius.xyz/?api-key=${key}` || 'https://rpc.ankr.com/solana';
const connection = new Connection(RPC, 'confirmed')
if (!key) {
  throw new Error('No API key provided')
}



const url = `https://api.helius.xyz/v1/mintlist?api-key=${key}`

const getMintlist = async () => {

  let query: Object | Error

  if (args[0] === '--collection') {
    query = {
      "verifiedCollectionAddresses": [lookupAddress]
    }
  } else if (args[0] === '--creator') {
    query = {
      "firstVerifiedCreators": [lookupAddress]
    }
  } else if (args[0] === '--mint') {
    const lookupObj = await getLookupAddress(connection, lookupAddress)
    if (lookupObj.collection) {
      query = {
        "verifiedCollectionAddresses": [lookupObj.lookupAddress]
      }
      collectionName = lookupObj.name
    } else {
      query = {
        "firstVerifiedCreators": [lookupObj.lookupAddress]
      }
      collectionName = lookupObj.name
    }
  } else {
    throw new Error('Must enter either --collection, --creator or --mint')
  }

  let paginationToken
  let mintlist: any[] = []

  while (true) {
    const { data }: any = await axios.post(url, {
      "query": query,
      "options": {
        "limit": 10000,
        "paginationToken": paginationToken
      }
    }).catch((err) => {
      throw new Error(err.message)
    })
    console.log("Mintlist: ", data.result);
    mintlist.push(...data.result)

    if (data.paginationToken) {
      paginationToken = data.paginationToken;
      console.log(`Proceeding to next page with token ${paginationToken}.`);
    } else {
      console.log('Finished getting all events.');
      break;
    }
  }
  fs.writeFile(`./src/lib/${collectionName}.json`, JSON.stringify(mintlist), (err) => {
    if (err) console.log(err)
    else console.log('done')
  })
};
getMintlist();