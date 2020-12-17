import Command      from '../classes/Command';
import Language     from '../classes/Language';
import { Client, Message } from 'discord.js';

export default new Command(
    [   "[p]lang",
        "[p]language",
        "[p]linguagem",
        "[p]idioma"
    ],
    (client: Client, msg: Message, args: string[]) : Promise<string> => {
        return new Promise(async (resolve, err)=>{
            if(Language.getLangs().includes(args[0])){
                await Language.setLang(msg.guild.id,args[0]);
                resolve(Language.getWord(msg.guild.id,"lang.changed"));
            }else 
                err(Language.getWord(msg.guild.id,"lang.error").replace("[langs]",Language.getLangs().join(", ")));
        })
    }
).setPermissions("ADMINISTRATOR")
.setDescription("lang.description");