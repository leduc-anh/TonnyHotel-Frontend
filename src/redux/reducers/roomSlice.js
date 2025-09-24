import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../lib/axios";


export const fetchRooms = createAsyncThunk("room/fetchRooms", async () => {
    const res = await axios.get("/rooms");
    return res.data;
});
export const deleteRoom = createAsyncThunk(
    "room/deleteRoom",
    async (id, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user;
            if (!token) throw new Error("Bạn chưa đăng nhập");

            await axios.delete(`/rooms/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchRoomById = createAsyncThunk("room/fetchRoomById", async (id) => {
    const res = await axios.get(`/rooms/${id}`);
    return res.data;
});
export const deleteRoomImage = createAsyncThunk(
    "room/deleteRoomImage",
    async ({ roomId, imageName }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user; // Lấy token từ state user
            if (!token) throw new Error("Bạn chưa đăng nhập");

            const res = await axios.delete(`/rooms/${roomId}/image`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { imageName },
            });
            return res.data.room;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
export const addReview = createAsyncThunk(
    "room/addReview",
    async ({ roomId, rating, comment }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user;
            if (!token) throw new Error("Bạn chưa đăng nhập");

            const res = await axios.post(
                `/rooms/${roomId}/review`,
                { rating, comment },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return res.data;
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

            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const createRoom = createAsyncThunk(
    "room/createRoom",
    async (formData, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user;
            const res = await axios.post("/rooms", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
export const updateRoom = createAsyncThunk("room/updateRoom", async ({ id, formData }, { getState }) => {
    const { token } = getState().user;
    const res = await axios.patch(`/rooms/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
});

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

            .addCase(addReview.pending, (state) => {
                state.reviewLoading = true;
                state.reviewError = null;
                state.reviewSuccess = false;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviewSuccess = true;
                state.selectedRoom = action.payload;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload || "Có lỗi xảy ra";
            })

            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviewSuccess = true;
                state.selectedRoom.reviews = action.payload.reviews;
                state.selectedRoom.averageRating = action.payload.averageRating;
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload || "Không thể xóa review";
            })
            .addCase(createRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms.push(action.payload);
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Không thể thêm phòng";
            })
            .addCase(updateRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRoom = action.payload;
                const index = state.rooms.findIndex((r) => r._id === action.payload._id);
                if (index !== -1) {
                    state.rooms[index] = action.payload;
                }
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Không thể cập nhật phòng";
            })
            .addCase(deleteRoomImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRoomImage.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRoom = action.payload;
            })
            .addCase(deleteRoomImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Không thể xóa ảnh";
            })
            .addCase(deleteRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.loading = false;
                const deletedRoomId = action.payload;
                state.rooms = state.rooms.filter(
                    (room) => room._id !== deletedRoomId
                );
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetReviewState } = roomSlice.actions;
export default roomSlice.reducer;
