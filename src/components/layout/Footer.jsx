function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="text-2xl font-black tracking-tighter text-accent cursor-pointer">
              PathBound
            </div>
            <p className="text-white">
              Transform your body, transform your life. Join us today!
            </p>
          </div>

          <div className="flex flex-row gap-16 md:gap-24">
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="" className="hover:text-accent transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="" className="hover:text-accent transition-colors">
                    Explore
                  </a>
                </li>
                <li>
                  <a href="" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Travel Street</li>
                <li>City, State 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@pathbound.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
