import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // setupFiles: ['<rootDir>/test/.setup.ts'],
  globalTeardown: '<rootDir>/test/teardown.ts',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default config;
