module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            "@components": "./src/components",
            "@hooks": "./src/hooks",
            "@localTypes": "./src/localTypes",
            "@styles": "./src/styles",
            "@assets": "./src/assets",
            "@services": "./src/services",
            "@store": "./src/store",
            "@models": "./src/models",
            "@utils": "./src/utils",
          }
        }
      ]
    ],
  };
};
