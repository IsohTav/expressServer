/* require axios and puppeteer */
var axios = require('axios');
var puppeteer = require('puppeteer');
const api = "2594b963-9cfb-40ce-82d2-8cd85197fc0a";
/* create getProfile function */
async function getProfile(api) {
  let profiles = await axios.get('https://api.sandbox.transferwise.tech/v1/profiles', { headers: { 'Authorization': `Bearer ${api}` } }).then(response => { return (response.data) });
  console.log (profiles);
  return profiles;
}

const profileId = getProfile(api).then(profiles => {
  return profiles.filter(profile => {
    return profile.type === 'business';
  })[0].id;
});

console.log(profileId);
