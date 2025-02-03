module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typscript-eslint',
        'plugin:prettier/recommended',
    ],
    parseOptions: {
        emcaVersion: 2018,
        sourceType: "module"
    },
    rules: {},
};
