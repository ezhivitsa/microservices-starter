import mailgunJS, { messages } from 'mailgun-js';

import { logger } from 'lib/logger';
import { config } from 'lib/config';

const mailgun = mailgunJS(config.mailgun);

export function send(data: messages.SendData): Promise<messages.SendResponse> {
  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (err, body) => {
      if (err) {
        logger.error("Email hasn't been sent...", err);
        return reject(err);
      }
      return resolve(body);
    });
  });
}
