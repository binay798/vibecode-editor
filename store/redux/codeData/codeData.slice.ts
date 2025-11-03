import { Directory } from "@/components/playground/sidebarFileManager/utils/fileManager";
import { FileSystemTree } from "@/components/playground/webcontainer/webcontainer.types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  monacoEditorCodeData: Directory | null;
  webContainerCodeData: FileSystemTree | null;
}

const initialState: InitialState = {
  monacoEditorCodeData: null,
  webContainerCodeData: null,
};

export const codeDataSlice = createSlice({
  name: "codeSlice",
  initialState,
  reducers: {
    setMonacoEditorCodeData: (state, action: { payload: Directory }) => {
      state.monacoEditorCodeData = action.payload;
    },
    setWebContainerCodeData: (state, action: { payload: FileSystemTree }) => {
      state.webContainerCodeData = action.payload;
    },
  },
});

export const { setMonacoEditorCodeData, setWebContainerCodeData } =
  codeDataSlice.actions;

export default codeDataSlice.reducer;
