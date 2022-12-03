const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.send(messages)
});

app.get("/messages/:id", function (request, response) {
  const idUser = request.params.id;
  const searchId = messages.find(element => element.id == idUser);
  response.send(searchId);
});

app.post("/messages", function(request, response){
  const message = request.body
  if(
    message.from == undefined ||
    message.text == undefined){
      return response.status(400).send({success: false, message: "..."})
    } else {
      message.id = messages.length
      messages.push(message)
      response.status(201).send(message)

    }
})

app.delete("/messages/:id", function(request, response){
  const idUser = request.params.id;

  const messagesFiltered = messages.filter(element => element.id != idUser);
  messages = messagesFiltered;
  response.status(201).send(`The id number ${idUser} was deleted.`)
})

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
