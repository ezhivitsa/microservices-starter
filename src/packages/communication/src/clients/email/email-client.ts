import { EmailTypes, EmailCommand } from '../../proto-messages';

import { KafkaHandlerError } from '../../kafka';
import { Channel } from '../../channels';
import { Version } from '../../messages';

import { BaseClient } from '../base-client';
import { ClientCommandMetadata } from '../types';

import { EmailError } from './email-error';

export class EmailClient extends BaseClient<EmailError> {
  _channel = Channel.EMAIL;
  _version = Version.v1;

  _getClientError(err: Error): EmailError {
    const errorData =
      err instanceof KafkaHandlerError
        ? err.errorData
        : {
            message: err.message,
          };
    return new EmailError(errorData);
  }

  sendVerifyEmailCommand(data: EmailTypes.SendVerifyEmailRequest, metadata: ClientCommandMetadata): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: EmailCommand.SendVerifyEmail,
      },
      metadata,
    );
  }

  sendForgotPasswordEmailCommand(
    data: EmailTypes.SendForgotPasswordEmailRequest,
    metadata: ClientCommandMetadata,
  ): Promise<void> {
    return this._sendCommand(
      {
        data,
        command: EmailCommand.SendForgotPasswordEmail,
      },
      metadata,
    );
  }
}
