const Footer = () => {
    return (
      <footer className="bg-base-200 text-base-content">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">ScholarStream</h2>
              <p className="text-sm">
                Connecting students with scholarship opportunities worldwide. Your path to academic success starts here.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="link link-hover">Home</a></li>
                <li><a href="/scholarships" className="link link-hover">All Scholarships</a></li>
                <li><a href="/about" className="link link-hover">About Us</a></li>
                <li><a href="/contact" className="link link-hover">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4 text-2xl">
                <a href="#" className="hover:text-primary transition">📘</a>
                <a href="#" className="hover:text-primary transition">🐦</a>
                <a href="#" className="hover:text-primary transition">💼</a>
                <a href="#" className="hover:text-primary transition">📸</a>
              </div>
            </div>
          </div>
          
          <div className="divider"></div>
          
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} ScholarStream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  