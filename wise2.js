/* require axios and puppeteer */
var axios = require('axios');
var puppeteer = require('puppeteer');

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
async function getQuote(api, source, target, amount) {
  let profile = await getProfile(api);
  let quote = await axios.post(`https://api.sandbox.transferwise.tech/v3/profiles/${profile}/quotes`, {
    source: source,
    target: target,
    rateType: 'FIXED',
    type: 'BALANCE_PAYOUT',
    targetAmount: amount
   
  }, { headers: { 'Authorization': `Bearer ${api}`, 'Content-Type': 'application/json' } }).then(response => {
    return response.data.id;
  });
  console.log(quote);
  return quote;
}

getQuote(api, 'AUD', 'AUD', 100);

