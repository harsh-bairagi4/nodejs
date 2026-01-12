//Creating a HTTP Server using http module
const http = require("http");
const fs = require("fs");
const url = require("url");


/* const myServer = http.createServer((req, res) =>{
    // console.log("New Request");
   // console.log(req.headers);
  //  console.log(req);

    const log = `${Date.now()}: ${req.url} New Req Received\n`
    fs.appendFile('log.txt', log, (err, data) => {
        switch(req.url) {
            case '/':
                res.end("HomePage");
                break;
            case '/about':
                res.end("I am Harsh Bairagi");
                break;
            case '/contact-us':
                res.end("This is contact page");
                break;
            default:
                res.end("404 Not Found");
        }
    });
}); */

//This .createServer() function creates a server for us

//Now there should be a handler which will handle our whole webserver that for which particular request what should be the response.

//Now to run our server we need a port e.g. a port-number ,so on that port number we will listen our server

//If you are having multiple server you cannot run them on same port.
// myServer.listen(8000, () => {
//     console.log("Server Started!")
// });

/* Handling URL's in NodeJS:
What is URL?
URL is Uniform Resource Locator
https://www.piyushgarg.dev/ 
Here, https is protocol, which basically is a set of rules which tells the browser that in which way you have to communicate, like https which is a secure that means all our request and response will be encrypted as it uses SSL certificate.

Second part is domain (www.piyushgarg.dev) : User Friendly Name of IP Address of My Server, basically our server ,wherever it is running it has an IP address ,but obviously you cannot memorize an IP Address, you cannot tell everyone that this is my IP address visit my website from this , so what do we do is purchase a domain which can be remember and this domain will point to our IP address, so our website can get a user friendly name.

Third part is path(/): This / basically means root path or homepage ,so we can have url paths like
piyushgarg.dev/about
piyushgarg.dev/contact-us
youtube.com/shorts
We can even have nested paths like piyushgarg.dev/project/1

Fourth part is Query Parameters : It is basically the extra information we can pass with our URL 
like piyushgarg.dev/about?userId=1&a=2
Whatever is written after question mark is query parameters, this basically means the request is coming to which path e.g. to the about page and some extra information is provided like userId is 1 and a = 2

*/
// const myServer = http.createServer((req, res ) =>{
//     if (req.url === "/favicon.ico") return res.end();
//     const log = `${Date.now()}: ${req.url} New Req Received\n`;
//     const myUrl = url.parse(req.url, true);
//     console.log(myUrl);
//     fs.appendFile('log.txt', log, (err, data) => {
//         switch(myUrl.pathname) {
//             case '/':
//                 res.end("HomePage");
//                 break;
//             case '/about':
//                 const username = myUrl.query.myname;
//                 const userid = myUrl.query.user_id;
//                 res.end(`Hi, ${username}, this is you userid number ${userid}`);
//                 break;
//             case '/search':
//                 const search = myUrl.query.search_query;
//                 res.end("Here are your results for " + search);
//             case '/contact-us':
//                 res.end("This is contact page");
//                 break;
//             default:
//                 res.end("404 Not Found");
//         }
//     });
// })
// myServer.listen(8000, () => {
//     console.log("Server Started!")
// });

/* HTTP METHODS
   1)GET (It's a by-default method) -> When you want to get some data from the server.
   2)POST -> When you want to send and mutate some data in server.
   3)PUT -> 
   4)PATCH
   5)DELETE
*/

const myServer = http.createServer((req, res ) =>{
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
})
myServer.listen(8000, () => {
    console.log("Server Started!")
});

