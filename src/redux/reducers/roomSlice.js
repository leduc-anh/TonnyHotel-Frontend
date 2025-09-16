import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";

// Lấy tất cả phòng
export const fetchRooms = createAsyncThunk("room/fetchRooms", async () => {
    const res = await axios.get("/rooms");
    return res.data;
});

// Lấy phòng theo ID
export const fetchRoomById = createAsyncThunk("room/fetchRoomById", async (id) => {
    const res = await axios.get(`/rooms/${id}`);
    return res.data;
});

// Gửi review cho phòng
export const addReview = createAsyncThunk(
    "room/addReview",
    async ({ roomId, rating, comment }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user; // ✅ lấy token từ Redux
            if (!token) throw new Error("Bạn chưa đăng nhập");

            const res = await axios.post(
                `/rooms/${roomId}/review`,
                { rating, comment },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data; // backend trả về room mới sau khi thêm review
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
export const deleteReview = createAsyncThunk(
    "room/deleteReview",
    async (roomId, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user;
            if (!token) throw new Error("Bạn chưa đăng nhập");

            const res = await axios.delete(`/rooms/${roomId}/review`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return res.data; // backend trả về { reviews, averageRating }
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
const roomSlice = createSlice({
    name: "room",
    initialState: {
        rooms: [],
        selectedRoom: null,
        loading: false,
        error: null,
        reviewLoading: false,
        reviewError: null,
        reviewSuccess: false,
    },
    reducers: {
        resetReviewState: (state) => {
            state.reviewLoading = false;
            state.reviewError = null;
            state.reviewSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch rooms
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Fetch room by ID
            .addCase(fetchRoomById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRoom = action.payload;
            })
            .addCase(fetchRoomById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Add review
            .addCase(addReview.pending, (state) => {
                state.reviewLoading = true;
                state.reviewError = null;
                state.reviewSuccess = false;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviewSuccess = true;
                state.selectedRoom = action.payload; // cập nhật lại room
            })
            .addCase(addReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload || "Có lỗi xảy ra";
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviewSuccess = true;
                // cập nhật lại review + averageRating trong selectedRoom
                state.selectedRoom.reviews = action.payload.reviews;
                state.selectedRoom.averageRating = action.payload.averageRating;
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload || "Không thể xóa review";
            });;
    },
});

export const { resetReviewState } = roomSlice.actions;
export default roomSlice.reducer;
