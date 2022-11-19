
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7wrwKdYtsERuwF'}).base('appWP3lnaTRbuLIG0');









function airtableUpdate(recordid) {
	base('Applicant data').update([{"id": `${recordid}`, "fields": {
		"Applicant name": "Bob"


	}
	}]);


};

airtableUpdate(recwsLoW6mk3J2Irx);
