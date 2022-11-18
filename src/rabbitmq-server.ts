import rabbit, { Connection, Channel, ConsumeMessage, Message, } from 'amqplib';
import { EventEmitter } from 'events';

export const queueEvent = new EventEmitter();

export const EVENTS = {
  'finish': 'finish',
  'error': 'error'
}

let singleton : any = null;

export async function connectRabbit() {
  let connection = await rabbit.connect("amqp://guest:guest@localhost:5672", { heartbeat: 1 });
  //let connection =  await rabbit.connect("amqp://guest:password@localhost:5672"); 
  //let connection =  await rabbit.connect("amqp://username:password@localhost:5672", { heartbeat: 1 }); 
  
  return connection.createChannel();
}


async function createQueue(channel: Channel, queue: string) {
  return new Promise((resolve, reject) => {
    try {
      channel.prefetch(1);
      channel.assertQueue(queue, { durable: true });
      resolve(channel);
    }
    catch (err) { reject(err) }
  });
}

export async function sendToQueue(queue: string, message: string) {
  console.log('sentToQueue', message)
  const channel = await getCurrentRabbit(queue)
  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(message))
  )
}

export async function consumer(queue: string, callback: (message: { content: string; }) => Promise<void>) {
  const channel = await getCurrentRabbit(queue)
  console.log("Esperando por demanda");

  channel.consume(queue, callback, { noAck: false, exclusive:false });
  channel.consume(queue, callback);

  queueEvent.on(EVENTS.finish, (msg) => {
    console.log('item finalizado', msg, msg.content.toString())
    channel.ack(msg)
  });

  queueEvent.on(EVENTS.error, (msg) => {
    console.log('item rejeitado', msg, msg.content.toString())
    channel.nack(msg)
  });
};

async function getCurrentRabbit(queue: string) {
  if (singleton) return singleton;
  console.log('getRabbit')
  const channel = await connectRabbit()
  await createQueue(channel, queue);
  return singleton = channel;
}

