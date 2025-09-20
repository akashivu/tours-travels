export default function ContactForm() {
  return (
    <div
      className="relative bg-cover bg-center flex flex-col justify-center items-center text-center px-4 py-16"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1557683304-673a23048d34?q=80&w=564&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
  }}
    >
     
      <div className="absolute inset-0 bg-black/60"></div>

      
      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       
        <div className="text-left text-white">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Let’s talk about <br />
            <span className="text-yellow-400">working together</span>
          </h2>
          <p className="mt-6 text-base md:text-lg max-w-md text-gray-200">
           “Got queries? Our dedicated support team is ready to help you with quick solutions, every day of the week.”
          </p>
        </div>

        
        <form className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Contact Number"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <textarea
            placeholder="Write Requirement Details"
            rows={4}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
