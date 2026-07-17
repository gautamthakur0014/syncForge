const LanguageConfig = {
  javascript: {
    image: "node:20-alpine",
    filename: "main.js",
    runCommand: ["sh", "-c", "node main.js < input.txt"],
  },

  python: {
    image: "python:3.12-alpine",
    filename: "main.py",
    runCommand: ["sh", "-c", "python main.py < input.txt"],
  },

  cpp: {
    image: "gcc:14",
    filename: "main.cpp",
    runCommand: ["sh", "-c", "g++ main.cpp -o main && ./main < input.txt"],
  },

  java: {
    image: "eclipse-temurin:21-jdk-alpine",
    filename: "Main.java",
    runCommand: ["sh", "-c", "javac Main.java && java Main < input.txt"],
  },
};

module.exports =  LanguageConfig;
