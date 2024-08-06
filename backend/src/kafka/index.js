const { connectProducer, disconnectProducer } = require("./producer");
const { connectConsumer, disconnectConsumer } = require("./consumer");
const { Kafka } = require("kafkajs");
const {
  KAFKA_BROKERS,
  USERNAME_KAFKA,
  PASSWORD_KAFKA,
} = require("../config/index");

const kafka = new Kafka({
  brokers: ["famous-serval-8257-eu2-kafka.upstash.io:9092"],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username: USERNAME_KAFKA,
    password: PASSWORD_KAFKA,
  },
});

async function startKafka() {
  await connectProducer(kafka);
  await connectConsumer(kafka);
  console.log("Kafka started");
}

async function stopKafka() {
  await disconnectProducer();
  await disconnectConsumer();
  console.log("Kafka stopped");
}

module.exports = { startKafka, stopKafka };
