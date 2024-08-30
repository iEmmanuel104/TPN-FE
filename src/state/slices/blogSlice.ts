import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogDto, BlogActivityDto } from "../../api/blogApi";

export interface BlogState {
    blogs: BlogDto[];
    selectedBlog: BlogDto | null;
    blogActivities: BlogActivityDto[];
}

const initialState: BlogState = {
    blogs: [],
    selectedBlog: null,
    blogActivities: [],
};

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<BlogDto[]>) => {
            state.blogs = action.payload;
        },
        setSelectedBlog: (state, action: PayloadAction<BlogDto | null>) => {
            state.selectedBlog = action.payload;
        },
        setBlogActivities: (state, action: PayloadAction<BlogActivityDto[]>) => {
            state.blogActivities = action.payload;
        },
        updateBlogActivity: (state, action: PayloadAction<Partial<BlogActivityDto>>) => {
            const index = state.blogActivities.findIndex(ba => ba.blogId === action.payload.blogId);
            if (index !== -1) {
                state.blogActivities[index] = { ...state.blogActivities[index], ...action.payload };
            }
        },
    },
});

export const { setBlogs, setSelectedBlog, setBlogActivities, updateBlogActivity } = blogSlice.actions;

export default blogSlice.reducer;
