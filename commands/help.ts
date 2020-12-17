import Command      from '../classes/Command';
import { Client, Message } from 'discord.js';

import { commands } from './commands';

export default new Command(
    [   "[p]ajuda",
        "[p]help",
        "[p]commands",
        "[p]comandos",
        "🎲"
    ],
    (client: Client, msg: Message, args: string[]) : Promise<string> => {
        return new Promise((resolve, err)=>{
           
        })
    }
).setDescription("help.description")