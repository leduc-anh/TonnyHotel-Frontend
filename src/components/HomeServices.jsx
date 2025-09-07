import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Bed,
  Utensils,
  ConciergeBell,
  Dumbbell,
  Plane,
  Flower2,
} from 'lucide-react';

const HomeServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Map icon theo tên dịch vụ
  const getIcon = (serviceName) => {
    if (!serviceName)
      return <ConciergeBell className='w-12 h-12 text-yellow-500' />;
    const lower = serviceName.toLowerCase();

    if (lower.includes('phòng'))
      return <Bed className='w-12 h-12 text-yellow-500' />;
    if (lower.includes('ẩm thực') || lower.includes('nhà hàng'))
      return <Utensils className='w-12 h-12 text-orange-500' />;
    if (lower.includes('spa'))
      return <Flower2 className='w-12 h-12 text-pink-500' />;
    if (lower.includes('gym'))
      return <Dumbbell className='w-12 h-12 text-green-500' />;
    if (lower.includes('du lịch') || lower.includes('tour'))
      return <Plane className='w-12 h-12 text-blue-500' />;

    return <ConciergeBell className='w-12 h-12 text-yellow-500' />;
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/services`);
        setServices(res.data.slice(0, 3));
      } catch (err) {
        console.error('Lỗi fetch services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [API_URL]);

  return (
    <>
      {loading ? (
        <div className='text-center py-10'>Loading services...</div>
      ) : (
        <section className='px-6 py-16 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800'>
          <div className='max-w-6xl mx-auto text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>Dịch vụ nổi bật</h2>
            <p className='text-gray-600 dark:text-gray-300'>
              Trải nghiệm các dịch vụ đẳng cấp tại TonnyHotel, được thiết kế để
              mang đến cho bạn sự thoải mái và tiện nghi tối đa.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {services.map((service) => (
              <div
                key={service._id}
                className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-md hover:shadow-lg transition flex flex-col items-center text-center'
              >
                <div className='mb-4'>{getIcon(service.name)}</div>
                <h3 className='text-xl font-semibold mb-2'>{service.name}</h3>
                <p className='text-gray-600 dark:text-gray-300 line-clamp-3'>
                  {service.description}
                </p>
                <p className='mt-3 font-bold text-yellow-600'>
                  {service.price.toLocaleString('vi-VN')}₫
                </p>
              </div>
            ))}
          </div>

          <div className='flex justify-center mt-10'>
            <Link
              to='/services'
              className='px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 
                     text-black font-semibold hover:opacity-90 transition shadow-lg'
            >
              Xem thêm dịch vụ
            </Link>
          </div>
        </section>
      )}
    </>
  );
};

export default HomeServices;
