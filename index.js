const { EventHubClient } = require('azure-event-hubs');
 
const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);
//const client = EventHubClient.createFromConnectionString("Endpoint=sb://expeventhub.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=cElHspuux31Dha3c3BpTDAA/CXmS3BQJa2vty2mTfrg=", "exphub");
  

  
async function main() {
  const eventData = { body: "Hello World"};
  const delivery = await client.send(eventData);
  console.log("message sent successfully.");
  
  const onMessage = (eventData) => {
    console.log(eventData.body);
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


