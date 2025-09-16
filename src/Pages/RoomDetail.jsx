import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  fetchRoomById,
  addReview,
  deleteReview,
} from '../redux/reducers/roomSlice';

function RoomDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedRoom, loading, error, reviewLoading, reviewError } =
    useSelector((state) => state.room);
  const { user } = useSelector((state) => state.user);
  const [mainImage, setMainImage] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchRoomById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedRoom?.images?.length > 0) {
      setMainImage(selectedRoom.images[0]);
    }
  }, [selectedRoom]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview({ roomId: id, rating, comment }))
      .unwrap()
      .then(() => {
        setComment('');
        setRating(5);
        setShowForm(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) return <div className='text-center py-10'>Loading...</div>;
  if (error)
    return <div className='text-center py-10 text-red-500'>{error}</div>;
  if (!selectedRoom) return null;

  return (
    <div className='container mx-auto mt-24 px-6 mb-20'>
      <div className='grid md:grid-cols-2 gap-16'>
        {/* Image Gallery - Left Side */}
        <div>
          {mainImage && (
            <img
              src={mainImage}
              alt='Main room view'
              className='w-full h-[500px] object-cover rounded-xl shadow-xl'
            />
          )}
          <div className='flex gap-4 mt-4'>
            {selectedRoom.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-28 h-28 object-cover rounded-lg cursor-pointer border-2 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                  mainImage === img ? 'border-indigo-500' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Room Info - Right Side */}
        <div className='flex flex-col pt-4'>
          <div>
            <span className='inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1 rounded-full mb-3'>
              {selectedRoom.roomType}
            </span>
            <h1 className='text-5xl font-bold text-slate-900 dark:text-white mb-4'>
              Phòng {selectedRoom.roomNumber}
            </h1>
            <p className='text-slate-600 dark:text-slate-400 mb-6 text-lg'>
              {selectedRoom.description}
            </p>

            <div className='space-y-4 border-t border-b py-6 mb-6'>
              <div className='flex items-center gap-4'>
                <span className='text-2xl'>💰</span>
                <p className='text-2xl font-semibold text-indigo-600 dark:text-indigo-400'>
                  {selectedRoom.price.toLocaleString()} VND / đêm
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-2xl'>📊</span>
                <p className='text-lg'>
                  <span className='font-semibold text-slate-700 dark:text-slate-300'>
                    Tình trạng:{' '}
                  </span>
                  <span
                    className={`font-bold ${
                      selectedRoom.status === 'available'
                        ? 'text-teal-600'
                        : 'text-red-600'
                    }`}
                  >
                    {selectedRoom.status === 'available'
                      ? 'Còn trống'
                      : 'Đã được đặt'}
                  </span>
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-2xl'>⭐</span>
                <p className='text-lg font-bold text-slate-700 dark:text-slate-300'>
                  {selectedRoom.averageRating.toFixed(1)} / 5
                  <span className='font-normal text-slate-500'>
                    {' '}
                    ({selectedRoom.reviews.length} đánh giá)
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4 mb-8'>
              <button className='flex-1 px-6 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300'>
                Đặt phòng ngay
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className='flex-1 px-6 py-4 rounded-lg bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 transition-all duration-300'
              >
                {showForm ? 'Đóng đánh giá' : 'Viết đánh giá'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form (Conditional) */}
      {showForm && (
        <div className='my-12 p-8 bg-slate-50 dark:bg-gray-800 rounded-xl shadow-inner'>
          <form
            onSubmit={handleReviewSubmit}
            className='space-y-4 max-w-2xl mx-auto'
          >
            <h3 className='text-2xl font-semibold text-center'>
              Bạn cảm thấy thế nào về phòng này?
            </h3>
            <div className='flex items-center justify-center gap-2 py-4'>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type='button'
                  key={n}
                  onClick={() => setRating(n)}
                  className={`text-5xl transition-all duration-200 transform hover:scale-125 ${
                    n <= rating ? 'text-amber-400' : 'text-slate-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Hãy chia sẻ cảm nhận của bạn...'
              className='w-full border rounded-lg p-4 text-gray-800 bg-white border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
              rows='5'
              required
            />
            {reviewError && (
              <p className='text-red-500 text-sm'>
                {reviewError.message || reviewError}
              </p>
            )}
            <button
              type='submit'
              disabled={reviewLoading}
              className='w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors'
            >
              {reviewLoading ? 'Đang gửi...' : 'Gửi đánh giá'}
            </button>
          </form>
        </div>
      )}

      {/* Reviews Section */}
      <div className='mt-20 border-t pt-12'>
        <h2 className='text-4xl font-bold mb-8 text-slate-900 dark:text-white'>
          Đánh giá của khách hàng
        </h2>
        <div className='space-y-8'>
          {selectedRoom.reviews.length > 0 ? (
            selectedRoom.reviews.map((rev) => (
              <div key={rev._id} className='flex gap-6 items-start'>
                <div className='w-14 h-14 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center'>
                  <span className='text-2xl font-bold text-slate-600'>
                    {rev.userId?.username?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className='flex-1 border-b pb-4'>
                  <div className='flex items-center mb-1'>
                    <p className='font-bold text-lg text-slate-800 dark:text-slate-200'>
                      {rev.userId?.username || 'Ẩn danh'}
                    </p>
                  </div>
                  <div className='flex items-center gap-4 mb-2'>
                    <div className='flex'>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${i < rev.rating ? 'text-amber-400' : 'text-slate-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                      {new Date(rev.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <p className='text-slate-700 dark:text-slate-300'>
                    {rev.comment || 'Không có bình luận.'}
                  </p>
                  {user && rev.userId?._id === user._id && (
                    <button
                      onClick={() => dispatch(deleteReview(selectedRoom._id))}
                      className='mt-3 px-4 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors'
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-10'>
              <p className='text-slate-500 dark:text-slate-400'>
                Chưa có đánh giá nào cho phòng này. Hãy là người đầu tiên đánh
                giá!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomDetail;
