import { Client, Message } from 'discord.js';
import Commands from './commands';
import MongoDB from './classes/Mongo';
import { config as DotConfig } from 'dotenv';

const client = new Client();
DotConfig();
MongoDB();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg : Message) => {
    if(!msg.author.bot) Commands(client).executeHandle(msg,process.env.PREFIX);
});

client.login(process.env.TOKEN);