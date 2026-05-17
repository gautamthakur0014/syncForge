import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useRoomStore = create(
  devtools(
    (set) => ({
      roomId: "",
      users: [],

      setRoomId: (id) => set({ roomId: id }),

      setUsers: (usersList) => set({ users: usersList }),
    }),

    {
      name: "RoomStore",
    },
  ),
);

export default useRoomStore;
