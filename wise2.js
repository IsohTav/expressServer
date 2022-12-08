/* require axios and puppeteer */
const axios = require("axios");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const https = require("https");  // <-- require the https module


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
      "Content-Length": Buffer.byteLength(data),  // <-- set the Content-Length header to the length of the data in bytes
    },
  };

  const req = https.request(options, (res) => {
    // handle the response from the server here
    res.on("data", (d) => {
      const responseData = JSON.parse(d.toString());  // <-- convert the Buffer to a string and parse the JSON
      console.log(responseData);  // <-- log the response data to the console
    });
  });

  req.write(data);
  req.end();  // <-- signal the end of the request
  req.on("error", (error) => {
    console.error(error);  // <-- handle any errors that occur during the request
  });
}


// example usage
createQuote(16622021, "AUD", "AUD", 100);
