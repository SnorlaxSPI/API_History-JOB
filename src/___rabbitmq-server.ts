import client, { Connection, Channel, ConsumeMessage } from 'amqplib';

function Connect() {

}

function createQueue() {
  
}

// Publish
function sendMessages (channel: Channel): void {
  for (let i = 0; i < 10; i++) {
    channel.sendToQueue('myQueue', Buffer.from(`Company:1 - 10/${i} até 20/${i}`));
  }
}

// Consumer for the queue
const consumer: any = (channel: Channel) => (msg: ConsumeMessage | null): void => {
  if(msg) {
    console.log(msg.content.toString());
    // Acknowledge the message
    // channel.ack(msg);
  }
}

const start = async () => {
  const connection: Connection = await client.connect('amqp://username:password@localhost:5672');
  // Create a channel
  const channel: Channel = await connection.createChannel();
  await channel.assertQueue('myQueue');
  sendMessages(channel);
  // Start the consumer
  await channel.consume('myQueue', consumer(channel));
}

start();

export { client };