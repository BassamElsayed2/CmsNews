import React from "react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css"; // تأكد من أنك تضيف النمط الخاص بالمكتبة

const ImagePopup = ({ images, setIsOpen, photoIndex, setPhotoIndex }) => {
  // تأكد من أن الصورة التي يتم تحميلها غير فارغة
  const currentImage = images[photoIndex] || "";

  return (
    <React.Fragment>
      {currentImage && (
        <Lightbox
          mainSrc={currentImage} // الصورة الرئيسية
          nextSrc={images[(photoIndex + 1) % images.length]} // الصورة التالية
          prevSrc={images[(photoIndex + images.length - 1) % images.length]} // الصورة السابقة
          onCloseRequest={() => setIsOpen(false)} // إغلاق الـ popup
          onMovePrevRequest={
            () =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length) // الانتقال للصورة السابقة
          }
          onMoveNextRequest={
            () => setPhotoIndex((photoIndex + 1) % images.length) // الانتقال للصورة التالية
          }
          reactModalStyle={{ overlay: { zIndex: 1000 } }} // إضافة zIndex لضمان ظهور الـ popup فوق العناصر الأخرى
          imagePadding={50} // تعديل المسافة حول الصورة داخل الـ Lightbox
          imageFit="contain" // ضبط الصورة لتناسب العرض داخل الـ Lightbox
        />
      )}
    </React.Fragment>
  );
};

export default ImagePopup;
