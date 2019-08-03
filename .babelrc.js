module.exports = api => {
  api.cache(false);

  return {
    env: {
      build: {
        presets: ['@babel/env'],
        plugins: [['@babel/proposal-object-rest-spread', { loose: true }]],
      },
      test: {
        presets: ['@ava/stage-4', '@ava/transform-test-files'],
      },
    },
  };
};
