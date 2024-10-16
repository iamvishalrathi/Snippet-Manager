import mongoose, { Schema, Document } from 'mongoose';

interface ISnippet extends Document {
    snippetName: string;
    code: string;
    language: string;
    tags?: string[];
}

const snippetSchema: Schema<ISnippet> = new Schema({
    snippetName: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    tags: { type: [String], required: true,},
});

const Snippet = mongoose.model<ISnippet>('Snippet', snippetSchema);
export default Snippet;
