import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../redux/reducers/serviceSlice';
import {
  Bed,
  Utensils,
  ConciergeBell,
  Dumbbell,
  Plane,
  Flower2,
  Car,
  Shirt,
  Baby,
  Waves,
  Users,
} from 'lucide-react';

const Services = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Map icon theo tên dịch vụ
  const getIcon = (serviceName) => {
    if (!serviceName)
      return <ConciergeBell className='w-14 h-14 text-yellow-500' />;
    const lower = serviceName.toLowerCase();

    if (lower.includes('phòng'))
      return <Bed className='w-14 h-14 text-yellow-500' />;
    if (lower.includes('ẩm thực') || lower.includes('nhà hàng'))
      return <Utensils className='w-14 h-14 text-orange-500' />;
    if (lower.includes('spa'))
      return <Flower2 className='w-14 h-14 text-pink-500' />;
    if (lower.includes('gym') || lower.includes('fitness'))
      return <Dumbbell className='w-14 h-14 text-green-500' />;
    if (lower.includes('du lịch') || lower.includes('tour'))
      return <Plane className='w-14 h-14 text-blue-500' />;

    if (lower.includes('thuê xe'))
      return <Car className='w-14 h-14 text-indigo-500' />;
    if (lower.includes('hội nghị') || lower.includes('sự kiện'))
      return <Users className='w-14 h-14 text-purple-500' />;
    if (lower.includes('bể bơi'))
      return <Waves className='w-14 h-14 text-cyan-500' />;
    if (lower.includes('giặt'))
      return <Shirt className='w-14 h-14 text-gray-500' />;
    if (lower.includes('trẻ em') || lower.includes('chăm sóc'))
      return <Baby className='w-14 h-14 text-pink-400' />;

    return <ConciergeBell className='w-14 h-14 text-yellow-500' />;
  };

  if (loading) return <p className='text-center mt-10'>Đang tải...</p>;

  return (
    <div
      className='min-h-screen bg-cover bg-center bg-fixed py-24 px-8 
             backdrop-blur-2xl bg-black/80 bg-blend-multiply'
      style={{ backgroundImage: "url('/background3.jpg')" }}
    >
      <h1 className='text-4xl font-bold text-center text-yellow-500 mb-10 drop-shadow-lg'>
        Danh sách Dịch vụ
      </h1>

      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service._id}
              className='flex flex-col items-center text-center bg-white/90 dark:bg-gray-800/90 
                         border border-gray-300 dark:border-gray-600 shadow-lg rounded-xl p-6 
                         hover:shadow-xl transition'
            >
              <div className='mb-4'>
                {service.images?.length > 0 ? (
                  <img
                    src={`/services/${service.images[0]}`}
                    alt={service.name}
                    className='w-20 h-20 object-cover rounded-lg shadow-md'
                  />
                ) : (
                  getIcon(service.name)
                )}
              </div>

              <h2 className='text-xl font-bold text-gray-800 dark:text-white mb-2'>
                {service.name}
              </h2>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-3'>
                {service.description}
              </p>

              <p className='text-lg font-semibold text-yellow-600'>
                {service.price.toLocaleString('vi-VN')} VNĐ
              </p>
            </div>
          ))
        ) : (
          <p className='col-span-3 text-center text-gray-600 dark:text-gray-300'>
            Không có dịch vụ nào
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
