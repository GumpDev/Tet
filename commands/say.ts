import Command      from '../classes/Command';
import { Client, Message } from 'discord.js';
import Language from '../classes/Language';
import Voice from '../classes/Voice';

export default new Command(
    [   
        "[p]say",
        "[p]falar",
        "[p]voz",
        "[p]voice"
    ],
    (client: Client, msg: Message, args: string[]) : Promise<string> => {
        return new Promise(async (resolve, err)=>{
            const voice = msg.guild.me.voice;
            const voiceChannel = msg.member.voice.channel;
            if(voice){
                if(voice.channel != voiceChannel){
                    err(Language.getWord(msg.guild.id,"say.differentChannel"))
                    return;
                }
                new Voice(client,msg.guild).say(args.join(" ")).then(r=>{
                    resolve(Language.getWord(msg.guild.id,"say.said").replace("[content]",args.join(" ")));
                })
            }else err(Language.getWord(msg.guild.id,"tts.noChannel"))
        })
    }
).setPermissions("SEND_TTS_MESSAGES")
.setDescription("say.description")