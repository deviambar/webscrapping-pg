

function runScrapper(){
  var mysql = require('mysql');

  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "propertyguru"
  });
 fs = require('fs')
 fs.readFile('guru99.txt', 'utf8', function (err,data) {
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
   if(dom.window.document.getElementsByClassName("h2 text-transform-none")[0]){
     title = (dom.window.document.getElementsByClassName("h2 text-transform-none")[0].textContent).trim()
   }

   var property_type = "";
   if(dom.window.document.getElementsByClassName("listing-property-type")[0]){
    property_type = (dom.window.document.getElementsByClassName("listing-property-type")[0].textContent).trim()
   }

   var symbol_unit = "";
   if(dom.window.document.getElementsByClassName("element-label symbol-unit")[0]){
    symbol_unit = (dom.window.document.getElementsByClassName("element-label symbol-unit")[0].textContent).trim()
   }

   var price = "";
   if(dom.window.document.getElementsByClassName("element-label price")[0]){
    price = (dom.window.document.getElementsByClassName("element-label price")[0].getAttribute("content")).trim()
   }

   var price_type = "";
   if(dom.window.document.getElementsByClassName("element-label price-type-tag")[0]){
     price_type = (dom.window.document.getElementsByClassName("element-label price-type-tag")[0].textContent).trim()
   }

   var bed = "";
   if(dom.window.document.getElementsByClassName("property-info-element beds")[0]){
     bed = (dom.window.document.getElementsByClassName("property-info-element beds")[0].textContent).trim()
   }

   var bath = "";
   if(dom.window.document.getElementsByClassName("property-info-element baths")[0]){
     bath = (dom.window.document.getElementsByClassName("property-info-element baths")[0].textContent).trim()
   }

   var area = ""
   var area_unit = ""
   if(dom.window.document.getElementsByClassName("property-info-element area")[0]){
     area = (dom.window.document.getElementsByClassName("property-info-element area")[0].children[0].getAttribute("content")).trim()
     area_unit = (dom.window.document.getElementsByClassName("property-info-element area")[0].children[1].getAttribute("content")).trim()
    }

    var availability = "";
    if(dom.window.document.getElementsByClassName("property-info-element availability")[0]){
      availability = (dom.window.document.getElementsByClassName("property-info-element availability")[0].textContent).trim();
    }

    var price_psf = "";
    if(dom.window.document.getElementsByClassName("property-info-element psf")[0]){
      price_psf = (dom.window.document.getElementsByClassName("property-info-element psf")[0].textContent).trim();
    }

    var listing_title = "";
    if(dom.window.document.getElementsByClassName("listing-title text-transform-none")[0]){
      listing_title = (dom.window.document.getElementsByClassName("listing-title text-transform-none")[0].textContent).trim();
    }

    var listing_address = "";
    var postalcode = "";
    var district = "";

    if(dom.window.document.getElementsByClassName("listing-address")[0]){
      listing_address = (dom.window.document.getElementsByClassName("listing-address")[0].children[1].textContent);
      postalcode = (dom.window.document.getElementsByClassName("listing-address")[0].children[2].textContent);
      district = (dom.window.document.getElementsByClassName("listing-address")[0].children[3].textContent);
    }

    var property_type2 = "";
    if(dom.window.document.getElementsByClassName("property-attr  property-type")[0]){
      property_type2 = (dom.window.document.getElementsByClassName("property-attr  property-type")[0].children[1].textContent).trim();
    }

    var floor_size = "";
    if(dom.window.document.getElementsByClassName("property-attr  floor-area")[0]){
      floor_size = (dom.window.document.getElementsByClassName("property-attr  floor-area")[0].children[1].textContent).trim();
    }

    var land_size = "";
    if(dom.window.document.getElementsByClassName("property-attr text-light-muted")[0]){
      land_size = (dom.window.document.getElementsByClassName("property-attr text-light-muted")[0].children[1].textContent).trim();
    }

    var furnishing = "";
    if(dom.window.document.getElementsByClassName("property-attr  furnishing")[0]){
      furnishing = (dom.window.document.getElementsByClassName("property-attr  furnishing")[0].children[1].textContent).trim();
    }

    var floor_level = "";
    if(dom.window.document.getElementsByClassName("property-attr  floor-level")[0]){
      floor_level = (dom.window.document.getElementsByClassName("property-attr  floor-level")[0].children[1].textContent).trim();
    }

    // . Tenant Status
    var tenant_status = "";
    var tenure = ""
    var developer = ""
    var psf2 = ""
    var top = ""
    var listing_id = ""
    var listed_on = ""

    for (let indexInfo = 0; indexInfo < dom.window.document.getElementsByClassName("property-attr").length; indexInfo++) {
      if(dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[0].textContent.indexOf("Currently Tenanted")>=0){
        tenant_status = dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[1].textContent
      }

      if(dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[0].textContent.indexOf("Tenure")>=0){
        tenure = dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[1].textContent
      }

      if(dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[0].textContent.indexOf("Developer")>=0){
        developer = dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[1].textContent
      }

      if(dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[0].textContent.indexOf("PSF")>=0){
        psf2 = dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[1].textContent
      }

      if(dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[0].textContent.indexOf("TOP")>=0){
        top = dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[1].textContent
      }

      if(dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[0].textContent.indexOf("Listing ID")>=0){
        listing_id = dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[1].textContent
      }

      if(dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[0].textContent.indexOf("Listed on")>=0){
        listed_on = dom.window.document.getElementsByClassName("property-attr")[indexInfo].children[1].textContent
      }
      
    }

    var lat = ""
    var lng = ""

    if(dom.window.document.getElementById("map-canvas")){
      lat = (dom.window.document.getElementById("map-canvas").getAttribute("data-latitude")).trim();
      lng = (dom.window.document.getElementById("map-canvas").getAttribute("data-longitude")).trim();
    }

    var project_link = "";
    if(dom.window.document.getElementsByClassName("mltp-btns")[0]){
      project_link = dom.window.document.getElementsByClassName("mltp-btns")[0].children[0].getAttribute("value");
    }

    var agent_name = ""
    if(dom.window.document.getElementsByClassName("gallery-form__agent-name")[0]){
      agent_name = dom.window.document.getElementsByClassName("gallery-form__agent-name")[0].textContent;
    }

    var agency_name = ""
    var cea_number = ""
    if(dom.window.document.getElementsByClassName("gallery-form__agent-info")[0]){
      if(dom.window.document.getElementsByClassName("gallery-form__agent-info")[0].children[0]){
        agency_name = dom.window.document.getElementsByClassName("gallery-form__agent-info")[0].children[0].textContent;
      }
      if(dom.window.document.getElementsByClassName("gallery-form__agent-info")[0].children[1]){
        cea_number = dom.window.document.getElementsByClassName("gallery-form__agent-info")[0].children[1].textContent;
      }
    }
    
    var agent_phone = ""
    if(dom.window.document.getElementsByClassName("agent-phone-number")[0]){
      agent_phone = dom.window.document.getElementsByClassName("agent-phone-number")[0].textContent
    }
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO pg_raw (`title`, `property_type`, `symbol_unit`, `asking_price`, `offer_type`, `bedrooms`, `bathrooms`, `area`, `area_unit`, `availability`, `psf`, `project_name`, `listing_address`, `postalcode`, `district`, `property_type2`, `floor_size`, `land_size`, `furnishing`, `floor_level`, `tenant_status`, `tenure`, `developer`, `psf2`, `top`, `listing_id`, `listed_on`, `latitude`, `longitude`, `project_link`, `agent_name`, `agency_name`, `cea_number`, `agent_phone`,timestamp) VALUES ('"+title+"', '"+property_type+"','"+symbol_unit+"','"+price+"','"+price_type+"','"+bed+"','"+bath+"','"+area+"','"+area_unit+"','"+availability+"','"+price_psf+"','"+listing_title+"','"+listing_address+"','"+postalcode+"','"+district+"','"+property_type2+"','"+floor_size+"','"+land_size+"','"+furnishing+"','"+floor_level+"','"+tenant_status+"','"+tenure+"','"+developer+"','"+psf2+"','"+top+"','"+listing_id+"','"+listed_on+"','"+lat+"','"+lng+"','"+project_link+"','"+agent_name+"','"+agency_name+"','"+cea_number+"','"+agent_phone+"',NOW())";
      con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted, ID: " + result.insertId);
          con.end();
      });
    });
    
   var listing_data = {
     title : title,
     property_type : property_type,
     symbol_unit : symbol_unit,
     asking_price : price,
     offer_type : price_type,
     bedroom: bed,
     bathroom : bath,
     area: area,
     area_unit : area_unit,
     availability : availability,
     psf : price_psf,
     project_name : listing_title,
     listing_address : listing_address,
     postalcode : postalcode,
     district : district,
     property_type2 : property_type2,
     floor_size : floor_size,
     land_size : land_size,
     furnishing : furnishing,
     floor_level : floor_level,
     tenant_status : tenant_status,
     tenure : tenure,
     developer : developer,
     psf2 : psf2,
     top : top,
     listing_id : listing_id,
     listed_on : listed_on,
     latitude : lat,
     longitude : lng,
     project_link : project_link,
     agent_name : agent_name,
     agency_name : agency_name,
     cea_number : cea_number,
     agent_phone : agent_phone
   }

   var imageList = []
   for (let indexImage = 0; indexImage < dom.window.document.getElementsByClassName("gallery-item image").length; indexImage++) {
     if(dom.window.document.getElementsByClassName("gallery-item image")[indexImage].children[0].getAttribute("content")!=null){
       imageList.push(dom.window.document.getElementsByClassName("gallery-item image")[indexImage].children[0].getAttribute("content"))
     }else{
      imageList.push(dom.window.document.getElementsByClassName("gallery-item image")[indexImage].children[0].src)
     }
   }
  //  listing_data.image_list = imageList

   console.log(listing_data);
    // console.log(">>", dom.window.document.getElementsByClassName("gallery-item")[0].children[0].getAttribute("content"))
  
 });
}
runScrapper()

