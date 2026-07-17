const EVENTS = require("../constants/socketEvent");
const { updateLanguage, updateTheme } = require("../managers/roomManager");

const editorSettingSyncHandler = (io, socket) => {
  socket.on("updateLanguage", ({ roomId, language }) => {
    console.log(language);

    if (!roomId) return;
    updateLanguage(roomId, language);

    socket.to(roomId).emit("updatedLanguage", { updatedLanguage: language });
  });

  socket.on("updateTheme", ({ roomId, theme }) => {
    console.log(theme);

    if (!roomId) return;

    updateTheme(roomId, theme);

    socket.to(roomId).emit("updatedTheme", { updatedTheme: theme });
  });
};

module.exports = editorSettingSyncHandler;
