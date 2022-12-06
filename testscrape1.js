const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://www.flashscore.com/table-tennis/others-men/liga-pro-cz/results/');
 
  const results = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('#fs-results > div.fs-table > div.fs-table__body > div.fs-table__row'));
    return rows.map(row => {
      const columns = row.querySelectorAll('div.fs-table__cell');
      return {
        date: columns[0].innerText,
        time: columns[1].innerText,
        homeTeam: columns[2].innerText,
        awayTeam: columns[3].innerText,
        score: columns[4].innerText,
        status: columns[5].innerText,
        link: columns[2].querySelector('a').href,
      };
    });
  });
  const mozolGames = results.filter(result => result.homeTeam.includes('Mozol P.') || result.awayTeam.includes('Mozol P.'));
  console.log(mozolGames);
  await browser.close();
})();
