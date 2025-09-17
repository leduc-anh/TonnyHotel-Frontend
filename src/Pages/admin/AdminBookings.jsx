import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBookings } from '../../redux/reducers/bookingSlice';

const AdminBookings = () => {
  const dispatch = useDispatch();
  const { allBookings, allBookingsLoading, allBookingsError } = useSelector(
    (state) => state.booking,
  );

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  if (allBookingsLoading) return <p className='p-6'>Đang tải dữ liệu...</p>;
  if (allBookingsError)
    return <p className='p-6 text-red-600'>Lỗi: {allBookingsError}</p>;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Quản lý Booking</h1>

      {allBookings.length === 0 ? (
        <p>Chưa có booking nào.</p>
      ) : (
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 px-4 py-2'>Khách hàng</th>
              <th className='border border-gray-300 px-4 py-2'>Phòng</th>
              <th className='border border-gray-300 px-4 py-2'>Check-in</th>
              <th className='border border-gray-300 px-4 py-2'>Check-out</th>
              <th className='border border-gray-300 px-4 py-2'>Tổng tiền</th>
              <th className='border border-gray-300 px-4 py-2'>Trạng thái</th>
              <th className='border border-gray-300 px-4 py-2'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {allBookings.map((booking) => (
              <tr key={booking._id} className='text-center'>
                <td className='border border-gray-300 px-4 py-2'>
                  {booking.userId?.username || 'Ẩn danh'}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {booking.roomId?.roomNumber}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {new Date(booking.checkIn).toLocaleDateString()}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {booking.totalPrice} VND
                </td>
                <td className='border border-gray-300 px-4 py-2'>
                  {booking.status}
                </td>
                <td className='border border-gray-300 px-4 py-2 space-x-2'>
                  <button className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600'>
                    Xác nhận
                  </button>
                  <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                    Hủy
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

export default AdminBookings;
