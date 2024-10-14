// jest.config.js
module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
  };
  