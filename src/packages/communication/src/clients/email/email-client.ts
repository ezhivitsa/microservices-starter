import { EmailTypes, EmailCommand } from '../../proto-messages';

import { KafkaHandlerError } from '../../kafka';
import { Channel } from '../../channels';

import { BaseClient } from '../base-client';
import { CommandMetadata } from '../types';

import { EmailError } from './email-error';

export class EmailClient extends BaseClient<EmailError> {
  _channel = Channel.USERS;

  _getClientError(err: Error): EmailError {
    const errorData =
      err instanceof KafkaHandlerError
        ? err.errorData
        : {
            message: err.message,
          };
    return new EmailError(errorData);
  }

  sendVerifyEmailCommand(data: EmailTypes.SendVerifyEmailRequest, metadata: CommandMetadata): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: EmailCommand.SendVerifyEmail,
      },
      metadata,
    );
  }
}
