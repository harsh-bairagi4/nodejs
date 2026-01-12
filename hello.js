console.log("Hey there !I am JS");
// console.log(window); // It will give error in the terminal that window is not defined

// console.log(alert("Harsh"));// Similarly this will also give error that alert is not defined 
//But if you do the above things in the browser console window it will print the things ,why is it so because the V8 engine of chrome wasn't directly embedded with C++ , all the DOM related elements or the window related elements were excluded.
//So bascially we meant to say that so many changes were made before embedding it.

//Whenever you start any project you have to right a command called npm init it means npm has been initialised 
//What it does --> It creates a file for us or a template for us which will be helpful to run our project.
//Now after initialisation it is asking for package name (By default it takes NODEJS because its my package name)
//After all this a file named as package.json will be formed it is kind of a configuration file ,you can even make it  manually through typing but obviously there will be chances of error ,so you can use npm init which makes this file automatically .
//Basically package.json is kind of a configuration file e.g. the basic structure of our project ,all the dependencis which will be installed or whenever will publish this project or whenever we will run this thing so all that will be in this configuration.

// ---->Modules in NodeJS

//What is module or modular programming?
//So when we work in production world ,and divide our whole code in small modules that thing is called modular programming.

//For example we have a function here

// function add(a, b) {
//     return a + b;
// }
// console.log(add(2, 5));

//So here this file is a module of mine project as in production world when we will do real world programming we will be having so many functions and so many things and you will be asked that you have to divide your codebase into small modules .
//So what you can do is ,you can make different files and split your code in different files like all the math related work in math.js

const math = require("./math"); //By giving ./ node search for the function in the current directory that if you write ./fs it will give you error that in the current directory there is no module like fs , but if you write only "fs" you will see so many fucntions as fs module has so many functions.

// console.log('Math value is:',math.add(2, 4));
// console.log('Math value is:',math.sub(4, 1));
console.log('Math value is:' ,math.add(5,6));
console.log('Math value is:' ,math.sub(3,9));

/* You can even destructure it

const {add, sub} = require("./math");
console.log("Math Value is", sub(2,4));
 */
//Note: require function is a built in module of nodejs not any javascript function , you will not see require function in javascript