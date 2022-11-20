const express = require('express');
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer');
const server = express();
const PORT = 8000;


var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7wrwKdYtsERuwF'}).base('appWP3lnaTRbuLIG0');


//express config
server.use(express.json());
server.use(bodyParser.text()); 
server.listen(8000, () => {
	console.log('incoming')

});

server.get('/', (req, res) => {
	res.json({hello: "world"});

});








	async function airtableUpdate(recordid,data) {
    base('Applicant portal').update([{"id": `${recordid}`, "fields": data}])
    .then(() => console.log("Airtable update successful"))
    .catch(e => console.log(e))
};




	





async function scrapeEmail(url) {
	
	const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
	const page = await browser.newPage();

	var cookies = [
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1668754394.289118,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__cf_bm",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "RYZEiorfs5VPlWyrnkDIODQxRkYalBXi5p7bgFYEwZE-1668752594-0-AdRkkiF22wCC+x/Ts9wCdB9SC5z7ALYZa7gYRyzSXJrNXcKkTGvynUQ81iGGbi9ejUmc3ZP24kCZz1D8ODVS8oehhbhCrSb/Gfj+nfQalQWlqChm6Y2wMGl4TfxsB9aDiUq4TkfqwUYIkgr7X8bBFVg=",
    "id": 1
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1676528594,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_fbp",
    "path": "/",
    "sameSite": "lax",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "fb.1.1662388881877.1919595958",
    "id": 2
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1703312593.851857,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_ga",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "GA1.1.1687723548.1662388881",
    "id": 3
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1703312593.851452,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_ga_2ZN6B06KK8",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "GS1.1.1668752593.24.0.1668752593.60.0.0",
    "id": 4
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1668838993,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_gid",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "GA1.2.1541528761.1668593420",
    "id": 5
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1668753194.045702,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_heatmaps_g2g_101221539",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "no",
    "id": 6
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1700288594.044776,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_jsuid",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "2910189676",
    "id": 7
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1700288594,
    "hostOnly": false,
    "httpOnly": false,
    "name": "mp_52e5e0805583e8a410f1ed50d8e0c049_mixpanel",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "%7B%22distinct_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24device_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D",
    "id": 8
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "_ok",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "5952-252-10-9497",
    "id": 9
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "_okbk",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "cd4%3Dtrue%2Ccd5%3Davailable%2Cvi5%3D0%2Cvi4%3D1668730803769%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C",
    "id": 10
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "_okdetect",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "%7B%22token%22%3A%2216686754921510%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D",
    "id": 11
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "_oklv",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "1668752960727%2CP3QpSq2BFRKCVLo17n9LP0EDarb0FoA8",
    "id": 12
},
{
    "domain": "www.onlinejobs.ph",
    "expirationDate": 1671430993.21117,
    "hostOnly": true,
    "httpOnly": true,
    "name": "ci_session",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "4f95tir2m5dg84q0edqece1s2ko9kqj4",
    "id": 13
},
{
    "domain": "www.onlinejobs.ph",
    "expirationDate": 1703312594.240649,
    "hostOnly": true,
    "httpOnly": false,
    "name": "hblid",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "QtRO5dBbzhrD0T8H7n9LP0NF6reDAB0A",
    "id": 14
},
{
    "domain": "www.onlinejobs.ph",
    "expirationDate": 1703312594.090266,
    "hostOnly": true,
    "httpOnly": false,
    "name": "olfsk",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "olfsk02491868843945544",
    "id": 15
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "wcsid",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "P3QpSq2BFRKCVLo17n9LP0EDarb0FoA8",
    "id": 16
}
];


	await page.setCookie(...cookies);

	await page.goto(url);

	const [el] = await page.$x('/html/body/section[2]/div/div[5]/div/div/div[2]/p');
	const skill = await el.getProperty('textContent');
	const skillTXT = await skill.jsonValue();


	 console.log(skillTXT);

		

		return skillTXT;

		browser.close();
	};


	async function scrapeSkill(url) {
	
	const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
	const page = await browser.newPage();

	var cookies = [
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1668754394.289118,
    "hostOnly": false,
    "httpOnly": true,
    "name": "__cf_bm",
    "path": "/",
    "sameSite": "no_restriction",
    "secure": true,
    "session": false,
    "storeId": "0",
    "value": "RYZEiorfs5VPlWyrnkDIODQxRkYalBXi5p7bgFYEwZE-1668752594-0-AdRkkiF22wCC+x/Ts9wCdB9SC5z7ALYZa7gYRyzSXJrNXcKkTGvynUQ81iGGbi9ejUmc3ZP24kCZz1D8ODVS8oehhbhCrSb/Gfj+nfQalQWlqChm6Y2wMGl4TfxsB9aDiUq4TkfqwUYIkgr7X8bBFVg=",
    "id": 1
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1676528594,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_fbp",
    "path": "/",
    "sameSite": "lax",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "fb.1.1662388881877.1919595958",
    "id": 2
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1703312593.851857,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_ga",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "GA1.1.1687723548.1662388881",
    "id": 3
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1703312593.851452,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_ga_2ZN6B06KK8",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "GS1.1.1668752593.24.0.1668752593.60.0.0",
    "id": 4
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1668838993,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_gid",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "GA1.2.1541528761.1668593420",
    "id": 5
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1668753194.045702,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_heatmaps_g2g_101221539",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "no",
    "id": 6
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1700288594.044776,
    "hostOnly": false,
    "httpOnly": false,
    "name": "_jsuid",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "2910189676",
    "id": 7
},
{
    "domain": ".onlinejobs.ph",
    "expirationDate": 1700288594,
    "hostOnly": false,
    "httpOnly": false,
    "name": "mp_52e5e0805583e8a410f1ed50d8e0c049_mixpanel",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "%7B%22distinct_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24device_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D",
    "id": 8
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "_ok",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "5952-252-10-9497",
    "id": 9
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "_okbk",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "cd4%3Dtrue%2Ccd5%3Davailable%2Cvi5%3D0%2Cvi4%3D1668730803769%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C",
    "id": 10
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "_okdetect",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "%7B%22token%22%3A%2216686754921510%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D",
    "id": 11
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "_oklv",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "1668752960727%2CP3QpSq2BFRKCVLo17n9LP0EDarb0FoA8",
    "id": 12
},
{
    "domain": "www.onlinejobs.ph",
    "expirationDate": 1671430993.21117,
    "hostOnly": true,
    "httpOnly": true,
    "name": "ci_session",
    "path": "/",
    "sameSite": "unspecified",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "4f95tir2m5dg84q0edqece1s2ko9kqj4",
    "id": 13
},
{
    "domain": "www.onlinejobs.ph",
    "expirationDate": 1703312594.240649,
    "hostOnly": true,
    "httpOnly": false,
    "name": "hblid",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "QtRO5dBbzhrD0T8H7n9LP0NF6reDAB0A",
    "id": 14
},
{
    "domain": "www.onlinejobs.ph",
    "expirationDate": 1703312594.090266,
    "hostOnly": true,
    "httpOnly": false,
    "name": "olfsk",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": false,
    "storeId": "0",
    "value": "olfsk02491868843945544",
    "id": 15
},
{
    "domain": "www.onlinejobs.ph",
    "hostOnly": true,
    "httpOnly": false,
    "name": "wcsid",
    "path": "/",
    "sameSite": "strict",
    "secure": false,
    "session": true,
    "storeId": "0",
    "value": "P3QpSq2BFRKCVLo17n9LP0EDarb0FoA8",
    "id": 16
}
];


	await page.setCookie(...cookies);

	await page.goto(url);


	topSkills = await page.$$eval('li.list-group-item', elements => elements.map(LL => {

	        //Top skills section of OLJ profile
	        const skillName = LL.querySelector('dl dt').innerText;
	        const starValue = LL.querySelector('dd i').classList;




	        return {
	          skillName: skillName,
	          starValue: parseInt(starValue[1].replace('star-','')),
	      }
	}));

			 	const skillsByName = {}
		topSkills.forEach(object => {
		  skillsByName[object.skillName] = object.starValue
		})
		return skillsByName

	
		
		browser.close();
	};




	server.post('/scraping/jsondata', async (req,res) =>{
		const url = req.body.profileURL;
		const recordid = req.body.recordID
		const jsondata = await scrapeSkill(url);
		const skillSummary = await scrapeEmail(url);
		console.log(jsondata);
		const airtablePush = await airtableUpdate(recordid, jsondata).catch(e => console.log(e));
		const airtablePush2 = await airtableUpdate(recordid, {"skillSummary":`${skillSummary}`}).catch(e => console.log(e));
	 	


		res.send(jsondata);

	});

	
