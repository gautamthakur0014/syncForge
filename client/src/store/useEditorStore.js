import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { runAPI } from "../services/api";
import useRoomStore from "./useRoomStore";

const useEditorStore = create(
  devtools(
    persist(
      (set, get) => ({
        code: "//start coding here",
        input: "",
        language: "javascript",
        theme: "dark",
        output: "",
        isRunning: false,

        actions: {
          setCode: (newCode) => {
            set({ code: newCode }, false, "editor/setCode");
          },
          setInput: (newInput) => {
            set({ input: newInput }, false, "editor/setInput");
          },

          setLanguage: (lang) =>
            set({ language: lang }, false, "editor/setLanguage"),

          setTheme: (newTheme) =>
            set({ theme: newTheme }, false, "editor/setTheme"),

          setOutput: (result) =>
            set({ output: result }, false, "editor/setOutput"),

          setIsRunning: (status) =>
            set({ isRunning: status }, false, "editor/setIsRunning"),

          runCode: async () => {
            try {
              set({ isRunning: true });

              const { code, language, input } = get();
              const roomId = useRoomStore.getState().roomId;

              const res = await runAPI.run({
                roomId,
                code,
                language,
                input,
              });

              set({
                output: res.data,
              });
            } catch (err) {
              console.log(err);

              set({
                output: "Execution failed",
              });
            } finally {
              set({
                isRunning: false,
              });
            }
          },
        },
      }),
      {
        name: "editor-storage",

        partialize: (state) => ({
          language: state.language,
          theme: state.theme,
        }),
      },
    ),
    {
      name: "EditorStore",
    },
  ),
);

export default useEditorStore;
