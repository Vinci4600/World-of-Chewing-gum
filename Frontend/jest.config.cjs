module.exports = {
    testEnvironment: 'jsdom',
    injectGlobals: true,
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Hier eintragen
    moduleNameMapper: {
        // Style Mappings
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        // Bild- und Asset Mappings
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/mocks/fileMock.js',
        '^react$': '<rootDir>/node_modules/react',
        '^react-dom$': '<rootDir>/node_modules/react-dom',
        '^react-dom/(.*)$': '<rootDir>/node_modules/react-dom/$1',
    },
};