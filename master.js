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

	async function oljSearch (skills,keyword,salaryBottom, salaryUp, employmentType, trust, addDate) {

		const response = fetch("https://www.onlinejobs.ph/JobseekerSearch/getSearchUrl", {
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
	  "body": `csrf-token=f35ee963e3692774e13b9dc1eb49809c&skills=${skills}location=&keyword=${keyword}&salary=${salaryBottom}&salaryup=${salaryUp}&employmenttype=${employmentType}&trust=${trust}&addate=${adddDte}&op=Search`,
	  "method": "POST"
		});

		const Searchurl = await response.text();
		return Searchurl;

	};


	server.post('/scraping/search', async (req, res) => {
		const skills = body.req.skills;
		const keyword = body.req.keyword;
		const salaryBottom = body.req.SalaryBottom;
		const salaryUp = body.req.salaryUp;
		const employmentType = body.req.employmentType;
		const trust = body.req.trust;
		const addDate = body.req.addDate;

		const search = await oljSearch(skills,keyword,salaryBottom, salaryUp, employmentType, trust, addDate);

		console.log(searc);
		res.send(search);



	});
