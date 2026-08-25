import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Plus, LogIn } from "lucide-react";
import Room from "./modal/Room";

const RoomDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [modalType, setModalType] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleCreateRoom = () => {
    setModalType("create");
    setOpenDropdown(false);
  };

  const handleJoinRoom = () => {
    setModalType("join");
    setOpenDropdown(false);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Toolbar Button */}
        <button
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-lg border border-surface-600 bg-surface-800 px-3.5 py-1.5 text-sm font-medium text-slate-200 transition hover:border-surface-500"
        >
          Room
          <ChevronDown
            size={15}
            className={`transition-transform duration-200 ${
              openDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {openDropdown && (
          <div className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border border-surface-600 bg-surface-800 shadow-2xl shadow-black/40">
            <button
              onClick={handleCreateRoom}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-surface-700"
            >
              <Plus size={16} className="text-brand-400" />
              Create Room
            </button>

            <div className="h-px bg-surface-600" />

            <button
              onClick={handleJoinRoom}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-surface-700"
            >
              <LogIn size={16} className="text-brand-400" />
              Join Room
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <Room type={modalType} onClose={() => setModalType(null)} />
    </>
  );
};

export default RoomDropdown;
