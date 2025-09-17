import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBookings } from '../redux/reducers/bookingSlice';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const BookingStatusBadge = ({ status }) => {
  const statusStyles = {
    pending:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    confirmed:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    canceled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const statusText = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    canceled: 'Đã hủy',
  };

  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}
    >
      {statusText[status] || 'Không xác định'}
    </span>
  );
};

BookingStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

function MyBooking() {
  const dispatch = useDispatch();
  const { myBookings, myBookingsLoading, myBookingsError } = useSelector(
    (state) => state.booking,
  );

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);
  console.log('Dữ liệu booking nhận được:', myBookings);
  if (myBookingsLoading) {
    return (
      <div className='text-center py-20'>Đang tải lịch sử đặt phòng...</div>
    );
  }

  if (myBookingsError) {
    return (
      <div className='text-center py-20 text-red-500'>
        Lỗi: {myBookingsError}
      </div>
    );
  }

  return (
    <div className='container mx-auto mt-24 px-6 mb-20'>
      <h1 className='text-4xl font-bold mb-8 text-slate-900 dark:text-white'>
        Lịch sử đặt phòng của tôi
      </h1>

      {myBookings.length === 0 ? (
        <div className='text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-lg'>
          <p className='text-slate-500 dark:text-slate-400 mb-4'>
            Bạn chưa có đơn đặt phòng nào.
          </p>
          <Link
            to='/'
            className='px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors'
          >
            Khám phá phòng ngay
          </Link>
        </div>
      ) : (
        <div className='space-y-8'>
          {myBookings.map((booking) => (
            <div
              key={booking._id}
              className='grid md:grid-cols-3 gap-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700'
            >
              <div className='md:col-span-1'>
                <img
                  src={`/rooms/${booking.roomId?.images[0]}`}
                  alt={booking.roomId?.roomType}
                  className='w-full object-cover rounded-lg'
                />
              </div>

              <div className='md:col-span-2 space-y-3'>
                <div className='flex justify-between items-start'>
                  <div>
                    <p className='text-sm text-indigo-600 dark:text-indigo-400 font-semibold'>
                      {booking.roomId?.roomType}
                    </p>
                    <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                      Phòng {booking.roomId?.roomNumber}
                    </h2>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>

                <div className='grid grid-cols-2 gap-4 border-t pt-3 dark:border-slate-700'>
                  <div>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      Nhận phòng
                    </p>
                    <p className='font-semibold'>
                      {new Date(booking.checkIn).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      Trả phòng
                    </p>
                    <p className='font-semibold'>
                      {new Date(booking.checkOut).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>

                {booking.services && booking.services.length > 0 && (
                  <div className='border-t pt-3 dark:border-slate-700'>
                    <p className='text-sm text-slate-500 dark:text-slate-400 mb-1'>
                      Dịch vụ đã chọn:
                    </p>
                    <ul className='list-disc list-inside text-sm'>
                      {booking.services.map((s) => (
                        <li key={s.serviceId?._id || s._id}>
                          {s.serviceId?.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className='border-t pt-3 dark:border-slate-700 flex justify-end items-center'>
                  <span className='text-slate-600 dark:text-slate-300 mr-2'>
                    Tổng cộng:
                  </span>
                  <span className='text-xl font-bold text-indigo-600'>
                    {booking.totalPrice.toLocaleString()} VND
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooking;
