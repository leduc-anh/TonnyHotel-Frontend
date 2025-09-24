import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchRooms,
  fetchRoomById,
  updateRoom,
  createRoom,
  deleteRoomImage,
} from '../../redux/reducers/roomSlice';

const AdminEditAddRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rooms, selectedRoom, loading, error } = useSelector(
    (state) => state.room,
  );
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: '',
    price: '',
    status: 'available',
    description: '',
  });
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchRoomById(id));
    } else {
      setFormData({
        roomNumber: '',
        roomType: '',
        price: '',
        status: 'available',
        description: '',
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && selectedRoom) {
      setFormData({
        roomNumber: selectedRoom.roomNumber || '',
        roomType: selectedRoom.roomType || '',
        price: selectedRoom.price || '',
        status: selectedRoom.status || 'available',
        description: selectedRoom.description || '',
      });
    }
  }, [id, selectedRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleDeleteImage = async (imageName) => {
    if (window.confirm(`Bạn có chắc muốn xóa ảnh ${imageName}?`)) {
      try {
        await dispatch(deleteRoomImage({ roomId: id, imageName })).unwrap();
        alert('Xóa ảnh thành công!');
      } catch (err) {
        alert('Lỗi khi xóa ảnh: ' + err);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.roomNumber) {
      newErrors.roomNumber = 'Số phòng là bắt buộc.';
    } else if (!/^\d+$/.test(formData.roomNumber)) {
      newErrors.roomNumber = 'Số phòng phải là một số nguyên.';
    } else {
      const roomNumber = parseInt(formData.roomNumber, 10);
      const isDuplicate = rooms.find((room) => {
        if (id) {
          return room.roomNumber === roomNumber && room._id !== id;
        }
        return room.roomNumber === roomNumber;
      });

      if (isDuplicate) {
        newErrors.roomNumber = 'Số phòng này đã tồn tại.';
      }
    }

    if (!formData.roomType) {
      newErrors.roomType = 'Vui lòng chọn loại phòng.';
    }

    if (!formData.price) {
      newErrors.price = 'Giá phòng là bắt buộc.';
    } else if (parseInt(formData.price, 10) <= 0) {
      newErrors.price = 'Giá phòng phải lớn hơn 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (newImages.length > 0) {
      newImages.forEach((file) => {
        data.append('images', file);
      });
    }

    try {
      if (id) {
        await dispatch(updateRoom({ id, formData: data })).unwrap();
        alert('Cập nhật phòng thành công!');
      } else {
        await dispatch(createRoom(data)).unwrap();
        alert('Thêm phòng thành công!');
      }
      navigate('/admin/rooms');
    } catch (err) {
      console.error('Submit form error:', err);
      alert('Có lỗi xảy ra: ' + (err || 'Vui lòng kiểm tra lại thông tin'));
    }
  };

  if (loading && !selectedRoom && id)
    return <p className='p-6'>Đang tải dữ liệu...</p>;
  if (error && !id) return <p className='p-6 text-red-600'>Lỗi: {error}</p>;

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>
        {id ? 'Sửa phòng' : 'Thêm phòng mới'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className='space-y-4 bg-white p-6 rounded shadow'
        noValidate
      >
        <div>
          <label className='block font-semibold mb-1'>Số phòng</label>
          <input
            type='text'
            name='roomNumber'
            value={formData.roomNumber}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.roomNumber ? 'border-red-500' : ''
            }`}
          />
          {errors.roomNumber && (
            <p className='text-red-600 text-sm mt-1'>{errors.roomNumber}</p>
          )}
        </div>
        <div>
          <label className='block font-semibold mb-1'>Loại phòng</label>
          <select
            name='roomType'
            value={formData.roomType}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.roomType ? 'border-red-500' : ''
            }`}
          >
            <option value='' disabled>
              -- Chọn loại phòng --
            </option>
            <option value='single'>Phòng đơn (Single)</option>
            <option value='double'>Phòng đôi (Double)</option>
            <option value='suite'>Phòng Suite</option>
          </select>
          {errors.roomType && (
            <p className='text-red-600 text-sm mt-1'>{errors.roomType}</p>
          )}
        </div>
        <div>
          <label className='block font-semibold mb-1'>Giá (VND)</label>
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${
              errors.price ? 'border-red-500' : ''
            }`}
          />
          {errors.price && (
            <p className='text-red-600 text-sm mt-1'>{errors.price}</p>
          )}
        </div>
        <div>
          <label className='block font-semibold mb-1'>Trạng thái</label>
          <select
            name='status'
            value={formData.status}
            onChange={handleChange}
            className='w-full border px-3 py-2 rounded'
          >
            <option value='available'>Còn trống</option>
            <option value='booked'>Đã đặt</option>
            <option value='maintenance'>Bảo trì</option>
          </select>
        </div>
        <div>
          <label className='block font-semibold mb-1'>Mô tả</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows='3'
            className={`w-full border px-3 py-2 rounded ${
              errors.description ? 'border-red-500' : ''
            }`}
          ></textarea>
          {errors.description && (
            <p className='text-red-600 text-sm mt-1'>{errors.description}</p>
          )}
        </div>
        <div>
          <label className='block font-semibold mb-1'>Ảnh hiện có</label>
          {id && selectedRoom?.images?.length > 0 ? (
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {selectedRoom.images.map((imgName, idx) => (
                <div key={idx} className='relative group'>
                  <img
                    src={`http://localhost:5000/rooms/${imgName}`}
                    alt={`Room image ${idx + 1}`}
                    className='w-28 h-28 object-cover rounded-md'
                  />
                  <button
                    type='button'
                    className='absolute top-1 right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full opacity-75 group-hover:opacity-100 transition-opacity'
                    onClick={() => handleDeleteImage(imgName)}
                    title='Xóa ảnh này'
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-sm text-gray-500'>Chưa có ảnh nào.</p>
          )}
        </div>
        <div>
          <label className='block font-semibold mb-1'>
            {id ? 'Thêm ảnh mới' : 'Ảnh phòng'}
          </label>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={handleFileChange}
            className='w-full border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300'
        >
          {loading ? 'Đang xử lý...' : id ? 'Cập nhật' : 'Thêm mới'}
        </button>
      </form>
    </div>
  );
};

export default AdminEditAddRoom;
