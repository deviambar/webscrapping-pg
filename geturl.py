import cloudscraper

scraper = cloudscraper.create_scraper(
    interpreter='nodejs',
    captcha={
        'provider': '2captcha',
        'api_key': '0208ebd1a6c097f01424cf494fd265db'
    }
)
f=open("url.txt", "w+", encoding="utf-8")
scraperData = scraper.get('https://www.propertyguru.com.sg/property-agent-directory/search/101').text
scraperData = scraperData.split('<div id="wrapper-outer">')[1]
scraperData = scraperData.split('</div><!--// #wrapper-outer //-->')[0]

f.write(scraperData)
f.close()