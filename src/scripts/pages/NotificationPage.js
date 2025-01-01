import React from 'react';
import EmptyMessage from '../components/EmptyMessage';
import { showFormattedDate } from '../utils/showFormattedDate';
import LocaleContext from '../contexts/LocaleContext';
import 'react-toastify/dist/ReactToastify.css';

function DetailPage() {
  const { localeContextValue, themeContextValue } = React.useContext(LocaleContext);
  const { locale } = localeContextValue;
  const [ notes, setNotes ] = React.useState([]);

  if (notes === undefined || notes === null) {
    return <EmptyMessage message={locale === 'id' ? 'Periksa koneksi kamu!' : 'Check your connection!'} />;
  }

  return (
    <section>
      <div className='note-detail'>
      <p className='note-detail__title'>Who???</p>
      <p className='note-detail__date'>00:21. Rabu, 25 Desember 2024 & <i>22:12. Rabu, 1 Januari 2025</i></p>
      <p className='note-detail__body'>
        Maaf kalo keberadaanku mengganggu buat kamu ya Ca. Tanpa disadari aku telah mengetahui banyak hal tentang kamu,
        tentang mereka yg pernah sangat dekat dengan kamu, sampai aku pernah berfikir apa yg kamu lakukan ke mereka sampai mereka mau seperti itu kepadamu ataupun sebaliknya. 
        Aku tidak tahu mereka siapa? seberapa penting mereka untuk kamu? apa tujuan mereka? Aku sangat penasaraan dengan itu. Tapi percayalah itu semata karena aku khawatir sama kamu.
        Seharusnya aku tidak perlu khawatir karena ada banyak yg ingin menjaga kamu dengan baik, tapi entah kenapa aku gak bisa tenang, selalu ada rasa gundah di hati.
        Tak terasa sudah sangat lama aku merasakan hal yang sangat tidak menyenangkan dalam hati yang penuh bergejolak dengan rasa marah, cemas, tanpa ada henti yg terkadang emosi ini gak bisa aku tahan.
        Aku sempat berandai kapan ini akan berakhir, perasaan yg gak nyaman ini. Aku tinggal di tempat kelahiranku disini dan ini baru pertama kali nya aku merasakan seperti bukan tinggal di rumah dimana aku bisa pulang dengan nyaman.
        Aku sampai berkeinginan untuk keluar dari rumah ini, dan tidak pernah kembali dan mencari rumah baru yg nyaman untuk pulang.
        Ohya aku terkadang mengetahui pesan yg kamu sampaikan entah ini hanya firasat atau memang hanya kebetulan, entah dapat dipercaya atau tidak, aku gk bisa memahaminya. Kamu mungkin cuman gak tega karena aku telah melakukan beberapa hal, mungkin sekarang aku telah mengetahuinya kalo perasaan kamu bukan untukku, atau mungkin sejak dulu.
        Dari kenyataan ini aku dapat melihat kalo hati seseorang gak bisa di pakasain.<br /><i>Mungkin kamu saat ini lagi di deketin oleh yang lain kan<strong>??</strong>, kamu memang cantik begitu banyak yang ingin bersama kamu dan menjaga kamu. Ternyata yang kamu cari itu bukan aku, engga ada satu pun.</i><br /><br />
        Di hari Natal yg suci ini aku berharap kamu bisa berubah dari hal-hal yg banyak ingin aku perbaiki dari kamu, ada banyak hal yg ingin aku protes ke kamu, banyak bangett. 
        Dan pada Natal ini aku dari dulu hanya berharapkan semua hal yg aku khawatirkan benar tidak adanya. 
        Dan semoga Tuhan memberikan kita anugerah untuk menjadi pribadi yg lebih baik lagi.
        Dari segala hadiah natal yg ingin aku dambakan adalah aku hanya ingin melihat kamu berubah, bukan hanya kamu tapi aku juga, kita sama-sama berjuang melawan sesuatu yg harus kita capai.<br /><br />
        Ohya Selamat Hari Natal <i>dan tahun baru</i> ya Ca, Tuhan memberkati dan selalu ada dihati kamu, semoga semua doa yg kita panjatkan dikabulkan, Amin.
      </p>
    </div>
    </section>
  );
}

export default DetailPage;
