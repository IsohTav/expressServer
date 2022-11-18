const puppeteer = require('puppeteer');


async function scrapeEmail(url) {
	
	const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
	const page = await browser.newPage();

	var cookies = [
		{
			"name": "cookie1",
			"value": "hblid=QtRO5dBbzhrD0T8H7n9LP0NF6reDAB0A; _fbp=fb.1.1662388881877.1919595958; olfsk=olfsk02491868843945544; _jsuid=2910189676; _gid=GA1.2.276761109.1668418889; _okdetect=%7B%22token%22%3A%2216684188895870%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; _ok=5952-252-10-9497; wcsid=UHkwczoYI0PLeiLn7n9LP0EA6Ba8ArFD; _heatmaps_g2g_101221539=no; __cf_bm=40NbbDbD1Bu2V6CNZU0l9CZvJIcqmxtA7teaHsgD628-1668492684-0-AY1SZeMYdlsqBGLrH5wBJfGZWz/ePw3IZSX/I0M4T1+n9PQ9W1acWJTq/rKw/OcEHQgdsmmvezSs/hP/sxXkJj/0Cqbgmf8TmT+n+vqhQuPNI/LWRQVsYMcLWPwOsA2fjQ==; _okbk=cd5%3Daway%2Ccd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1668485430320%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; ci_session=uv9m9bcl28g8ujns6e3japk57pb8kr1q; _ga_2ZN6B06KK8=GS1.1.1668492683.10.1.1668493446.14.0.0; _ga=GA1.1.1687723548.1662388881; mp_52e5e0805583e8a410f1ed50d8e0c049_mixpanel=%7B%22distinct_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24device_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; _oklv=1668493448633%2CUHkwczoYI0PLeiLn7n9LP0EA6Ba8ArFD",
			"domain": "onlinejobs.ph"

		},
		{
			      "name": "sample-cookie2",
            "value": "2",
            "domain": "pptr.dev"
			
		}




	];


	await page.setCookie(...cookies);

	await page.goto(url);

	const [el] = await page.$x('/html/body/section[1]/div[2]/div/div/h4');
	const email = await el.getProperty('textContent');
	const emailTXT = await email.jsonValue();

	return emailTXT;
};

const result = scrapeEmail('https://www.onlinejobs.ph/jobseekers/info/1457271');

console.log(result);
