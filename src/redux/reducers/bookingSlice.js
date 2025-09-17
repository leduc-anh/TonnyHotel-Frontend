import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

export const createBooking = createAsyncThunk(
    'booking/createBooking',
    async (bookingData, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user;
            if (!token) {
                return rejectWithValue('Vui lòng đăng nhập để đặt phòng.');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await axios.post('/bookings', bookingData, config);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Đã có lỗi xảy ra.');
        }
    }
);
export const fetchAllBookings = createAsyncThunk(
    "booking/fetchAllBookings",
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user;
            if (!token) {
                return rejectWithValue("Vui lòng đăng nhập.");
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get("/bookings", config);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data?.message || "Không thể tải tất cả bookings."
            );
        }
    }
);
export const fetchMyBookings = createAsyncThunk(
    'booking/fetchMyBookings',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user;
            if (!token) {
                return rejectWithValue('Vui lòng đăng nhập.');
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get('/bookings/my', config);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Không thể tải lịch sử đặt phòng.');
        }
    }
);
const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        loading: false,
        error: null,
        success: false,
        myBookings: [],
        myBookingsLoading: false,
        myBookingsError: null,
        allBookings: [],
        allBookingsLoading: false,
        allBookingsError: null,
    },
    reducers: {
        resetBookingState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createBooking.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMyBookings.pending, (state) => {
                state.myBookingsLoading = true;
                state.myBookingsError = null;
            })
            .addCase(fetchMyBookings.fulfilled, (state, action) => {
                state.myBookingsLoading = false;
                state.myBookings = action.payload;
            })
            .addCase(fetchMyBookings.rejected, (state, action) => {
                state.myBookingsLoading = false;
                state.myBookingsError = action.payload;
            }).addCase(fetchAllBookings.pending, (state) => {
                state.allBookingsLoading = true;
                state.allBookingsError = null;
            })
            .addCase(fetchAllBookings.fulfilled, (state, action) => {
                state.allBookingsLoading = false;
                state.allBookings = action.payload;
            })
            .addCase(fetchAllBookings.rejected, (state, action) => {
                state.allBookingsLoading = false;
                state.allBookingsError = action.payload;
            });
    },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;