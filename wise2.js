/* require axios and puppeteer */
var axios = require('axios');
var puppeteer = require('puppeteer');
const api = "2594b963-9cfb-40ce-82d2-8cd85197fc0a";
async function getProfile(api) {
  let profiles = await axios.get('https://api.sandbox.transferwise.tech/v1/profiles', { headers: { 'Authorization': `Bearer ${api}` } }).then(response => {
    return response.data.filter(profile => profile.type === 'business')[0].id;
  });
  console.log(profiles);
  return profiles;
}

getProfile(api);
  
  

