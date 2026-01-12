const express = require("express");
const fs = require("fs");
// const users = require("./file.json");
//Lets comment out the above users part as I want the users from database now.
const { stringify } = require("querystring");

const mongoose = require("mongoose");// Mongoose is basically a package which i have installed , it will help me to connect my node with mongodb

const app = express();
const PORT = 8000;

//Connection
mongoose
.connect("mongodb:///tutorial")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  jobtitle: {
    type: String,
  },
}, 
{timestamps: true }
);

//Model
const User = mongoose.model("user", userSchema); // Before this we will connect our database.

// Middleware (Assume it as a plug-in)
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  // return res.json({mgs: "Hello from middleware 1"});
  req.myUserName = "harshbairagi.dev";
  next();
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2", req.myUserName);
  // return res.end("Hey");
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.ip} ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

//Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  console.log("I am in get route", req.myUserName);
  console.log(req.headers);
  // res.setHeader("myName" , "Harsh Bairagi");
  // Custom Header
  // So it is a good practice to always add X to custom headers
  res.setHeader("X-MyName", "Harsh Bairagi");
  return res.json(allDbUsers);
});

app.get("/api/users/:id", async (req, res) => {
  //Previously, we were taking id's manually by ourselves, like this
  // const id = Number(req.params.id);
  // const user = users.find((user) => user.id == id);
  //But now as we have our own database with unique id's ,we will get the user through that
  const user = await User.findById(req.params.id)
  if(!user) return res.status(404).json({error: "User not found"});
  return res.json(user);
});

app.post("/api/users", async (req, res) => {
  //TO-DO: Create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.jobtitle
    )  {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobtitle: body.jobtitle,
  });

  // console.log("result", result);

  return res.status(201).json({msg: "success"});
 /* users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./file.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  }); */
  //We have comment out the above thing because, now we will not do this anymore as we have our database now.

  // console.log("Body", body); // Body will come undefined ,because express doesn't know what kind of data it is and how to handle it, so for that we will need to use middleware ,for now assume it as a plug-in
});

app.patch("/api/users/:id", async (req, res) => {
  //TO-DO: Edit the user existing id
  await User.findByIdAndUpdate(req.params.id, {
    lastName: "Changed"
  });
  return res.json({ status: "Success" });
});
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({status: "Success"});
});

app.delete("/api/users/:id", (req, res) => {
  //TO-DO: Delete the user id
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.json({
      status: "Error 404",
      message: "There is no user with this id",
    });
  }
  users.splice(users.indexOf(user), 1);

  fs.writeFile("./file.json", JSON.stringify(users), (err, data) => {
    // Return a 204 status code to indicate that the user was deleted successfully
    return res.json({ status: 204 });
  });
});

//So can you see that the /api/users/:id seems to be a copied thing at every request ,so can't we create it in one liner

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.numberrange == id);
    return res.json(user);
  })
  .patch((req, res) => {
    // Edit user with id
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    // Delete the user with id number
    return res.json({ status: "Pending" });
  });

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
/* 
Middleware --> It is just a function which act as a medium between the server and the function(or the route) ,the server give the request to the middle ware first if it is a bad request or the request is made by any hacker then the middle ware will pass the response ,it will not let request to go on to the next function(like app.get(/users)) .
You can have more than one middlewares also.
Middle ware run at every req-res-cycle.
*/
