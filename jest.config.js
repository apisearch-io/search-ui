module.exports = {
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/",
        "<rootDir>/dist*",
        "<rootDir>/examples*"
    ],
    "testMatch": [
        "**/__tests__/**/*.test.js?(x)"
    ],
    "snapshotSerializers": [
        "preact-render-spy/snapshot"
    ],
    "notify": true
};