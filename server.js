const { EventHubClient } = require('azure-event-hubs');
 
const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);
  
async function main() {
  
  const onMessage = (eventData) => {
	console.log("Message received: " + eventData.body);  
    const enqueuedTime = eventData.annotations["x-opt-enqueued-time"];
    console.log("Enqueued Time: ", enqueuedTime);
  };
  
  const onError = (err) => {
	  console.log(err);
  }  
  const receiveHandler = client.receive("0", onMessage, onError);
}
 
main().catch((err) => {
  console.log(err);
});

var express = require( 'express')
var app = express()


app.set( 'views', __dirname + '/views')
app.set( 'view engine', 'jade')
app.use( express.static( __dirname + '/public'))

app.get( '/', function ( req, res) {
  res.render( 'pages/index', {
    app_environment:    app.settings.env
  })
})

app.get( '/send', function ( req, res) {
  const eventData = { body: req.query.message};
  const delivery = client.send(eventData);
  console.log("Message sent successfully with Event Data: " + eventData);	
  res.send("Message sent with Event Data: " + req.query.message);
})

app.listen( process.env.PORT || 4000)
console.log("app listening");