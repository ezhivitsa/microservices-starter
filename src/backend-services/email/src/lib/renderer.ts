import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Handlebars from 'handlebars';

const readFileAsync = promisify(fs.readFile);

const templatePath = '../../resources/emails';

export async function render(template: string, templateParams: Record<string, string | number>): Promise<string> {
  const templateData = await readFileAsync(path.resolve(`${templatePath}/${template}`));

  const compiledHtml = Handlebars.compile(templateData.toString());
  return compiledHtml(templateParams);
}
