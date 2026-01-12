// function add(a, b) {
//     return a + b;
// }

// function sub (a, b) {
//     return a - b;
// }

//Whatever i am exporting from here is getting stored in math variable.
//module.exports = add;

//This is not a right way to do as the add function is getting overridden 
//module.exports = sub;

//So what is the right way to export, it is through JS objects
// module.exports = {
//     add, sub,
// }
//You can even rename the function like i did below
// module.exports = {
//     addFn: add,
//     subFn: sub,
// }

//There is another way of exporting 

exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;


//In the terminal the above thing is printing it is an anonymous function because technically it doesn't have any name if you think that add and sub are the name of the function they are not the name as add and sub are just the property of function you can even change it to add1 or sub2

//Now which one method to use?
//It depends on the usecase , if you are having a code which has so many functions and they are continuous then use .exports
//But the other one seems to be more good