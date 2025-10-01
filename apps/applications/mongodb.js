const {MongoClient,ObjectId} = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'ecommerce'
let client = new MongoClient(url)
let _db=null;

// async function main(){
//   try {
//     await client.connect();
//     console.log("mongo db connect...")
//   } catch (e) {
//     console.log("mongo DB FAIL!!");
//   }
// }
// main();
// _db = client.db(dbName);
// module.exports = {_db,ObjectId}

async function main() {
  client = await client.connect()
}
main().then(e=>{
  _db = client.db(dbName)
  console.log('connect mongodb ok...')
}).catch(e=>console.log('connect mongodb fail...!'))
// .finally(()=>{
//   client.close()
//   console.log('close mongodb')
// })
function db(){
  return _db
}
// function closeDb(){
//   return client
// }
module.exports = {db,ObjectId}
