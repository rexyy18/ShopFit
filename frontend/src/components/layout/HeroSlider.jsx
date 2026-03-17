import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "MODERN",
    subtitle: "OFFICE ATTIRE",
    description: "DRESSING FOR THE OCCASION",
    buttonText: "VIEW COLLECTION",
    bg: "#1a1a1a",
    textColor: "#fff",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
  },
  {
    id: 2,
    title: "ELEGANT",
    subtitle: "SUMMER DRESSES",
    description: "EXPLORE THE NEW COLLECTION",
    buttonText: "SHOP NOW",
    bg: "#2c2c2c",
    textColor: "#fff",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80",
  },
  {
    id: 3,
    title: "TRENDY",
    subtitle: "FLORAL STYLES",
    description: "MADE FOR EVERY OCCASION",
    buttonText: "DISCOVER MORE",
    bg: "#3a3a3a",
    textColor: "#fff",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const slide = slides[current];

  return (
    <div
      style={{
        backgroundColor: slide.bg,
        height: "520px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 80px",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "20px",
          background: "rgba(255,255,255,0.2)",
          color: "#fff",
          border: "none",
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ‹
      </button>

      {/* Text Content */}
      <div style={{ color: slide.textColor, zIndex: 2 }}>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "900",
            lineHeight: "1.1",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          {slide.title}
          <br />
          {slide.subtitle}
        </h1>
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "3px",
            margin: "15px 0 30px",
            color: "#ccc",
          }}
        >
          {slide.description}
        </p>
        <button
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            border: "2px solid #fff",
            padding: "12px 28px",
            fontSize: "12px",
            letterSpacing: "2px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.color = "#222";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#fff";
          }}
        >
          {slide.buttonText}
        </button>
      </div>

      {/* Model Image */}
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          zIndex: 2,
        }}
      >
        <img
          src={slide.image}
          alt="model"
          style={{
            height: "500px",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "20px",
          background: "rgba(255,255,255,0.2)",
          color: "#fff",
          border: "none",
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
