import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../redux/reducers/roomSlice';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.room);

  const [filter, setFilter] = useState({
    type: '',
    status: '',
    price: '',
  });

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (loading) return <p className='text-center mt-10'>Đang tải...</p>;

  const filteredRooms = rooms.filter((room) => {
    const matchType = filter.type ? room.roomType === filter.type : true;
    const matchStatus = filter.status ? room.status === filter.status : true;
    const matchPrice = filter.price ? room.price <= Number(filter.price) : true;
    return matchType && matchStatus && matchPrice;
  });

  return (
    <div className='mt-20 m-3'>
      <h1 className='text-4xl font-bold text-center text-yellow-500 mb-10 drop-shadow-lg'>
        Danh sách Phòng
      </h1>

      <div className=' grid grid-cols-1 md:grid-cols-4 gap-8'>
        <div className='bg-white/95 dark:bg-gray-800/95 shadow-lg p-6 rounded-xl border border-gray-200 dark:border-gray-700 md:col-span-1 h-fit'>
          <h2 className='text-lg font-bold text-gray-800 dark:text-white mb-4'>
            Bộ lọc
          </h2>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Loại phòng
            </label>
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className='w-full p-2 rounded border dark:bg-gray-700 dark:text-white'
            >
              <option value=''>Tất cả</option>
              <option value='single'>Phòng Đơn</option>
              <option value='double'>Phòng Đôi</option>
              <option value='suite'>Phòng Suite</option>
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Trạng thái
            </label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className='w-full p-2 rounded border dark:bg-gray-700 dark:text-white'
            >
              <option value=''>Tất cả</option>
              <option value='available'>Còn trống</option>
              <option value='booked'>Đã đặt</option>
              <option value='maintenance'>Bảo trì</option>
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Giá tối đa (VNĐ)
            </label>
            <input
              type='number'
              value={filter.price}
              onChange={(e) => setFilter({ ...filter, price: e.target.value })}
              placeholder='VD: 2000000'
              className='w-full p-2 rounded border dark:bg-gray-700 dark:text-white'
            />
          </div>

          <button
            onClick={() => setFilter({ type: '', status: '', price: '' })}
            className='w-full px-4 py-2 rounded-full  bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 
                           text-black font-semibold hover:opacity-90  shadow-lg
                       transition-transform hover:scale-105'
          >
            Xóa bộ lọc
          </button>
        </div>

        <div className='md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 pl-6'>
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div
                key={room._id}
                className=' rounded-xl flex bg-white/95 dark:bg-gray-700/95 shadow-lg  
                           hover:scale-[1.02] transition-transform overflow-hidden'
              >
                <div className='w-1/2 h-full'>
                  <img
                    src={`http://localhost:5000/rooms/${room.images[0]}`}
                    alt={room.roomType}
                    className='w-full h-full object-cover'
                  />
                </div>

                <div className='flex-1 p-6 flex flex-col justify-between'>
                  <div>
                    <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
                      Phòng {room.roomNumber} - {room.roomType.toUpperCase()}
                    </h2>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>
                      {room.description.length > 70
                        ? room.description.substring(0, 70) + '...'
                        : room.description}
                    </p>

                    <div className='flex items-center gap-1 my-2'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < Math.round(room.averageRating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                      <span className='ml-2 text-sm text-gray-700 dark:text-gray-300'>
                        {room.averageRating.toFixed(1)}/5
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className='text-lg font-semibold text-yellow-600 mt-2'>
                      {room.price.toLocaleString()} VNĐ / đêm
                    </p>
                    <Link
                      to={`/rooms/${room._id}`}
                      className='inline-block mt-3 px-4 py-2 rounded-full  bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 
                           text-black dark:text-white font-semibold hover:opacity-90 
                                 shadow-md transition-transform transform hover:scale-105'
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='col-span-2 text-center text-gray-600 dark:text-gray-300'>
              Không có phòng nào phù hợp với bộ lọc
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
