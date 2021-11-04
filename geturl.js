

function runScrapper(){
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "propertyguru"
    });

    fs = require('fs')
    fs.readFile('url.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      while (SCRIPT_REGEX.test(data)) {
          data = data.replace(SCRIPT_REGEX, "");
      }
      const jsdom = require("jsdom");
      const { JSDOM } = jsdom;
      const dom = new JSDOM(data);
      
      var title = "";
      title = dom.window.document.querySelectorAll('a');
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    
        for (let i = 0, element; (element = title[i]); i++) {
          var link = element.href
          if(link.includes("https://www.propertyguru.com.sg/listing/")){
            if(link.toLowerCase().indexOf("whatsapp") === -1){
                if(link.toLowerCase().indexOf("contact-agent") === -1){
                    var sql_select = "select id from propertyguru_link where url = '"+element.href+"'";
                    console.log(sql_select)
                    con.query(sql_select, function (err, result_select) {
                        if (err) throw err;
                        console.log(result_select.length);
                        console.log(element.href);
                        if(result_select.length == 0){
                            var sql = "INSERT INTO propertyguru_link (url, crawled) VALUES ('"+element.href+"', '0')";
                            con.query(sql, function (err, result) {
                                if (err) throw err;
                                console.log("1 record inserted, ID: " + result.insertId);
                            });
                        }
                    });
                    
                }
            }
          }
        
        }
        
      });
    });
   }
   runScrapper()
   
   