import { PlaygroundProject } from "@/@types/playgroundProject.types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  projectList: PlaygroundProject[] | null;
}
const initialState: InitialState = {
  projectList: null,
};
export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectList: (state, action: { payload: PlaygroundProject[] }) => {
      state.projectList = action.payload;
    },
  },
});

export const { setProjectList } = projectSlice.actions;

export default projectSlice.reducer;
