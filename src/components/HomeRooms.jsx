import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Star } from 'lucide-react';

const HomeRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/rooms`);
        setRooms(res.data.slice(0, 3));
      } catch (err) {
        console.error('Lỗi fetch rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [API_URL]);

  return (
    <>
      {loading ? (
        <div className='text-center py-10'>Loading rooms...</div>
      ) : (
        <section className='px-6 py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
          <div className='max-w-6xl mx-auto text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>Phòng nổi bật</h2>
            <p className='text-gray-600 dark:text-gray-300'>
              Khám phá những hạng phòng được yêu thích nhất tại TonnyHotel, nơi
              sự thoải mái và sang trọng hòa quyện.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {rooms.map((room) => (
              <div
                key={room._id}
                className='bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col'
              >
                <img
                  src={`/rooms/${room.images[1]}`}
                  alt={room.roomType}
                  className='w-full h-48 object-cover'
                />
                <div className='p-6 flex flex-col justify-between flex-1'>
                  <div>
                    <h3 className='text-xl font-semibold mb-2'>
                      Phòng {room.roomNumber} - {room.roomType.toUpperCase()}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-300 text-sm line-clamp-3'>
                      {room.description}
                    </p>
                    <div className='flex items-center gap-1 mt-3'>
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

                  <p className='mt-4 font-bold text-yellow-600'>
                    {room.price.toLocaleString('vi-VN')}₫ / đêm
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-center mt-10'>
            <Link
              to='/rooms'
              className='px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 
                     text-black font-semibold hover:opacity-90 transition shadow-lg'
            >
              Xem thêm phòng
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default HomeRooms;
