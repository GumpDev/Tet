import { Client, Message, PermissionString } from 'discord.js';
import Language from './Language';

export default class Command{
    private alias : string[];
    private run : (client: Client, msg: Message, args: string[]) => Promise<string>;
    private description : string;
    private permissions : PermissionString;
    
    constructor(alias : string[], run : (client: Client, msg: Message, args: string[]) => Promise<string>){
        this.alias = alias;
        this.run = run;
        return this;
    }

    getAlias(prefix) : string[]{
        return this.alias.map(a=>{
            return a.replace("[p]",prefix);
        })
    }

    execute(client: Client, msg: Message, args: string[]) : Promise<string>{
        return this.run(client,msg,args);
    }

    setPermissions(permissions : PermissionString){
        this.permissions = permissions;
        return this;
    }

    setDescription(description : string){
        this.description = description;
        return this;
    }

    getPermissions() : PermissionString{
        return this.permissions;
    }

    getDescription(serverId : string) : string{
        return Language.getWord(serverId,this.description);
    }
}