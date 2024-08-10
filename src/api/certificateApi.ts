// src/api/certificateApi.ts
import { apiSlice } from './api';

export interface ICertificateTemplate {
    id: string;
    template: string;
    requiredFields: string[];
    defaultStyles?: Record<string, string>;
}

export const certificateApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadTemplate: builder.mutation<ICertificateTemplate, Partial<ICertificateTemplate>>({
            query: (templateData) => ({
                url: '/certificate/template',
                method: 'POST',
                body: templateData,
            }),
            invalidatesTags: ['Certificate'],
        }),
        getAllTemplates: builder.query<ICertificateTemplate[], void>({
            query: () => ({
                url: '/certificate/templates',
                method: 'GET',
            }),
            providesTags: ['Certificate'],
        }),
    }),
});

export const {
    useUploadTemplateMutation,
    useGetAllTemplatesQuery,
} = certificateApiSlice;