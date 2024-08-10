// src/state/slices/certificateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICertificateTemplate } from "../../api/certificateApi";

export interface CertificateState {
    templates: ICertificateTemplate[];
    selectedTemplate: ICertificateTemplate | null;
}

const initialState: CertificateState = {
    templates: [],
    selectedTemplate: null,
};

export const certificateSlice = createSlice({
    name: "certificate",
    initialState,
    reducers: {
        setTemplates: (state, action: PayloadAction<ICertificateTemplate[]>) => {
            state.templates = action.payload;
        },
        setSelectedTemplate: (state, action: PayloadAction<ICertificateTemplate>) => {
            state.selectedTemplate = action.payload;
        },
        addTemplate: (state, action: PayloadAction<ICertificateTemplate>) => {
            state.templates.push(action.payload);
        },
        updateTemplate: (state, action: PayloadAction<ICertificateTemplate>) => {
            const index = state.templates.findIndex(template => template.id === action.payload.id);
            if (index !== -1) {
                state.templates[index] = action.payload;
            }
        },
    },
});

export const { setTemplates, setSelectedTemplate, addTemplate, updateTemplate } = certificateSlice.actions;

export default certificateSlice.reducer;