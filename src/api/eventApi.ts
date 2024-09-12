import { ApiResponse, apiSlice } from './api';

export interface EventDto {
    id: string;
    topic: string;
    start_time_info: {
        date: string;  // YYYY-MM-DD
        time: string;  // HH:mm
        timezone: string;
    };
    description: string;
    duration: number;
    zoom_meeting_id: string;
    zoom_join_url: string;
    is_public: boolean;
    banner: string;
    attendees: Array<{ email: string; user_id?: string }>;
}

export interface GetAllEventsParams {
    page?: number;
    size?: number;
    status?: 'upcoming' | 'ongoing' | 'concluded' | 'all';
}

export const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addEvent: builder.mutation<ApiResponse<EventDto>, Partial<EventDto>>({
            query: (event) => ({
                url: '/event/',
                method: 'POST',
                body: event,
            }),
            invalidatesTags: ['Event'],
        }),
        getAllEvents: builder.query<ApiResponse<{ events: EventDto[], count: number, totalPages: number }>, GetAllEventsParams>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params.size) queryParams.append('size', params.size.toString());
                if (params.status) queryParams.append('status', params.status);

                return {
                    url: `/event/?${queryParams.toString()}`,
                };
            },
            providesTags: ['Event'],
        }),
        getEvent: builder.query<ApiResponse<EventDto>, string>({
            query: (id) => ({
                url: `/event/info?id=${id}`,
            }),
            providesTags: ['Event'],
        }),
        deleteEvent: builder.mutation<ApiResponse<null>, string>({
            query: (id) => ({
                url: `/event/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Event'],
        }),
        addAttendee: builder.mutation<ApiResponse<EventDto>, { id: string; email: string; firstName: string; lastName: string; userId?: string }>({
            query: ({ id, ...attendeeData }) => ({
                url: `/event/attendee?id=${id}`,
                method: 'POST',
                body: attendeeData,
            }),
            invalidatesTags: ['Event'],
        }),
        removeAttendee: builder.mutation<ApiResponse<EventDto>, { id: string; email: string }>({
            query: ({ id, email }) => ({
                url: `/event/attendee?id=${id}`,
                method: 'DELETE',
                body: { email },
            }),
            invalidatesTags: ['Event'],
        }),
    }),
});

export const {
    useAddEventMutation,
    useGetAllEventsQuery,
    useGetEventQuery,
    useDeleteEventMutation,
    useAddAttendeeMutation,
    useRemoveAttendeeMutation,
} = eventApiSlice;