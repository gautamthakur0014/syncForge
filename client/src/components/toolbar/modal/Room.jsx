import React, { useEffect, useState } from "react";
import { Copy, Check, X } from "lucide-react";
import useRoomStore from "../../../store/useRoomStore";
import { getSocket } from "../../../utils/socket";
import { useStore } from "zustand";
import useEditorStore from "../../../store/useEditorStore";
import useYjsStore from "../../../store/useYjsStore";

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
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-surface-600 bg-surface-800 p-6 shadow-2xl shadow-black/50 scrollbar-thin">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">
              {type === "create" ? "Create Room" : "Join Room"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {type === "create"
                ? "Create and share your room"
                : "Join using a room ID"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-surface-700 hover:text-white"
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
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Room ID
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={roomId}
                    readOnly
                    className="flex-1 rounded-xl border border-surface-600 bg-surface-700 px-4 py-3 font-mono text-sm font-medium text-slate-200 outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white transition hover:bg-brand-600"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              {/* Room Name */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Room Name
                  <span className="ml-1 text-slate-500">(Optional)</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full rounded-xl border border-surface-600 bg-surface-900 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-brand-500"
                />
              </div>

              {/* Name */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Your Name
                </label>

                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="Enter your name"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                  className="w-full rounded-xl border border-surface-600 bg-surface-900 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-brand-500"
                />
              </div>

              {/* Action */}
              <button
                className="mt-6 w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
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
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Room ID
                </label>

                <input
                  type="text"
                  placeholder="Enter room ID"
                  value={roomId || ""}
                  required
                  autoFocus
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full rounded-xl border border-surface-600 bg-surface-900 px-4 py-3 font-mono text-sm text-slate-200 outline-none transition placeholder:font-sans placeholder:text-slate-500 focus:border-brand-500"
                />
              </div>

              {/* Name */}
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Your Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={uName}
                  onChange={(e) => setUName(e.target.value)}
                  className="w-full rounded-xl border border-surface-600 bg-surface-900 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-brand-500"
                />
              </div>

              {/* Action */}
              <button
                className="mt-6 w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
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
