import { connect, connection} from 'mongoose';
import Language from './Language';

export default function(){
    connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true,useUnifiedTopology: true});
    connection.on("open",()=>console.log("Connected on MongoDB!"));
    Language.init();
}