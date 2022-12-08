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

const https = require("https");

function createQuote(profile, sourceCurrency, targetCurrency, targetAmount) {
  const data = JSON.stringify({
    sourceCurrency: sourceCurrency,
    targetCurrency: targetCurrency,
    profile: profile,
    targetAmount: targetAmount,
  });

  const options = {
    hostname: "api.sandbox.transferwise.tech",
    path: `/v3/profiles/${profile}/quotes`,
    method: "POST",
    headers: {
      "Authorization": "Bearer 2594b963-9cfb-40ce-82d2-8cd85197fc0a",
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = https.request(options, (res) => {
    // handle the response from the server here
    res.on("data", (d) => {
      console.log(d);  // log the response data to the console
    });
  });

  req.write(data);
  req.end();
  req.on("error", (error) => {
    console.error(error);
  });
}

// example usage
createQuote(16622021, "AUD", "AUD", 100);  // <-- updated arguments to create a quote for AUD to AUD
