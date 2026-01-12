//File Handling in NodeJS
const fs = require("fs");

// Sync... It was a synchronous call , that create a file in current directory named text.txt in which the content is Hey There.

// fs.writeFileSync('./test.txt', 'Hello World');

//Async... 
// fs.writeFile("./test.txt", "Hello World Async", (err)=> {});

// const result = fs.readFileSync('./contacts.txt', 'utf-8');
// console.log(result);

//An async one doesn't return anything it expect that the user will give it some callback which will contain an error and a result

// fs.readFile("./contacts.txt", "utf-8", (err, result) =>{
//     if(err){
//         console.log("Error :", err);
//     }
//     else{
//         console.log("Result:", result);
//     }
// })

//If you don't want the text to be overridden you can use append method

// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());

fs.appendFileSync("./test.txt", `${Date.now()}Hey There\n`);

// There is a way to copy a file in you directory with the copy_function
// fs.cpSync("./test.txt", "./copy.txt");

//You can even delete a file
// fs.unlinkSync("./copy.txt");

//You can even see statistics of a file
console.log(fs.statSync("./test.txt"));

//Way to create a directory through fs module
// fs.mkdirSync("my-docs");

// Blocking...
console.log("1");
const result = fs.readFileSync("contacts.txt", "utf-8");
console.log(result);
console.log("2");

console.log('\n');
//Non- Blocking...
console.log("1");
fs.readFile("contacts.txt", "utf-8", (err, result) => {
    console.log(result);
})
console.log("2");
console.log("My name is Khan");

//Default Thread Pool Size = 4, it depends on cores of CPU of machine
// Max? - 8core cpu - 8 Threads

const os = require("os");
console.log(os.cpus().length);