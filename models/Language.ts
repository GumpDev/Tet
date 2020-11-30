
import { Schema, model, Document } from 'mongoose';

const languageSchema = new Schema({
    serverId: {
        type: String,
        required: true
    },
    lang: {
        type: String,
        required: true
    }
}, { timestamps: true });

export interface language {
    serverId: string;
    lang: string;
}

interface languageDocument extends language,Document{}

export default model<languageDocument>("language",languageSchema);