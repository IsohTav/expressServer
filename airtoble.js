
const airtable = require('airtable');

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key7wrwKdYtsERuwF'
});
const base = new Airtable({apiKey: 'key7wrwKdYtsERuwF'}).base('appWP3lnaTRbuLIG0');





const recordID = base('Applicant data').find('recwsLoW6mk3J2Irx', function(err, record) {
    if (err) { console.error(err); return; }
    console.log('Retrieved', record.id);
});



function airtableUpdate() {
	base('Applicant data').update([{"id": "recwsLoW6mk3J2Irx", "fields": {
		"Applicant name": "Bob"


	}
	}]);


};

airtableUpdate();
