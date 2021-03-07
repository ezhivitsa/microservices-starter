import mongoose, { Schema, Model, Document, Connection } from 'mongoose';

export type CommandDocument = Document<string>;
export type CommandModel = Model<CommandDocument>;

const commandSchema = new Schema<CommandDocument, CommandModel>({
  _id: { type: String, required: true },
});

// export function initCommand(mongo: Connection): CommandModel {
//   return mongo.model<CommandDocument>('commands', commandSchema);
// }

export function initCommand(): CommandModel {
  return mongoose.model<CommandDocument>('commands', commandSchema);
}
