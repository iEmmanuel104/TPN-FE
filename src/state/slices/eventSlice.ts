import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventDto } from "../../api/eventApi";

export interface EventState {
    events: EventDto[];
    selectedEvent: EventDto | null;
}

const initialState: EventState = {
    events: [],
    selectedEvent: null,
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEvents: (state, action: PayloadAction<EventDto[]>) => {
            state.events = action.payload;
        },
        setSelectedEvent: (state, action: PayloadAction<EventDto | null>) => {
            state.selectedEvent = action.payload;
        },
        addAttendeeToEvent: (state, action: PayloadAction<{ eventId: string; attendee: { email: string; user_id?: string } }>) => {
            const event = state.events.find(e => e.id === action.payload.eventId);
            if (event) {
                event.attendees.push(action.payload.attendee);
            }
            if (state.selectedEvent && state.selectedEvent.id === action.payload.eventId) {
                state.selectedEvent.attendees.push(action.payload.attendee);
            }
        },
        removeAttendeeFromEvent: (state, action: PayloadAction<{ eventId: string; email: string }>) => {
            const event = state.events.find(e => e.id === action.payload.eventId);
            if (event) {
                event.attendees = event.attendees.filter(a => a.email !== action.payload.email);
            }
            if (state.selectedEvent && state.selectedEvent.id === action.payload.eventId) {
                state.selectedEvent.attendees = state.selectedEvent.attendees.filter(a => a.email !== action.payload.email);
            }
        },
    },
});

export const { setEvents, setSelectedEvent, addAttendeeToEvent, removeAttendeeFromEvent } = eventSlice.actions;

export default eventSlice.reducer;