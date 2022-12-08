/* require axios and puppeteer */
var axios = require('axios');
var puppeteer = require('puppeteer');
var bodyParser = require('body-parser');
var https = require('https');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


/* set token */
const api = "2594b963-9cfb-40ce-82d2-8cd85197fc0a";

/*return wise profileID for business account*/
async function getProfile(api) {
  let profiles = await axios.get('https://api.sandbox.transferwise.tech/v1/profiles', { headers: { 'Authorization': `Bearer ${api}` } }).then(response => {
    return response.data.filter(profile => profile.type === 'business')[0].id;
  });
  console.log(profiles);
  return profiles;
}

/* create a quote in wise and return the id */

function getQuoteId(callback) {
  var options = {
    hostname: 'api.sandbox.transferwise.tech',
    path: '/v3/profiles/101/quotes',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 2594b963-9cfb-40ce-82d2-8cd85197fc0a',
      'Content-Type': 'application/json'
    }
  };
  var req = https.request(options, function(res) {
    res.on('data', function(d) {
      callback(d);
    });
  });
  req.write(JSON.stringify({
    "sourceCurrency": "AUD",
    "targetCurrency": "AUD",
    "type": "BALANCE_PAYOUT",
    "profile": 16622021,
    "targetAmount": 100,
 
  }));
  req.end();
  req.on('error', function(e) {
    console.error(e);
  });
}
getQuoteId(function(data) {
  console.log(data);
});



