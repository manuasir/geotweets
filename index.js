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
  consumer_key:         'Ts747aQy5TLEfePmFbCvecOmQ',
  consumer_secret:      'uNOymY7FyFfD4nIONm14miDunqziiiHXjdDvviWWBAt2gHI6G3',
  access_token:         '3060608854-q5tnCNnwzf3Y333pEM3FAjzAv0cSqt59nL35z06',
  access_token_secret:  'XT8tphBHpRUOTzHFGXf8GTn6VuDQ0OU0npIVg6eDMH29x',
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
