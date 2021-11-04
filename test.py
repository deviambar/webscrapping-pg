import cloudscraper
import random
import requests
import mysql.connector
from subprocess import check_output
from user_agent import USER_AGENTS


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="propertyguru"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT url FROM propertyguru_link where crawled=0")

myresult = mycursor.fetchall()


DEFAULT_USER_AGENT = random.choice(USER_AGENTS)
scraper = cloudscraper.create_scraper(
    interpreter='nodejs',
    captcha={
        'provider': '2captcha',
        'api_key': '0208ebd1a6c097f01424cf494fd265db'
    }
)

# scraperData = scraper.get('https://www.propertyguru.com.sg/listing/22265376/for-rent-the-alps-residences').text
def main(url):
    f=open("guru99.txt", "w+", encoding="utf-8")
    test = url
    scraperData = scraper.get(test).text
    scraperData = scraperData.split('<div id="wrapper-outer">')[1]
    scraperData = scraperData.split('</div><!--// #wrapper-outer //-->')[0]

    f.write(scraperData)
    f.close()

for x in myresult:  
    try:
        main(x[0])
        p = check_output(['node', 'index.js'])
        sql = "UPDATE propertyguru_link SET crawled = '1' WHERE url = '"+x[0]+"'"
        print(sql)
        mycursor.execute(sql)
        
        mydb.commit()
        # break       # as soon as it works, break out of the loop
    except Exception as e:
        print("error, will try again")
        continue    # otherwise, try again
else:               # if the loop exited normally, e.g. if all 3 attempts failed
    pass


