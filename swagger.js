const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Authentication",
        description: "Description",
    },
    host: "localhost:3000",
    basePath: "/Authentication",
    schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
    "./index.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);