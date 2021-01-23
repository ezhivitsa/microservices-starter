import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

import { Template } from 'constants/email-constants';

import { logger } from 'lib/logger';
import { config } from 'lib/config';
import { sendEmail, SendData } from 'lib/mailgun';
import { render } from 'lib/renderer';

const writeFileAsync = promisify(fs.writeFile);

const templatesDir = '../../resources/emails/html';

export async function send(
  templateName: Template,
  templateData: Record<string, string | number>,
  data: SendData,
): Promise<void> {
  const templatePath = path.join(__dirname, templatesDir, `${templateName}.html`);
  const html = await render(templatePath, templateData);

  if (config.email.isSendEmail) {
    await sendEmail({ ...data, html });
  }

  if (config.email.savedEmailHtmlPath) {
    const savedName = path.extname(templateName) ? templateName : `${templateName}-${new Date().toISOString()}.html`;
    const tempPath = path.join(config.email.savedEmailHtmlPath, savedName);

    logger.debug(`
      Emails disabled. '${data.subject}' email html has been stored at: ${tempPath}.
      The data is: ${JSON.stringify(templateData)}
    `);

    await writeFileAsync(tempPath, html);
  }

  logger.debug(`
    Emails disabled.
    The data is: ${JSON.stringify(templateData)}
  `);
}
