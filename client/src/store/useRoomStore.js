import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useRoomStore = create(
  devtools(
    (set, get) => ({
      userName: null,
      roomId: null,
      isInRoom: false,
      users: [],

      actions: {
        setRoom: (roomId, userName) =>
          set({
            roomId: roomId,
            userName: userName,
            isInRoom: true,
          }),

        leaveRoom: () =>
          set({
            roomId: null,
            isInRoom: false,
            users: [],
          }),

        setUsers: (usersList) => set({ users: usersList }),
        addUser: (username) =>
          set((state) => ({
            users: [...state.users, username],
          })),

        removeUser: (username) =>
          set((state) => ({
            users: state.users.filter((u) => u.userName !== username),
          })),

        clearUsers: () => set({ users: [] }),
      },
    }),
    // persist({
    //   name: "room-storage",

    //   partialize: (state) => ({
    //     roomId: state.roomId,
    //     userName: state.userName,
    //     isInRoom: state.isInRoom,
    //   }),
    // }),

    {
      name: "RoomStore",
    },
  ),
);

export default useRoomStore;
