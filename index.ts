import { Client, Message } from 'discord.js';
import Commands from './commands';
import MongoDB from './classes/Mongo';
import Stream from './classes/Stream';
import { config as DotConfig } from 'dotenv';

const client = new Client();
const stream = new Stream(3355);
DotConfig();
MongoDB();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg : Message) => {
    if(!msg.author.bot) Commands(client).executeHandle(msg,process.env.PREFIX).catch(e=>console.error(e));
});

client.login(process.env.TOKEN);