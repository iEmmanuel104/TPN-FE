// src/state/slices/moduleSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModuleDto } from "../../api/moduleApi";

export interface ModuleState {
    modules: ModuleDto[];
    selectedModule: ModuleDto | null;
}

const initialState: ModuleState = {
    modules: [],
    selectedModule: null,
};

export const moduleSlice = createSlice({
    name: "module",
    initialState,
    reducers: {
        setModules: (state, action: PayloadAction<ModuleDto[]>) => {
            state.modules = action.payload;
        },
        setSelectedModule: (state, action: PayloadAction<ModuleDto>) => {
            state.selectedModule = action.payload;
        },
    },
});

export const { setModules, setSelectedModule } = moduleSlice.actions;

export default moduleSlice.reducer;