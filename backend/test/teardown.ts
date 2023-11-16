import { execSync } from 'child_process';
import { Config } from 'jest';

export async function resetDatabase() {
  try {
    execSync(`DATABASE_URL=$TEST_DATABASE_URL npx prisma migrate reset -f >/dev/null`, { stdio: 'inherit' });
  } catch (err) {
    console.error(err);
  }
}

export default (jestConfig: Config, projectConfig?: Config) => {
  Promise.all([resetDatabase()]);
};
