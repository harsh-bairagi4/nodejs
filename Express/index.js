// Express
/*
function myhandler(req, res){
        if (req.url === "/favicon.ico") return res.end();
        const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
        const myUrl = url.parse(req.url, true);
        console.log(myUrl);
        fs.appendFile('log.txt', log, (err, data) => {
            switch(myUrl.pathname) {
                case '/':
                   if(req.method == 'GET') res.end("HomePage");
                    break;
                case '/about':
                    const username = myUrl.query.myname;
                    const userid = myUrl.query.user_id;
                    res.end(`Hi, ${username}, this is you userid number ${userid}`);
                    break;
                case '/search':
                    const search = myUrl.query.search_query;
                    res.end("Here are your results for " + search);
                case '/contact-us':
                    res.end("This is contact page");
                    break;
                case '/signup':
                    if(req.method == 'GET') res.end("You are on the sign up page");
                    else if(req.method == 'POST')
                    //DB Query
                     res.end("Success");
                break;
                default:
                    res.end("404 Not Found");
            }
        });
    }
const myServer = http.createServer(myhandler);
*/
// The above one can also be a way to create server with function, but you can see how messy the code is, even it is just a small code then also it is so messy.
//So basically i need a thing or a framework which can help me to write this myhandler function for me and that framework is exprees.
const http = require("http");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    return res.send("Hello From Home Page");
});
app.get("/about", (req, res) =>{
    return res.send("Hello From About Page" + " hey " + req.query.name + " you are " + req.query.age);
});
app.get("/contact", (req, res) =>{
    return res.send(`Hello ${req.query.name}`);
});

// const myServer = http.createServer(app);
// myServer.listen(8000, () => console.log("Server Started"));

//Express gives you a feature to listen your server also ,so you can skip the above thing too

app.listen(8000, () => console.log("Server Started!"));