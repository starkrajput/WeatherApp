const http =require("http");
const fs = require("fs");

var citi =
["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh", "Assam","Bihar" ,"Chandigarh","Delhi","Uttar Pradesh","Lucknow","Varanasi","Mysore",
];
// var citi = "Pune";
var requests =  require("requests");

const homeFile =fs.readFileSync("home.html","utf-8");

const replaceVal = (tempVal,orgVal)=>{
        let temperature =tempVal.replace("{%tempval%}",orgVal.main.temp-271);
        temperature =temperature.replace("{%tempmin%}",orgVal.main.temp_min-299);
        temperature =temperature.replace("{%tempmax%}",orgVal.main.temp_max-250);
        temperature =temperature.replace("{%location%}",orgVal.name);
        temperature =  temperature.replace("{%country%}",orgVal.sys.country);
        temperature =  temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    
        return temperature;
}

const server = http.createServer((req,res)=>{
   if(req.url ="./"){
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${citi[Math.floor((Math.random() * 10) + 1)]}&appid=9e0a8859c69cbc3fc2b53345ccad4903`)
    .on("data",function(chunk){
        const objData = JSON.parse(chunk);
        const arrData = [objData];
        // console.log(arrData[0].main.temp);
            // Array of object.
            // const realTimeData = arrData.map((val)=>{
                 
            //     replaceVal(homeFile,val);
            // });
            const realTimeData = arrData.map(val => replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
            // console.log(realTimeData);
    })
    .on("end",(err) =>{
        if(err)return console.log("connection closed due to error",err);
        res.end();

    });
    }
    else{
        res.end("file not found");
    }
});

server.listen("8000","127.0.0.1");