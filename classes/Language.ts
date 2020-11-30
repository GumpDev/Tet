import { readdir, readdirSync, readFileSync } from 'fs';
import { json } from 'mathjs';
import Lang, { language } from '../models/Language';

export default class Language{
    public static jsonLanguages : any = {};
    public static langs : language[] = [];
    public static async init() : Promise<void>{
        this.langs = await Lang.find({});
        readdirSync('./lang/').forEach(l=>{
            l = l.split('.')[0];
            this.jsonLanguages[l] = JSON.parse(readFileSync(`./lang/${l}.json`).toString());
        });
    }
    public static getLangs() : string[]{
        return Object.keys(this.jsonLanguages);
    }
    public static async setLang(serverId : string, lang : string) : Promise<void>{
        lang = lang.toLowerCase();
        const l = await Lang.findOne({serverId});
        if(l) await Lang.findOneAndDelete({serverId});
        await Lang.create({serverId,lang});
        
        let index : number = null;
        this.langs.forEach((l,i)=>{
            if(l.serverId == serverId) index = i;
        })
        if(index) this.langs[index] = {serverId,lang};
        else this.langs.push({serverId,lang});
    }
    public static getLang(serverId : string) : string{
        let index : number = null;
        this.langs.forEach((l,i)=>{
            if(l.serverId == serverId) index = i;
        })
        return index != null ? this.langs[index].lang.toLowerCase() : "en-us";
    }
    public static getLangTyped(serverId) : any{
        const lang = this.getLang(serverId).split("-");
        return `${lang[0]}-${lang[1].toUpperCase()}`;
    }
    public static getWord(serverId: string, word: string) : string{
        return this.jsonLanguages[this.getLang(serverId)][word];
    }
}