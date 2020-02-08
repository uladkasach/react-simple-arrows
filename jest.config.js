module.exports = {
  verbose: true, // indicates whether each individual test should be reported during the run and whether logs are displayed
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/src/**/?(*.)+(spec|test).(js|ts|jsx|tsx)'],
  testEnvironment: 'jsdom',
};
