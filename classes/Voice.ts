import { Client, Guild } from "discord.js";
import Language from '../classes/Language';
const discordTTS = require("discord-tts");

export default class Voice{
    private broadcast = null;
    private voice = null;
    private guild = null;
    private client = null;

    constructor(client: Client, guild: Guild){
        this.voice = guild.me.voice;
        this.guild = guild;
        this.client = client;

        if(this.voice)
            this.broadcast = client.voice.createBroadcast();
    }
    async play(audio){
        return new Promise((res, err)=>{
            if(this.voice){
                const connection = this.voice.connection;
                if(connection){
                    const dispatcher = connection.play(audio,{ volume: 1 });
                    res(true);
                }else err("tts_disabled");
            }else err("tts_disabled");
        });
    }
    async say(text){
        return new Promise((res, err)=>{
            if(this.voice){
                const connection = this.voice.connection;
                if(connection){
                    this.broadcast.play(discordTTS.getVoiceStream(text,Language.getLangTyped(this.guild.id),1.5));
                    const dispatcher = connection.play(this.broadcast,{ volume: 2 });
                    res(true);
                }else err("tts_disabled");
            }else err("tts_disabled");
        });
    }
}