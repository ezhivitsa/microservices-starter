import { ENV, Environment } from './environment';

export function initConfig<C>({ development, production, staging }: { development: C; production: C; staging: C }): C {
  const configsMap: Record<Environment, C> = {
    development,
    production,
    staging,
  };

  function getConfig(env: Environment): [Environment, C] {
    const config = configsMap[env];
    if (!config) {
      return [Environment.development, configsMap.development];
    }

    return [env, config];
  }

  const [env, config] = getConfig(ENV);
  console.log(`INFO Using config for '${env}' environment`);

  return config;
}
