/* eslint-env */
'use strict'
const Twit = require('twit')
const mongoose = require('mongoose')
const ModelTwit = require('./db/tweet.js')
let count = 0

mongoose.connect(process.env.dbUrl, {useMongoClient: true}, (err) => {
  console.error(err)
})
mongoose.Promise = global.Promise

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
  timeout_ms: 60 * 1000  // optional HTTP request timeout to apply to all requests.
})

const stream = T.stream('statuses/filter', { track: 'metoo' })

stream.on('tweet', async (tweet) => {
  try {
    if (tweet.place) {
      let nObj = new ModelTwit({createdAt: tweet.created_at, text: tweet.text, place: tweet.place})
      await nObj.save()
      contador++
      console.log('recorded in db ', count)
    }
  } catch (err) {
    console.error('error at execution time: ', err)
  }
})
