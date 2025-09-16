import { motion } from 'framer-motion';
import HomeServices from '../components/HomeServices';
import { Link } from 'react-router-dom';
import HomeRooms from '../components/HomeRooms';

function Home() {
  return (
    <div className='flex flex-col font-sans'>
      <section
        className='relative h-[100vh] w-full bg-cover bg-center overflow-hidden'
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className='absolute inset-0 bg-black/50'></div>
        <motion.div
          className='absolute inset-0  opacity-20'
          style={{ backgroundImage: "url('/stars.png')" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        />

        <div className='relative z-10 flex items-center h-full px-10 md:px-20'>
          <motion.div
            className='max-w-2xl text-left text-white'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          >
            <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight'>
              Chào mừng đến với{' '}
              <span className='bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 bg-clip-text text-transparent'>
                TonnyHotel
              </span>
            </h1>
            <p className='text-lg md:text-xl mb-6 text-gray-200 hidden md:block'>
              Tại TonnyHotel, mỗi khoảnh khắc của bạn đều được trân trọng – từ
              những phòng nghỉ thoáng đãng, đến ẩm thực tinh tế, và dịch vụ tận
              tâm 24/7. Chúng tôi mang đến cho bạn trải nghiệm không chỉ là nghỉ
              ngơi, mà còn là hành trình tận hưởng sự thư giãn và phong cách
              sống thượng lưu.
            </p>

            <div className='flex gap-4 '>
              <Link
                to='/rooms'
                className='px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-200 via-orange-400 to-yellow-600 
                           text-black font-semibold hover:opacity-90 transition shadow-lg'
              >
                Xem phòng
              </Link>
              <a
                href='/about'
                className='px-6 py-3 rounded-xl border border-white text-white hover:bg-white/20 transition'
              >
                Giới thiệu
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <section className='transition-colors  duration-500 ease-in-out px-6 py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto font-sans'>
          <motion.div
            className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-md'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className='text-2xl font-bold mb-2'>Phòng hiện đại</h3>
            <p className='text-gray-600 dark:text-gray-300 "'>
              Không gian sang trọng với thiết kế tinh tế, nội thất cao cấp và
              tầm nhìn tuyệt đẹp, mang đến cho bạn trải nghiệm nghỉ dưỡng thoải
              mái và tiện nghi bậc nhất.
            </p>
          </motion.div>

          <motion.div
            className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-md'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className='text-2xl font-bold mb-2'>Ẩm thực đa dạng</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Tận hưởng hành trình ẩm thực đặc sắc từ các món Á – Âu, được chế
              biến bởi đội ngũ bếp trưởng tài hoa, mang đến cho bạn hương vị khó
              quên trong từng bữa ăn.
            </p>
          </motion.div>

          <motion.div
            className='bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-md'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className='text-2xl font-bold mb-2'>Dịch vụ 24/7</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Với đội ngũ nhân viên chuyên nghiệp và thân thiện, TonnyHotel luôn
              sẵn sàng hỗ trợ bạn mọi lúc, để hành trình của bạn diễn ra trọn
              vẹn và thoải mái nhất.
            </p>
          </motion.div>
        </div>
      </section>
      <HomeServices />
      <HomeRooms />
    </div>
  );
}

export default Home;
