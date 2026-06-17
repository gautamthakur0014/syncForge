import React, { useEffect, useState } from "react";
import { Copy, Check, X } from "lucide-react";
import useRoomStore from "../../../store/useRoomStore";
import { getSocket } from "../../../utils/socket";
import { useStore } from "zustand";
import useEditorStore from "../../../store/useEditorStore";

const Room = ({ type, onClose }) => {
  const setRoom = useRoomStore((state) => state.actions.setRoom);
  const code = useEditorStore((state)=>state.code);
  const language = useEditorStore((state)=>state.language);
  const theme = useEditorStore((state)=>state.theme);

  const [copied, setCopied] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [uName, setUName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userName = uName;

    setRoom(roomId, userName);

    const socket = getSocket();
    socket.emit("joinRoom", {
      roomId,
      userName,
      state : {code, language, theme},
    });
    onClose();
  };

  useEffect(() => {
    if (type === "create") {
      generateRoomId();
    }
  }, [type]);

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    setRoomId(id);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy room id");
    }
  };

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {type === "create" ? "Create Room" : "Join Room"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {type === "create"
                ? "Create and share your room"
                : "Join using a room ID"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* CREATE ROOM */}
        {type === "create" && (
          <div className="space-y-5">
            <form onSubmit={handleSubmit}>
              {/* Room ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Room ID
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={roomId}
                    readOnly
                    className="flex-1 rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-slate-700"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Room Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Room Name
                  <span className="ml-1 text-slate-400">(Optional)</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Your Name
                </label>

                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Enter your name"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>

              {/* Action */}
              <button
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                type="submit"
              >
                Create Room
              </button>
            </form>
          </div>
        )}

        {/* JOIN ROOM */}
        {type === "join" && (
          <div className="space-y-5">
            <form onSubmit={handleSubmit}>
              {/* Room ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Room ID
                </label>

                <input
                  type="text"
                  placeholder="Enter room ID"
                  value={roomId || ""}
                  required
                  autoFocus
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Your Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
                />
              </div>

              {/* Action */}
              <button
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                type="submit"
              >
                Join Room
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
