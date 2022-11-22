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


	//Creates a record in Applicant portal base. Data must be in a JSON format ("fieldName:fieldvalue,")
	async function airtableCreate(data) {

		    base('Applicant portal').create([{"fields": data}])
		    .then(() => console.log("Airtable record created successful"))
		    .catch(e => console.log(e))
			};


	async function oljThread (jobID,pageID) {

		const response2 = await fetch(`https://www.onlinejobs.ph/message/getJobThreads/${jobID}/${pageID}`, {
										  "headers": {
										    "accept": "*/*",
										    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
										    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
										    "sec-ch-ua-mobile": "?0",
										    "sec-ch-ua-platform": "\"macOS\"",
										    "sec-fetch-dest": "empty",
										    "sec-fetch-mode": "cors",
										    "sec-fetch-site": "same-origin",
										    "x-requested-with": "XMLHttpRequest",
										    "cookie": "hblid=QtRO5dBbzhrD0T8H7n9LP0NF6reDAB0A; _fbp=fb.1.1662388881877.1919595958; olfsk=olfsk02491868843945544; _jsuid=2910189676; _okdetect=%7B%22token%22%3A%2216690253221690%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; _ok=5952-252-10-9497; _gid=GA1.2.542448838.1669025322; wcsid=ZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8; _okbk=cd5%3Daway%2Ccd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1669081536194%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; __cf_bm=P1JDkfe3UmivOOfn9_taTh4tzZPWzgz_kHPzH.Y4JVg-1669106200-0-AShIVCMk7cN5qIIXha/9ytbrOlGn2PYtmLhL59UiogG8Dxp6lSay7vrToYPkGRO9BOtkTQfZUAeiv3d3BUKDjtpdz1ELBg2BIdsqEN4gs7WCHD0A5q+ZMy+Csxrzjwt/Fj5627plSRi61bKGKPwp+T4=; _heatmaps_g2g_101221539=no; mp_52e5e0805583e8a410f1ed50d8e0c049_mixpanel=%7B%22distinct_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24device_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; _oklv=1669106500772%2CZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8; ci_session=0dn932g5cb3rn51gsjglk2g3p716ogjs; _ga_2ZN6B06KK8=GS1.1.1669104773.46.1.1669106538.60.0.0; _gat_UA-34259447-1=1; _ga=GA1.1.1687723548.1662388881",
										    "Referer": "https://www.onlinejobs.ph/message",
										    "Referrer-Policy": "strict-origin-when-cross-origin"
										  },
										  "body": null,
										  "method": "GET"
										});

			const threadData = await response2.json();
			const threadInfo = await threadData.data.map(e => e.thread_id);

			return threadInfo;


	};	

	async function oljThreadMAX (jobID) {

		const response3 = await fetch(`https://www.onlinejobs.ph/message/getJobThreads/${jobID}/0`, {
										  "headers": {
										    "accept": "*/*",
										    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
										    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
										    "sec-ch-ua-mobile": "?0",
										    "sec-ch-ua-platform": "\"macOS\"",
										    "sec-fetch-dest": "empty",
										    "sec-fetch-mode": "cors",
										    "sec-fetch-site": "same-origin",
										    "x-requested-with": "XMLHttpRequest",
										    "cookie": "hblid=QtRO5dBbzhrD0T8H7n9LP0NF6reDAB0A; _fbp=fb.1.1662388881877.1919595958; olfsk=olfsk02491868843945544; _jsuid=2910189676; _okdetect=%7B%22token%22%3A%2216690253221690%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; _ok=5952-252-10-9497; _gid=GA1.2.542448838.1669025322; wcsid=ZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8; _okbk=cd5%3Daway%2Ccd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1669081536194%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; __cf_bm=P1JDkfe3UmivOOfn9_taTh4tzZPWzgz_kHPzH.Y4JVg-1669106200-0-AShIVCMk7cN5qIIXha/9ytbrOlGn2PYtmLhL59UiogG8Dxp6lSay7vrToYPkGRO9BOtkTQfZUAeiv3d3BUKDjtpdz1ELBg2BIdsqEN4gs7WCHD0A5q+ZMy+Csxrzjwt/Fj5627plSRi61bKGKPwp+T4=; _heatmaps_g2g_101221539=no; mp_52e5e0805583e8a410f1ed50d8e0c049_mixpanel=%7B%22distinct_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24device_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; _oklv=1669106500772%2CZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8; ci_session=0dn932g5cb3rn51gsjglk2g3p716ogjs; _ga_2ZN6B06KK8=GS1.1.1669104773.46.1.1669106538.60.0.0; _gat_UA-34259447-1=1; _ga=GA1.1.1687723548.1662388881",
										    "Referer": "https://www.onlinejobs.ph/message",
										    "Referrer-Policy": "strict-origin-when-cross-origin"
										  },
										  "body": null,
										  "method": "GET"
										});

			const threadData = await response3.json();
			const threadMAX = await threadData.total;

			return threadMAX;


	};	

	const

	server.post('/test1', async (req, res) => {

		const jobTD = req.post.jobTD;
		const threadPage1 = await oljThreadMAX('857212');
		const tp2 = await threadPage1.length;
		const tp3 = await Math.round(tp2 / 10);

		const appTDID = [];
		
		for (let i = 0; i < tp3; i++) {
				  const appThreadID = await oljThread(jobTD,i);
				  appTDID.push(appThreadID);
				}


		console.log(appTDID);
		res.json(appTDID);

	});




	//Takes search form inputs and outputs a onlinejobs URL with the requested search query.
	async function oljSearch (skills,keyword, salary, salaryUp, employmentType, trust, addDate) {

		const response = await fetch("https://www.onlinejobs.ph/JobseekerSearch/getSearchUrl", {
	  	"headers": {
	    "accept": "*/*",
	    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
	    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
	    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
	    "sec-ch-ua-mobile": "?0",
	    "sec-ch-ua-platform": "\"macOS\"",
	    "sec-fetch-dest": "empty",
	    "sec-fetch-mode": "cors",
	    "sec-fetch-site": "same-origin",
	    "x-requested-with": "XMLHttpRequest",
	    "cookie": "hblid=QtRO5dBbzhrD0T8H7n9LP0NF6reDAB0A; _fbp=fb.1.1662388881877.1919595958; olfsk=olfsk02491868843945544; _jsuid=2910189676; _okdetect=%7B%22token%22%3A%2216690253221690%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; _ok=5952-252-10-9497; _gid=GA1.2.542448838.1669025322; wcsid=ZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8; ci_session=6gfa6v2su6j5ebjjgjum9omj51tdmbru; _okbk=cd4%3Dtrue%2Ccd5%3Davailable%2Cvi5%3D0%2Cvi4%3D1669081536194%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; __cf_bm=9fOPmXzsMRguqjcTLfmZ65D_Xua.AJmLh9DqmlqiNOc-1669083242-0-AXuThZAH8tuSmrn3/vPh29AfNXoesoyyMvLexnootkNKg+fXTSsEe9PfzpWVv2+c1UGDWDgipCIhztSstMSI/i2Or4i6Ab+w5NgxX/vXBt5umDDbTmNCpJcipW6VOKBxOva+XWbT2YqHYuEtKDuwlV0=; _heatmaps_g2g_101221539=no; _ga_2ZN6B06KK8=GS1.1.1669081535.42.1.1669083250.52.0.0; _ga=GA1.1.1687723548.1662388881; mp_52e5e0805583e8a410f1ed50d8e0c049_mixpanel=%7B%22distinct_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24device_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; _oklv=1669083250802%2CZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8",
	    "Referer": "https://www.onlinejobs.ph/employers/skillsearch/developer/5e8edd851d2fdfbd7415232c67367cc35422387/0",
	    "Referrer-Policy": "strict-origin-when-cross-origin"
	  },
	  "body": `csrf-token=f35ee963e3692774e13b9dc1eb49809c&skills=${skills}location=&keyword=${keyword}&salary=${salary}&salaryup=${salaryUp}&employmenttype=${employmentType}&trust=${trust}&addate=${addDate}&op=Search`,
	  "method": "POST"
		});

		const Searchurl = await response.json();
		return Searchurl;

	};




	//Scrapes the results of the onlinejobs search and returns a list of applicant URL's returned from the search.
	async function scrapeResult(url) {
		
			const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
			const page = await browser.newPage();

			var cookies = [
								
							{
							    "domain": ".onlinejobs.ph",
							    "expirationDate": 1669093235.02989,
							    "hostOnly": false,
							    "httpOnly": true,
							    "name": "__cf_bm",
							    "path": "/",
							    "sameSite": "no_restriction",
							    "secure": true,
							    "session": false,
							    "storeId": "0",
							    "value": "tSISrAZw7NECMDbx8I5JIH1Ren3N.ya0KeZri1DVXSw-1669091435-0-Acd0cp0Z25SMj4MxHSep3EoC+FIBlSpoHVTAvFQD6feHClAP8+kGU31SJurs5oy5SjVsoXk/MbQka7SCTEtBm/hwRE87gLPxV1pODYX2yKPljkCUZR9a3MeW7UHGGp+D/ygw9hEL6ssQezcPOHjuexo=",
							    "id": 1
							},
							{
							    "domain": ".onlinejobs.ph",
							    "expirationDate": 1676867754,
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
							    "expirationDate": 1703651754.269561,
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
							    "expirationDate": 1703651843.890184,
							    "hostOnly": false,
							    "httpOnly": false,
							    "name": "_ga_2ZN6B06KK8",
							    "path": "/",
							    "sameSite": "unspecified",
							    "secure": false,
							    "session": false,
							    "storeId": "0",
							    "value": "GS1.1.1669091433.44.1.1669091843.60.0.0",
							    "id": 4
							},
							{
							    "domain": ".onlinejobs.ph",
							    "expirationDate": 1669178154,
							    "hostOnly": false,
							    "httpOnly": false,
							    "name": "_gid",
							    "path": "/",
							    "sameSite": "unspecified",
							    "secure": false,
							    "session": false,
							    "storeId": "0",
							    "value": "GA1.2.542448838.1669025322",
							    "id": 5
							},
							{
							    "domain": ".onlinejobs.ph",
							    "expirationDate": 1669092354.667809,
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
							    "expirationDate": 1700627754.667099,
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
							    "expirationDate": 1700627754,
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
							    "value": "cd4%3Dtrue%2Ccd5%3Davailable%2Cvi5%3D0%2Cvi4%3D1669081536194%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C",
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
							    "value": "%7B%22token%22%3A%2216690253221690%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D",
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
							    "value": "1669092239018%2CZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8",
							    "id": 12
							},
							{
							    "domain": "www.onlinejobs.ph",
							    "expirationDate": 1671770154.141783,
							    "hostOnly": true,
							    "httpOnly": true,
							    "name": "ci_session",
							    "path": "/",
							    "sameSite": "unspecified",
							    "secure": false,
							    "session": false,
							    "storeId": "0",
							    "value": "q11i0h09nc9v038cuv3g4vrjk4765ovh",
							    "id": 13
							},
							{
							    "domain": "www.onlinejobs.ph",
							    "expirationDate": 1703651754.880999,
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
							    "expirationDate": 1703651754.677317,
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
							    "value": "ZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8",
							    "id": 16
							}

							];


		await page.setCookie(...cookies);

		await page.goto(url);


		searchResult = await page.$$eval('a.card.card-myaccount.card-worker.card-hover-default.mb-3', elements => elements.map(LL => {
	      
				const queryResults = "https://www.onlinejobs.ph/jobseekers/info/" + LL.querySelector('div.card-body.p-0.pb-4.p-md-0 div.row.no-gutters.top-ltblue.pt-3.pl-3.pr-3 div.col-md-9.col-8.ml-0.mt-md-3.mt-0 div.row.text-left div.col-md-5.text-right.pb-3.pb-md-0 button').getAttribute('data-item-id');


		        return queryResults;    
		      
		}));
		
			return searchResult;
			browser.close();
		};



	async function scrapeProfileInfo(url) {
		
			const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
			const page = await browser.newPage();

			var cookies = [
								
							{
							    "domain": ".onlinejobs.ph",
							    "expirationDate": 1669093235.02989,
							    "hostOnly": false,
							    "httpOnly": true,
							    "name": "__cf_bm",
							    "path": "/",
							    "sameSite": "no_restriction",
							    "secure": true,
							    "session": false,
							    "storeId": "0",
							    "value": "tSISrAZw7NECMDbx8I5JIH1Ren3N.ya0KeZri1DVXSw-1669091435-0-Acd0cp0Z25SMj4MxHSep3EoC+FIBlSpoHVTAvFQD6feHClAP8+kGU31SJurs5oy5SjVsoXk/MbQka7SCTEtBm/hwRE87gLPxV1pODYX2yKPljkCUZR9a3MeW7UHGGp+D/ygw9hEL6ssQezcPOHjuexo=",
							    "id": 1
							},
							{
							    "domain": ".onlinejobs.ph",
							    "expirationDate": 1676867754,
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
							    "expirationDate": 1703651754.269561,
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
							    "expirationDate": 1703651843.890184,
							    "hostOnly": false,
							    "httpOnly": false,
							    "name": "_ga_2ZN6B06KK8",
							    "path": "/",
							    "sameSite": "unspecified",
							    "secure": false,
							    "session": false,
							    "storeId": "0",
							    "value": "GS1.1.1669091433.44.1.1669091843.60.0.0",
							    "id": 4
							},
							{
							    "domain": ".onlinejobs.ph",
							    "expirationDate": 1669178154,
							    "hostOnly": false,
							    "httpOnly": false,
							    "name": "_gid",
							    "path": "/",
							    "sameSite": "unspecified",
							    "secure": false,
							    "session": false,
							    "storeId": "0",
							    "value": "GA1.2.542448838.1669025322",
							    "id": 5
							},
							{
							    "domain": ".onlinejobs.ph",
							    "expirationDate": 1669092354.667809,
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
							    "expirationDate": 1700627754.667099,
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
							    "expirationDate": 1700627754,
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
							    "value": "cd4%3Dtrue%2Ccd5%3Davailable%2Cvi5%3D0%2Cvi4%3D1669081536194%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C",
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
							    "value": "%7B%22token%22%3A%2216690253221690%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D",
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
							    "value": "1669092239018%2CZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8",
							    "id": 12
							},
							{
							    "domain": "www.onlinejobs.ph",
							    "expirationDate": 1671770154.141783,
							    "hostOnly": true,
							    "httpOnly": true,
							    "name": "ci_session",
							    "path": "/",
							    "sameSite": "unspecified",
							    "secure": false,
							    "session": false,
							    "storeId": "0",
							    "value": "q11i0h09nc9v038cuv3g4vrjk4765ovh",
							    "id": 13
							},
							{
							    "domain": "www.onlinejobs.ph",
							    "expirationDate": 1703651754.880999,
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
							    "expirationDate": 1703651754.677317,
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
							    "value": "ZAXhDLSGEWOrVgNm7n9LP0E60rDFAoa8",
							    "id": 16
							}

							];


		await page.setCookie(...cookies);

		await page.goto(url);


		const [el] = await page.$x('/html/body/section[1]/div[2]/div/div/h4');
		const name = await el.getProperty('textContent');
		const nameTXT = await name.jsonValue();

		const [el2] = await page.$x('/html/body/section[1]/div[2]/div/div/div[1]/div/img');
		const img = await el2.getProperty('src');
		const imgTXT = await img.jsonValue();


		const [el3] = await page.$x('/html/body/section[1]/div[2]/div/div/div[3]/form/input[2]');
		const email = await el3.getProperty('value');
		const emailTXT = await email.jsonValue();

		

		const [el5] = await page.$x('/html/body/section[2]/div/div[2]/div/dl/dd/span');
		const exp = await el5.getProperty('textContent');
		const expTXT = await exp.jsonValue();	


		const [el6] = await page.$x('/html/body/section[2]/div/div[5]/div/div/div[2]/p');
		const skill = await el6.getProperty('textContent');
		const skillTXT = await skill.jsonValue();
		


		


			return {
				Name: nameTXT,
				onlineJobsapplicantPhoto: [{"url":`${imgTXT}`}],
				Applicantemail: emailTXT,
				Experienceoverview: expTXT,
				skillSummary: skillTXT,
				

			}

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



		server.post('/scraping/profile', async (req, res)=> {
			const profileURL = req.body.profileURL;

			const profileInfo = await scrapeProfileInfo(profileURL);
			const skillInfo = await scrapeSkill(profileURL);

			const combinedInfo = await {
				...profileInfo,
				...skillInfo

			};

			
			console.log(combinedInfo);
			airtableCreate(combinedInfo);
			res.json(combinedInfo);


		});

		server.post('/scraping/search', async (req, res) => {
		const skills = req.body.skills;
		const keyword = req.body.keyword;
		const salary = req.body.salary;
		const salaryUp = req.body.salaryUp;
		const employmentType = req.body.employmentType;
		const trust = req.body.trust;
		const addDate = req.body.addDate;

		const search = await oljSearch(skills,keyword,salary, salaryUp, employmentType, trust, addDate);

		console.log(search);


		const searchURL = "https://www.onlinejobs.ph" + search;

		const profiles = await scrapeResult(searchURL);

		

		for (let i = 0; i < profiles.length; i++) {

				setTimeout(async function(){
				
					console.log(profiles[i]);
  					const profileInfo = await scrapeProfileInfo(profiles[i]);
					const skillInfo = await scrapeSkill(profiles[i]);

					const combinedInfo = await {
						...profileInfo,
						...skillInfo

						};

			
						console.log(combinedInfo);
						airtableCreate(combinedInfo);

				}, 5000); 
  				
			}
		


			res.send('done');


	});


