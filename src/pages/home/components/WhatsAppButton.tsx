const WhatsAppButton = () => {
  const handleClick = () => {
    window.open("https://wa.me/5493584168069", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-40 cursor-pointer animate-pulse"
      style={{
        boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)",
      }}
    >
      <i className="ri-whatsapp-fill text-4xl text-white"></i>
    </button>
  );
};

export default WhatsAppButton;
