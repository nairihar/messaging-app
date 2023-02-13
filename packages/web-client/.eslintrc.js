module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
    },
    plugins: ["svelte3"],
    extends: ["eslint:recommended"],
    overrides: [
        {
            files: ["**/*.svelte"],
            processor: "svelte3/svelte3",
        },
    ],
    rules: {
        // ...
    },
};
