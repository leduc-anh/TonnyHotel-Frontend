import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../redux/reducers/roomSlice';
import { fetchAllBookings } from '../../redux/reducers/bookingSlice';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#4CAF50', '#F44336', '#FF9800']; // xanh: trống, đỏ: đã đặt, cam: sửa chữa

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);
  const { allBookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const totalRooms = rooms.length;

  const availableRooms = rooms.filter((r) => r.status === 'available').length;
  const bookedRooms = rooms.filter((r) => r.status === 'booked').length;
  const maintenanceRooms = rooms.filter(
    (r) => r.status === 'maintenance',
  ).length;

  const pieData = [
    { name: 'Phòng trống', value: availableRooms },
    { name: 'Phòng đã đặt', value: bookedRooms },
    { name: 'Đang sửa chữa', value: maintenanceRooms },
  ];

  const bookingStatusData = ['pending', 'confirmed', 'cancelled'].map(
    (status) => ({
      status,
      count: allBookings.filter((b) => b.status === status).length,
    }),
  );

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Dashboard Tổng Quan</h1>

      {/* Stats cards */}
      <div className='grid grid-cols-4 gap-6 mb-8'>
        <div className='bg-white shadow rounded p-6 text-center'>
          <h2 className='text-lg font-semibold'>Tổng số phòng</h2>
          <p className='text-2xl font-bold text-blue-600'>{totalRooms}</p>
        </div>
        <div className='bg-white shadow rounded p-6 text-center'>
          <h2 className='text-lg font-semibold'>Phòng trống</h2>
          <p className='text-2xl font-bold text-green-600'>{availableRooms}</p>
        </div>
        <div className='bg-white shadow rounded p-6 text-center'>
          <h2 className='text-lg font-semibold'>Phòng đã đặt</h2>
          <p className='text-2xl font-bold text-red-600'>{bookedRooms}</p>
        </div>
        <div className='bg-white shadow rounded p-6 text-center'>
          <h2 className='text-lg font-semibold'>Đang sửa chữa</h2>
          <p className='text-2xl font-bold text-orange-500'>
            {maintenanceRooms}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className='grid grid-cols-2 gap-8'>
        {/* Pie chart */}
        <div className='bg-white p-6 shadow rounded'>
          <h2 className='text-xl font-semibold mb-4'>
            Tỉ lệ phòng trống / đã đặt / sửa chữa
          </h2>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey='value'
              nameKey='name'
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar chart */}
        <div className='bg-white p-6 shadow rounded'>
          <h2 className='text-xl font-semibold mb-4'>
            Booking theo trạng thái
          </h2>
          <BarChart width={400} height={300} data={bookingStatusData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='status' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='count' fill='#2196F3' />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
