import { Schema, Model, Document, Connection } from 'mongoose';

export type CommandDocument = Document<string>;
export type CommandModel = Model<CommandDocument>;

const commandSchema = new Schema<CommandDocument, CommandModel>();

export function initCommand(mongo: Connection): CommandModel {
  return mongo.model<CommandDocument>('commands', commandSchema);
}
