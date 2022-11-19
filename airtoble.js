Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key7wrwKdYtsERuwF'
});
const base = new Airtable({apiKey: 'key7wrwKdYtsERuwF'}).base('appWP3lnaTRbuLIG0');
const airtable = require('airtable');








function airtableUpdate() {
		base('Applicant data').update([
  {
    "id": "recwsLoW6mk3J2Irx",
    "fields": {
      "Applicant name": "bob",
      }]);
   

	};

airtableUpdate();
