import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";


const useYjsStore = create(devtools((set,get) => ({
  ydoc: null,
  yText: null,
  awareness: null,

  actions: {
    setYjs: ({ ydoc, yText, awareness }) =>
      set({
        ydoc,
        yText,
        awareness,
      }),

    clearYjs: () =>
      set({
        ydoc: null,
        yText: null,
        awareness: null,
      }),
  },

})));

export default useYjsStore;
