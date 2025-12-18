const Testimonials = () => {
    const testimonials = [
      { 
        name: "Sarah Johnson", 
        university: "MIT", 
        quote: "ScholarStream helped me find the perfect scholarship. Now I'm studying at my dream university!" 
      },
      { 
        name: "Ahmed Khan", 
        university: "Oxford", 
        quote: "The platform made the application process so simple. Highly recommended for all students!" 
      },
      { 
        name: "Maria Garcia", 
        university: "Cambridge", 
        quote: "I found multiple opportunities and got accepted. This platform changed my life!" 
      }
    ];
  
    return (
      <section className="py-16 bg-gradient-to-r from-purple-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-gray-600 text-lg">Hear from students who achieved their dreams</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-gradient-to-br from-[#7c3aed] to-[#14b8a6] text-white rounded-full w-12">
                        <span className="text-xl">{testimonial.name[0]}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.university}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="text-yellow-500 mt-2">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  