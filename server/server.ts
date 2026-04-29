import 'dotenv/config';
import { createApp } from './src/app';
import { env } from './src/config/env';

const app = createApp();

app.listen(env.port, () => {
  console.log(`ProofBuddy server running on port ${env.port} [${env.nodeEnv}]`);
});
