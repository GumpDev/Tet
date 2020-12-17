import { Client, Message } from 'discord.js';
import Language from '../classes/Language';
import { commands } from './commands';

export default function (client : Client){
    return {
        async executeHandle(msg : Message, prefix : string) : Promise<void>{
            const args : string[] = msg.content.includes(" ") ? msg.content.split(" ") : [msg.content];
            const command : string = args.splice(0,1)[0];

            let executed = false;
            const commandsExecuter = commands.map(async c=>{
                return new Promise(async resolve=>{
                    if(c.getAlias(prefix).includes(command)){
                        if(msg.member.permissions.has(c.getPermissions())){
                            const rel = await c.execute(client,msg,args).then(r=>{
                                if(r) msg.reply(r);
                            }).catch(e=>{
                                msg.reply(`⛔ ${e}`); 
                            });
                        }else msg.reply(Language.getWord(msg.guild.id,"noPermission")); 
                        executed = true;
                    }
                    resolve(true);
                })
            });
            const promise = await Promise.all(commandsExecuter)
                .then(r=>{
                    if(!executed && msg.content.startsWith(prefix)) msg.reply(Language.getWord(msg.guild.id,"noCommand").replace("[prefix]",prefix));
                })
                .catch(e=>{
                    console.log(`Error ${msg.guild.id}: ${e.tostring()}`);
                })
        }
    }
}