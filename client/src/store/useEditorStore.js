import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { runAPI } from "../services/api";

const useEditorStore = create(
  devtools(
    persist(
      (set, get) => ({
        code: "//start coding here",
        language: "javaScript",
        theme: "dark",
        output: null,
        isRunning: false,

        actions: {
          setCode: (newCode) => set({ code: newCode }, false, "editor/setCode"),

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

              const { code, language } = get();

              const res = await runAPI.run({
                code,
                language,
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
