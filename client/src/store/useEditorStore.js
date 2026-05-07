import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useEditorStore = create(
  devtools(
    persist(
      (set) => ({
        code: "//start coding here",
        language: "javascript",
        theme: "dark",
        output: "",
        isRunning: false,

        setCode: (newCode) => set({ code: newCode }, false, "editor/setCode"),

        setLanguage: (lang) =>
          set({ language: lang }, false, "editor/setLanguage"),

        setTheme: (newTheme) =>
          set({ theme: newTheme }, false, "editor/setTheme"),

        setOutput: (result) =>
          set({ output: result }, false, "editor/setOutput"),

        setIsRunning: (status) =>
          set({ isRunning: status }, false, "editor/setIsRunning"),
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
