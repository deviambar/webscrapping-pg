const cloudflareScraper = require('cloudflare-scraper');

(async () => {
  try {
    const response = await cloudflareScraper.get('https://www.propertyguru.com.sg/property-agent-directory/search/101');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();