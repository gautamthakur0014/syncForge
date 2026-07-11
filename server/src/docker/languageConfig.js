const LanguageConfig = {
  javascript: {
    image: "node:20-alpine",
    filename: "main.js",
    runCommand: ["node", "main.js"],
  },

  python: {
    image: "python:3.12-alpine",
    filename: "main.py",
    runCommand: ["python", "main.py"],
  },

  cpp: {
    image: "gcc:14",
    filename: "main.cpp",
    runCommand: ["sh", "-c", "g++ main.cpp -o main && ./main"],
  },

  java: {
    image: "openjdk:21",
    filename: "Main.java",
    runCommand: ["sh", "-c", "javac Main.java && java Main"],
  },
};

module.exports =  LanguageConfig;
