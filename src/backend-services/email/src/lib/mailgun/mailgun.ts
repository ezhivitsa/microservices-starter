import mailgunJS from 'mailgun-js';

import { logger } from 'lib/logger';
import { config } from 'lib/config';

import { SendData, SendResponse } from './types';

const mailgun = mailgunJS(config.mailgun);

export function sendEmail(data: SendData): Promise<SendResponse> {
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
