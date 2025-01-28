import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import "@/pages/test/style.css"; // File CSS cho hiệu ứng

const LazyImage = ({ src, alt }) => {
  
  // Hook để theo dõi khi phần tử vào viewport
  const { ref, inView } = useInView({
    threshold: 0.1, // Phần tử xuất hiện ít nhất 10% trong viewport
    triggerOnce: true, // Chỉ kích hoạt một lần
  });

  return (
    <div
      ref={ref} // Gắn ref để theo dõi
      className={`image-container `} // Thêm hiệu ứng
    >
      {inView ? <img src={src} alt={alt} className="image" /> : null}
    </div>
  );
};

const Test = () => {

 
  const images = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/400",
    "https://via.placeholder.com/500",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
    "https://via.placeholder.com/600",
  ];

  return (
    <div>
      <h1>React Intersection Observer</h1>
      <p>Scroll xuống để tải hình ảnh khi chúng xuất hiện trong viewport.</p>
      <div className="image-list">
        {images.map((src, index) => (
          <LazyImage  key={index} src={src} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Test;
