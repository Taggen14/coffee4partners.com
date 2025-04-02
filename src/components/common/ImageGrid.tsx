const ImageGrid = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1621631187029-c1c6e9c58a26?auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Modern garage door",
      title: "Kvalitetsportar",
    },
    {
      url: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Industrial facility",
      title: "Toppmodern Fabrik",
    },
    {
      url: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?auto=format&fit=crop&w=600&h=400&q=80",
      alt: "Professional installation",
      title: "Expert Installation",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 my-16">
      {images.map((image, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl shadow-lg"
        >
          <div className="aspect-w-3 aspect-h-2">
            <img
              src={image.url}
              alt={image.alt}
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h4 className="text-white font-semibold text-lg">
                {image.title}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
