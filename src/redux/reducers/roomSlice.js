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
export const deleteRoomImage = createAsyncThunk(
    "room/deleteRoomImage",
    async ({ roomId, imageName }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().user; // Lấy token từ state user
            if (!token) throw new Error("Bạn chưa đăng nhập");

            const res = await axios.delete(`/rooms/${roomId}/image`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { imageName }, // Rất quan trọng: body của request DELETE nằm trong 'data'
            });
            return res.data.room; // Backend trả về phòng đã được cập nhật
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
// Gửi review cho phòng
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

// Xóa review
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

export const createRoom = createAsyncThunk("room/createRoom", async (formData, { getState }) => {
    const { token } = getState().user;
    const res = await axios.post("/rooms", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
});

// ✅ Cập nhật phòng
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
                state.selectedRoom = action.payload;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload || "Có lỗi xảy ra";
            })

            // Delete review
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

            // ✅ Create room
            .addCase(createRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms.push(action.payload); // thêm phòng mới vào list
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Không thể thêm phòng";
            })

            // ✅ Update room
            .addCase(updateRoom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRoom = action.payload; // Cập nhật phòng đang chọn
                // Cập nhật phòng trong danh sách chung
                const index = state.rooms.findIndex((r) => r._id === action.payload._id);
                if (index !== -1) {
                    state.rooms[index] = action.payload;
                }
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Không thể cập nhật phòng";
            })

            // ✅ THÊM: Xử lý xóa ảnh
            .addCase(deleteRoomImage.pending, (state) => {
                state.loading = true; // Báo hiệu đang có thao tác
                state.error = null;
            })
            .addCase(deleteRoomImage.fulfilled, (state, action) => {
                state.loading = false;
                // Cập nhật lại selectedRoom với dữ liệu mới từ server
                state.selectedRoom = action.payload;
            })
            .addCase(deleteRoomImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Không thể xóa ảnh";
            });
    },
});

export const { resetReviewState } = roomSlice.actions;
export default roomSlice.reducer;
