import mongoose, { Schema, Model, Document } from 'mongoose';

interface CommandDocument extends Document<string> {
  id: string;
}

type CommandModel = Model<CommandDocument>;

const commandSchema = new Schema<CommandDocument, CommandModel>();

export const Command = mongoose.model<CommandDocument>('commands', commandSchema);
