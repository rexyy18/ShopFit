const banners = [
  {
    id: 1,
    title: "WE PICK, YOU SHOP",
    description:
      "Our team selects the finest dresses available throughout the season.",
    bg: "#2a2a2a",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: 2,
    title: "WEDDING DRESS",
    description: "Finding a classic dress for your special occasion.",
    bg: "#7a9e8e",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
  },
  {
    id: 3,
    title: "YOUR PERSONAL STYLE",
    description: "A woman must love her clothes and the way she wears them.",
    bg: "#1a1a2e",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
  },
];

const FeatureBanners = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0",
      }}
    >
      {banners.map((banner) => (
        <div
          key={banner.id}
          style={{
            backgroundColor: banner.bg,
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {/* Text */}
          <div style={{ color: "#fff", zIndex: 2, flex: 1 }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "800",
                letterSpacing: "1px",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              {banner.title}
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: "1.6",
                maxWidth: "180px",
              }}
            >
              {banner.description}
            </p>
          </div>

          {/* Image */}
          <img
            src={banner.image}
            alt={banner.title}
            style={{
              height: "180px",
              width: "120px",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FeatureBanners;
