import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import PropTypes from 'prop-types';
import { fetchServices } from '../redux/reducers/serviceSlice';
import {
  createBooking,
  resetBookingState,
} from '../redux/reducers/bookingSlice';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function BookingModal({ room, onClose }) {
  const dispatch = useDispatch();
  const { services, loading: servicesLoading } = useSelector(
    (state) => state.service,
  );
  const {
    loading: bookingLoading,
    error,
    success,
  } = useSelector((state) => state.booking);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);
  const [selectedServices, setSelectedServices] = useState({});

  useEffect(() => {
    dispatch(fetchServices());
    return () => dispatch(resetBookingState());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert('Đặt phòng thành công!');
      onClose();
    }
  }, [success, onClose]);
  const handleServiceChange = (service) => {
    setSelectedServices((prev) => {
      const newSelection = { ...prev };
      if (newSelection[service._id]) {
        delete newSelection[service._id];
      } else {
        newSelection[service._id] = { ...service, quantity: 1 };
      }
      return newSelection;
    });
  };
  const { nights, roomTotal, servicesTotal, grandTotal } = useMemo(() => {
    const [range] = dateRange;
    if (!range.endDate || !range.startDate)
      return { nights: 0, roomTotal: 0, servicesTotal: 0, grandTotal: 0 };

    const nights = Math.max(
      0,
      Math.ceil((range.endDate - range.startDate) / (1000 * 60 * 60 * 24)),
    );
    const roomTotal = room.price * nights;

    const servicesTotal = Object.values(selectedServices).reduce(
      (total, srv) => total + srv.price * srv.quantity,
      0,
    );

    const grandTotal = roomTotal + servicesTotal;
    return { nights, roomTotal, servicesTotal, grandTotal };
  }, [dateRange, selectedServices, room.price]);
  const handleSubmit = () => {
    if (nights <= 0) {
      alert('Vui lòng chọn ngày nhận và trả phòng hợp lệ.');
      return;
    }

    const bookingData = {
      roomId: room._id,
      checkIn: dateRange[0].startDate.toISOString(),
      checkOut: dateRange[0].endDate.toISOString(),
      services: Object.values(selectedServices).map((s) => ({
        serviceId: s._id,
        quantity: s.quantity,
      })),
    };
    dispatch(createBooking(bookingData));
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4'>
      <div className='bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-4xl max-h-[95vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between items-start mb-6'>
          <div>
            <h2 className='text-3xl font-bold text-slate-900 dark:text-white'>
              Đặt phòng
            </h2>
            <p className='text-slate-600 dark:text-slate-300'>
              {room.roomType} - Phòng {room.roomNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className='text-3xl text-slate-500 hover:text-slate-800 dark:hover:text-white'
          >
            &times;
          </button>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='flex flex-col gap-6'>
            <div>
              <h3 className='text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200'>
                1. Chọn ngày của bạn
              </h3>
              <div className='flex justify-center border rounded-lg overflow-hidden'>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  minDate={new Date()}
                  months={1}
                  direction='horizontal'
                  className='w-full'
                />
              </div>
            </div>

            <div>
              <h3 className='text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200'>
                2. Dịch vụ đi kèm
              </h3>
              <div className='space-y-3 max-h-60 overflow-y-auto pr-2'>
                {servicesLoading ? (
                  <p>Đang tải dịch vụ...</p>
                ) : (
                  services.map((service) => (
                    <label
                      key={service._id}
                      className='flex items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-200 transition-colors'
                    >
                      <input
                        type='checkbox'
                        className='h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        checked={!!selectedServices[service._id]}
                        onChange={() => handleServiceChange(service)}
                      />
                      <span className='ml-4 flex-grow text-slate-800 dark:text-slate-200'>
                        {service.name}
                      </span>
                      <span className='font-semibold text-indigo-600'>
                        {service.price.toLocaleString()} VND
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className='bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 flex flex-col'>
            <h3 className='text-2xl font-bold mb-6 border-b border-slate-300 dark:border-slate-600 pb-3 text-slate-900 dark:text-white'>
              Tóm tắt chi phí
            </h3>
            <div className='space-y-4 flex-grow'>
              <div className='flex justify-between'>
                <span className='text-slate-600 dark:text-slate-300'>
                  Tiền phòng ({room.price.toLocaleString()} x {nights} đêm)
                </span>
                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                  {roomTotal.toLocaleString()} VND
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-slate-600 dark:text-slate-300'>
                  Tiền dịch vụ
                </span>
                <span className='font-semibold text-slate-800 dark:text-slate-200'>
                  {servicesTotal.toLocaleString()} VND
                </span>
              </div>
              <div className='border-t border-slate-300 dark:border-slate-600 pt-4 mt-4 flex justify-between items-center'>
                <span className='text-xl font-bold text-slate-900 dark:text-white'>
                  Tổng cộng
                </span>
                <span className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
                  {grandTotal.toLocaleString()} VND
                </span>
              </div>
            </div>

            {error && <p className='text-red-500 mt-4 text-center'>{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={bookingLoading}
              className='w-full mt-8 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:scale-100 disabled:shadow-none'
            >
              {bookingLoading ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
BookingModal.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    roomType: PropTypes.string.isRequired,
    roomNumber: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BookingModal;
