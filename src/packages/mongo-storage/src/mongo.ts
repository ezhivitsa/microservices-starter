import { Connection, ConnectOptions, createConnection } from 'mongoose';

import { Config } from './types';

export const getMongo = ({ port, host, database, username, password }: Config): Connection & Promise<Connection> => {
  const url = `mongodb://${host}:${port}/${database}`;

  const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    auth:
      username && password
        ? {
            user: username,
            password,
          }
        : undefined,
  };

  return createConnection(url, options);
};
