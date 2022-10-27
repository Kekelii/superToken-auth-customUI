import { MongoClient } from "mongodb";
import variables from "../env_variables.js"




const uri = `mongodburl goes here with ${variables}`
let client = new MongoClient(uri);

export default async function main() {
    try {
        return client
    } catch (error) {
        console.log(error)
    }
}