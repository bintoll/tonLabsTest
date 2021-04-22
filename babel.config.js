module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@typings': './src/typings',
          '@components': './src/ui/components',
          '@screens': './src/ui/screens',
          '@utils': './src/utils',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'react-native-reanimated/plugin',
  ],
}
