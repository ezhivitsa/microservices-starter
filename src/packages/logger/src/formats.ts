import { inspect } from 'util';
import { LEVEL, MESSAGE, SPLAT } from 'triple-beam';
import { format } from 'winston';

interface PrettyFormatMetaOpts {
  metaKey?: string;
  depth?: number;
  colorize?: boolean;
}

const prettyMeta = format((info, opts: PrettyFormatMetaOpts) => {
  const metaKey = opts.metaKey || 'meta';
  const strippedInfo = Object.assign({}, info[metaKey]);
  delete strippedInfo[LEVEL];
  delete strippedInfo[SPLAT];
  if (Object.keys(strippedInfo).length > 0) {
    Object.assign(info, { [MESSAGE]: inspect(strippedInfo, false, opts.depth || null, opts.colorize) });
  }
  return info;
});

const padEssentials = format((info) => {
  const essentials = `${info.level}: [${info.timestamp}] ${info.message}`;
  Object.assign(info, { [MESSAGE]: info[MESSAGE as any] ? `${essentials} -- ${info[MESSAGE as any]}` : essentials });

  return info;
});

export const localFormat = format.combine(
  format.timestamp(),
  format.metadata({ key: 'meta', fillExcept: ['timestamp', 'level', 'message'] }),
  prettyMeta({ metaKey: 'meta', colorize: true }),
  format.colorize({ all: true }),
  padEssentials(),
);

export const cloudFormat = format.combine(format.timestamp(), format.json());
