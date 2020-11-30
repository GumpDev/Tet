import Command      from '../classes/Command';
import { Client, Message } from 'discord.js';
import Language from '../classes/Language';
const discordTTS = require("discord-tts");

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
            if(voice){
                const broadcast = client.voice.createBroadcast();
                const connection = voice.connection;
                if(connection){
                    broadcast.play(discordTTS.getVoiceStream(args.join(" "),Language.getLangTyped(msg.guild.id),1.5));
                    const dispatcher = connection.play(broadcast,{ volume: 2 });
                    resolve(Language.getWord(msg.guild.id,"say.said").replace("[content]",args.join(" ")));
                } 
            }else err(Language.getWord(msg.guild.id,"tts.noChannel"))
        })
    }
).setPermissions("SEND_TTS_MESSAGES")