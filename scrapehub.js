const express = require('express');
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer');
const server = express();

const PORT = 8000;

server.use(express.json());
server.use(bodyParser.text()); 

server.get('/', (req, res) => {
	res.json({hello: "world"});

});




async function scrapeEmail(url) {
	
	const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
	const page = await browser.newPage();
	await page.goto(url);

	const [el] = await page.$x('/html/body/section[1]/div[2]/div/div/div[3]/form/input[2]');
	const email = await el.getProperty('value');
	const emailTXT = await email.jsonValue();

	return emailTXT;
};







const data1 = [];




server.post('/scraping/profile', async (req, res) => {
	    
	    const data1info = req.body;
	    data1.push(data1info);
	    const data1txt = data1.toString();
	    const scrapedData = await scrapeEmail(data1txt);
		res.send(scrapedData);
		data1.length = 0;
		
	    });


server.post('/scraping/message', (req,res) => {
const contact_email = req.body.contact_email
	const subject = req.body.subject
	const message1 = req.body.message1

	fetch("https://www.onlinejobs.ph/contact/", {
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
    "cookie": "hblid=QtRO5dBbzhrD0T8H7n9LP0NF6reDAB0A; _fbp=fb.1.1662388881877.1919595958; olfsk=olfsk02491868843945544; _jsuid=2910189676; _gid=GA1.2.1541528761.1668593420; _okdetect=%7B%22token%22%3A%2216686754921510%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; _ok=5952-252-10-9497; ci_session=pro76u90esl9dd0qqkpkeaa8hk6pn72l; wcsid=P3QpSq2BFRKCVLo17n9LP0EDarb0FoA8; _okbk=cd5%3Davailable%2Ccd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1668730803769%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; _ga_2ZN6B06KK8=GS1.1.1668730803.21.1.1668730903.30.0.0; _ga=GA1.1.1687723548.1662388881; mp_52e5e0805583e8a410f1ed50d8e0c049_mixpanel=%7B%22distinct_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24device_id%22%3A%20%22184404325e1cc0-0829f9bb5a1227-19525635-16a7f0-184404325e2129f%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; _oklv=1668738214457%2CP3QpSq2BFRKCVLo17n9LP0EDarb0FoA8",
    "Referer": "https://www.onlinejobs.ph/jobseekers/info/1457271",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `csrf-token=88e4f55b16284a5a93a90a108d2c8503&contact_email=${contact_email}&back_id=1457271&job_id=0&op=1&from_modal=1&info%5Bname%5D=Steven+Greffe&info%5Bemail%5D=admin%40findmyva.com.au&info%5Bsubject%5D=${subject}&Template=&info%5Bmessage%5D=${message1}`,
  "method": "POST"
});

	res.send(message1)


});



server.listen(8000, () => {
	console.log('incoming')

});
