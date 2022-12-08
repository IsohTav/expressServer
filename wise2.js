/* require axios and puppeteer */
var axios = require('axios');
var puppeteer = require('puppeteer');
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
function getQuote(profile, source, target, amount) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', `https://api.sandbox.transferwise.tech/v3/profiles/${profile}/quotes`, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + `${api}`);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
    }
  }
  xhr.send(JSON.stringify({
    source: source,
    target: target,
    rateType: 'FIXED',
    type: 'BALANCE_PAYOUT',
    targetAmount: amount,
    sourceAmount: amount,
    type: 'BALANCE_PAYOUT'
  }));
}
/* await the response of getQuote and log the response */
getQuote('16622021', 'AUD', 'AUD', '100');



