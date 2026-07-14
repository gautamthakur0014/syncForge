"use strict";

class ImageManager {
  static images = [
    "node:20-alpine",
    "python:3.12-alpine",
    "gcc:14",
    "eclipse-temurin:21-jdk-alpine",
  ];

  static async initialize(docker) {
    for (const image of this.images) {
      await this.ensureImage(docker, image);
    }
  }

  static async ensureImage(docker, imageName) {
    try {
      const image = docker.getImage(imageName);

      await image.inspect();

      console.log(`Image available: ${imageName}`);
    } catch {
      console.log(`Pulling image: ${imageName}`);

      await new Promise((resolve, reject) => {
        docker.pull(imageName, (err, stream) => {
          if (err) {
            return reject(err);
          }

          docker.modem.followProgress(stream, (err) => {
            if (err) {
              return reject(err);
            }

            resolve();
          });
        });
      });

      console.log(`Image pulled: ${imageName}`);
    }
  }
}

module.exports = ImageManager;
