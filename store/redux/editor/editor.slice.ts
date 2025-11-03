import { PlaygroundProject } from "@/@types/playgroundProject.types";
import { File } from "@/components/playground/sidebarFileManager/utils/fileManager";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  activeFile: File | null;
  openTabFiles: File[] | null;
  selectedPlaygroundProject: PlaygroundProject | null;
  terminalInitialized: boolean;
}
const initialState: InitialState = {
  activeFile: null,
  openTabFiles: null,
  selectedPlaygroundProject: null,
  terminalInitialized: false,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setActiveFileReducer: (state, action: { payload: File }) => {
      state.activeFile = action.payload;
    },
    resetEditor: (state) => {
      state.activeFile = null;
      state.openTabFiles = null;
      state.selectedPlaygroundProject = null;
      state.terminalInitialized = false;
    },
    addTabFile: (state, action: { payload: File }) => {
      const alreadyExist =
        state.openTabFiles?.filter((el) => el.id === action.payload.id) ?? [];
      if (alreadyExist?.length === 0) {
        // ADD
        if (state.openTabFiles === null) {
          state.openTabFiles = [action.payload];
        } else {
          state.openTabFiles.push(action.payload);
        }
      }
      if (state.openTabFiles && state.openTabFiles?.length > 4) {
        state.openTabFiles?.shift();
      }
      state.activeFile = action.payload;
    },
    removeTabFile: (state, action: { payload: string }) => {
      const index = state.openTabFiles?.findIndex(
        (el) => el.id === action.payload
      );
      if (index !== -1) {
        if (index !== undefined) {
          state.openTabFiles?.splice(index, 1);
          // SET NEW ACTIVE FILE IF FILES EXIST
          if (state.openTabFiles?.length) {
            state.activeFile =
              state.openTabFiles[state.openTabFiles?.length - 1];
          } else {
            state.activeFile = null;
          }
        }
      }
    },
    setSelectedPlaygroundProject: (
      state,
      action: { payload: PlaygroundProject }
    ) => {
      state.selectedPlaygroundProject = action.payload;
    },

    setTerminalState: (state, action: { payload: boolean }) => {
      state.terminalInitialized = action.payload;
    },
  },
});

export const {
  setActiveFileReducer,
  addTabFile,
  removeTabFile,
  setSelectedPlaygroundProject,
  setTerminalState,
  resetEditor,
} = editorSlice.actions;

export default editorSlice.reducer;
