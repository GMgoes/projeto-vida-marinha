import { ConfigFactory } from '@nestjs/config';

const { PORT, NODE_ENV } = process.env;

const envConfig: ConfigFactory = () => ({
  port: Number(PORT || 3000),
  environment: NODE_ENV || 'dev',
});

export default envConfig;
