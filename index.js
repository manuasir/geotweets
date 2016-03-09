var Twit = require('twit')

var T = new Twit({
  consumer_key:         '6vkYF2VfmOOGCmwWM9QrIxFuG',
  consumer_secret:      'vGehBnoPY3llI3RUzeq33UEMAbZs2nPVMZkGplr8e4HrbP74j3',
  access_token:         '3060608854-U0UnxBnXN8fWxo8cJ1w9z2YbWKkbrozFDIeeo7k',
  access_token_secret:  'd17lGcO3qpCvMvvzPMTJ1GWeXiHOdXOq27zYTeK3UuKFZ',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var world = [ '-180', '-90', '180', '90' ];
/*
//
//  tweet 'hello world!'
//
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})
*/
//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//


T.get('search/tweets', { q: 'psoe', count: 2 }, function(err, data, response) {
  //console.log(data.statuses.id_str);
   // if(data.statuses[0].geo){
    var tweet_key=Object.keys(data.statuses);
    console.log(tweet_key);
    for(var i in tweet_key){
     // console.log(key);
       T.get('statuses/lookup',data.statuses[i].id_str, function(err, datos, response) {
   //       //for(var i in datos.lenght)
          console.log(datos);
   // //     console.log("datos------>"+data.statuses[key].id_str);
   // // // //    if(data.statuses[keys].place)
   // // // //      console.log(data.statuses[keys].place.bounding_box.coordinates[0][0]);
         });
      }
})