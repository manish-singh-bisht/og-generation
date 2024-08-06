const ogGenerate = require("./handlers/consumer/ogGenerate");
const uploadImage = require("./handlers/consumer/uploadImage");

let consumer;

async function connectConsumer(kafka) {
  consumer = kafka.consumer({ groupId: "post-group" });
  await consumer.connect();

  // Subscribe to topics and run handlers
  await consumer.subscribe({ topic: "og-generation", fromBeginning: true });
  await consumer.subscribe({ topic: "image-upload", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (topic === "og-generation") {
        const data = JSON.parse(message.value);

        switch (data.event) {
          case "og-generate":
            await ogGenerate(data);
            break;
          default:
            console.log(`Unknown event type: ${data.event}`);
        }
      }
      if (topic === "image-upload") {
        const data = JSON.parse(message.value);

        switch (data.event) {
          case "upload-image":
            await uploadImage(data);
            break;
          default:
            console.log(`Unknown event type: ${data.event}`);
        }
      }
    },
  });

  console.log("Consumer connected");
}

async function disconnectConsumer() {
  if (consumer) {
    await consumer.disconnect();
    console.log("Consumer disconnected");
  }
}

module.exports = { connectConsumer, disconnectConsumer };
