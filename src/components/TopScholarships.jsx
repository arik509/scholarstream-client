import { Link } from 'react-router';

const TopScholarships = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="w-11/12 mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Scholarships</h2>
          <p className="text-gray-600 text-lg">Explore the most popular scholarship opportunities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <figure className="h-48 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-156230${item}849-7d85a20acaeb?w=500&h=300&fit=crop`} 
                  alt="University" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-xl font-bold text-gray-800">
                  Excellence Scholarship
                </h3>
                <p className="text-gray-600">Harvard University</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                  <span>📍 United States</span>
                  <span>•</span>
                  <span>💰 Full Fund</span>
                </div>
                <div className="badge badge-primary mt-2">Masters Degree</div>
                <div className="card-actions justify-end mt-4">
                  <Link to={`/scholarships/${item}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/scholarships" className="btn btn-primary btn-lg">
            View All Scholarships
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;
