import Command      from '../classes/Command';
import { evaluate } from "mathjs";
import { Client, Message } from 'discord.js';
import Language from '../classes/Language';
import Voice from '../classes/Voice';
const discordTTS = require("discord-tts");

const regex  = new RegExp("d[0-9]*","gm");
const regex2 = new RegExp("[0-9]d[0-9]*","gm");

export default new Command(
    [   "[p]roll",
        "[p]rolar",
        "[p]dice",
        "[p]dado",
        "🎲"
    ],
    (client: Client, msg: Message, args: string[]) : Promise<string> => {
        return new Promise((resolve, err)=>{
            let content = args.join(" ");
            const oldContent = content;
            const diceD = [];
            const dice = [];
            if(content.match(regex2))
                content.match(regex2).forEach(o=>{
                    const d = o.split("d");
                    const i = parseInt(d[0]);
                    let str = "";
                    for(let x = 0; x < i; x++)
                        str += x == 0 ? `d${d[1]}` : `+d${d[1]}`;
                    content = content.replace(d.join("d"),str);
                })
            if(content.match(regex))
                content.match(regex).forEach(d=>{
                    const result = Math.floor(Math.random() * parseInt(d.replace("d",""))) + 1;
                    content = content.replace(d,result.toString());
                    diceD.push(d);
                    dice.push(result);
                })
            const resultado = evaluate(content);
            if(typeof(resultado) == "number"){
                const voice = msg.guild.me.voice;
                if(voice){
                    new Voice(client,msg.guild).play("./sounds/dice.mp3").then(t=>{
                        setTimeout(() => {
                            new Voice(client,msg.guild).say(Language.getWord(msg.guild.id,"dice.tts").replace("[name]",msg.member.nickname).replace("[result]",resultado.toString()))
                        }, 950);
                    }).catch(e=>{});
                }
                resolve(Language.getWord(msg.guild.id, "dice.result")
                    .replace("[total]",resultado.toString())
                    .replace("[equation]",oldContent)
                    .replace("[dices]",
                        dice.map((d,i)=>{
                            return `        *${diceD[i]} = ${d}*`
                        }).join("\n")));
            }else
                err(Language.getWord(msg.guild.id,"dice.error"))
        })
    }
).setDescription("dice.description")