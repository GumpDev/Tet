import Command      from '../classes/Command';
import discordTTS   from "discord-tts";
import {createWriteStream} from 'fs';
import { Client, Message } from 'discord.js';
import Language from '../classes/Language';

export default new Command(
    [   
        "[p]tts"
    ],
    (client: Client, msg: Message, args: string[]) : Promise<string> => {
        return new Promise(async (resolve, err)=>{
            if(["on","ativo","ativar","ligar","active"].includes(args[0])){
                const voice = msg.guild.me.voice.channel;
                const voiceChannel = msg.member.voice.channel;
                if(voice == voiceChannel){
                    err(Language.getWord(msg.guild.id,"tts.alreadyEnable").replace("[prefix]",process.env.PREFIX))
                    return;
                }
                if(voiceChannel){
                    var connection = await voiceChannel.join();
                    if(connection)
                        resolve(Language.getWord(msg.guild.id,"tts.success")); 
                    else err(Language.getWord(msg.guild.id,"tts.cantJoin"))
                }else err(Language.getWord(msg.guild.id,"tts.noConnect"))
            }else if(["off","desativar","desativo","desligar","unactive"].includes(args[0])){
                const voice = msg.guild.me.voice.channel;
                if(voice){
                    voice.leave();
                    resolve(Language.getWord(msg.guild.id,"tts.leave"));
                }else err(Language.getWord(msg.guild.id,"tts.noChannel").replace("[prefix]",process.env.PREFIX))
            }else{
                resolve(Language.getWord(msg.guild.id,"tts.help").replace("[prefix]",process.env.PREFIX).replace("[prefix]",process.env.PREFIX).replace("[prefix]",process.env.PREFIX));
            }
        })
    }
).setPermissions("ADMINISTRATOR")