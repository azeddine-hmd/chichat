module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "plugins": [
        "prettier"
    ],
    "extends": [
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": true,
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": "error",
    }
}
