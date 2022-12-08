/* require axios and puppeteer */
const axios = require("axios");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

/* set token */
const api = "2594b963-9cfb-40ce-82d2-8cd85197fc0a";

/* return wise profileID for business account */
async function getProfile(api) {
  let profiles = await axios
    .get("https://api.sandbox.transferwise.tech/v1/profiles", {
      headers: { Authorization: `Bearer ${api}` },
    })
    .then((response) => {
      return response.data.filter((profile) => profile.type === "business")[0].id;
    });
  console.log(profiles);
  return profiles;
}

/* create a quote in wise and return the id */
const https = require("https");

function createQuote(profile, sourceCurrency, targetCurrency, targetAmount) {
  const data = JSON.stringify({
    profileId: profile,
    sourceCurrency: sourceCurrency,
    targetCurrency: targetCurrency,
    sourceAmount: targetAmount,
  });

  const options = {
    hostname: "api.sandbox.transferwise.tech",
    path: `/v3/profiles/${profile}/quotes`,
    method: "POST",
    headers: {
      Authorization: "Bearer 2594b963-9cfb-40ce-82d2-8cd85197fc0a",
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = https.request(options, (res) => {
    // handle the response from the server here
    res.on("data", (
