import Command      from '../classes/Command';
import { Client, Message } from 'discord.js';
import { commands } from './commands';
import Language from '../classes/Language';

const pack = require("../package.json");

export default new Command(
    [   "[p]ajuda",
        "[p]help",
        "[p]commands",
        "[p]comandos"
    ],
    (client: Client, msg: Message, args: string[]) : Promise<string> => {
        return new Promise((resolve, err)=>{
            let commds = "";
            commands.forEach(c=>{
                if(msg.member.hasPermission(c.getPermissions())){
                    let alias = "";
                    c.getAlias(process.env.PREFIX).forEach((a,i)=>{
                        if(i + 1 == c.getAlias(process.env.PREFIX).length) alias += ` ${Language.getWord(msg.guild.id,"or")} `;
                        else if(i != 0) alias += ", ";
                        alias += a;
                    });
                    commds += (commds!=""?"\n  ":"  ") + c.getDescription(msg.guild.id).replace("[alias]",alias);
                }
            })

            const txt = Language.getWord(msg.guild.id,"help.view")
                .replace("[version]",pack.version)
                .replace("[commands]",commds);
            
            msg.channel.send(txt);
            resolve(null);
        })
    }
).setDescription("help.description")