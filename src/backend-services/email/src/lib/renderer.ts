import fs from 'fs';
import { promisify } from 'util';
import Handlebars from 'handlebars';

const readFileAsync = promisify(fs.readFile);

export async function render(template: string, templateParams: Record<string, string | number>): Promise<string> {
  const templateData = await readFileAsync(template);

  const compiledHtml = Handlebars.compile(templateData.toString());
  return compiledHtml(templateParams);
}
