// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// tables (DATA)
// =============================================================
var tables = [
  {
    customerName: "asdf",
    phoneNumber: "666 666 6666",
    customerEmail: "b@gmail.com",
    customerID: "lll"
  },
  {
    customerName: "bob",
    phoneNumber: "546465",
    customerEmail: "hjjhjh",
    customerID: "5"
  },
  {
    customerName: "bob",
    phoneNumber: "5236544",
    customerEmail: "jjehfdn",
    customerID: "5"
  }
];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/home", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/view", function(req, res) {
  //return res.json(tables);
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/clear", function(req, res) {
  // clear tables
  tables = [];
  return res.end();
});

// Displays a single character, or returns false
app.get("/api/waitlist", function(req, res) {
  var chosen = req.params.tables;

  console.log(chosen);

  for (var i = 0; i < tables.length; i++) {
    if (chosen === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

// Create new table reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTableRes = req.body;
  
  if (tables.length >= 5) {
      waitlist.push(newTableRes); 
  } else {
      tables.push(newTableRes);
  }

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  //newTableRes.routeName = newTableRes.name.replace(/\s+/g, "").toLowerCase();

  console.log(newTableRes);

  res.json(newTableRes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
