const Twit = require('twit')
const mongoose = require('mongoose')
const modelTwit = require('./db/tweet.js')
const dbCredentials = process.env.dbUrl
mongoose.connect(dbCredentials, {useMongoClient: true}, (err) => {
  console.error(err)
})
let contador=0;
mongoose.Promise = global.Promise

const T = new Twit({
  consumer_key:         env.process.consumer_ket,
  consumer_secret:      env.process.consumer_secret,
  access_token:         env.process.access_token,
  access_token_secret:  env.process.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var stream = T.stream('statuses/filter', { track: 'metoo' })
 
stream.on('tweet', async (tweet) => {
  try{
    if(tweet.place){
      let nObj = new modelTwit({createdAt:tweet.created_at, text:tweet.text,place:tweet.place})
      await nObj.save()
      contador++
      console.log("recorded in db ",contador)
    } 
  } catch(err) {
    console.error("error!! ",err)
  }
})
