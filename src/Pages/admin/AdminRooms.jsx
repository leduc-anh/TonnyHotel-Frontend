import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../redux/reducers/roomSlice';

const AdminRooms = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (loading) return <p className='p-6'>Đang tải dữ liệu...</p>;
  if (error) return <p className='p-6 text-red-600'>Lỗi: {error}</p>;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Quản lý Phòng</h1>

      {rooms.length === 0 ? (
        <p>Chưa có phòng nào.</p>
      ) : (
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200 text-center'>
              <th className='border border-gray-300 px-4 py-2'>Ảnh</th>
              <th className='border border-gray-300 px-4 py-2'>Số phòng</th>
              <th className='border border-gray-300 px-4 py-2'>Loại</th>
              <th className='border border-gray-300 px-4 py-2'>Giá</th>
              <th className='border border-gray-300 px-4 py-2'>Trạng thái</th>
              <th className='border border-gray-300 px-4 py-2'>Mô tả</th>
              <th className='border border-gray-300 px-4 py-2'>Đánh giá TB</th>
              <th className='border border-gray-300 px-4 py-2'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className='text-center'>
                {/* Hiển thị ảnh đầu tiên */}
                <td className='border border-gray-300 px-4 py-2'>
                  {room.images?.length > 0 ? (
                    <img
                      src={`/rooms/${room.images[0]}`}
                      alt={room.roomType}
                      className='w-20 h-16 object-cover rounded'
                    />
                  ) : (
                    'Không có ảnh'
                  )}
                </td>

                <td className='border border-gray-300 px-4 py-2'>
                  {room.roomNumber}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {room.roomType}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {room.price.toLocaleString()} VND
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {room.status === 'available' ? 'Còn trống' : 'Đã đặt'}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-sm max-w-xs truncate'>
                  {room.description}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  ⭐ {room.averageRating || 0}
                </td>
                <td className='border border-gray-300 px-4 py-2 space-x-2'>
                  <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>
                    Sửa
                  </button>
                  <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminRooms;
