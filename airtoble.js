
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7wrwKdYtsERuwF'}).base('appWP3lnaTRbuLIG0');





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
