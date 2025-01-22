const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FreshFarm</h3>
            <p className="text-green-200">
              Bringing nature's best to your doorstep
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-200 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-green-200 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-green-200">
              <li>123 Farm Road</li>
              <li>Countryside, CS 12345</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@freshfarm.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md w-full text-green-900"
              />
              <button className="bg-yellow-500 text-green-900 px-4 py-2 rounded-r-md hover:bg-yellow-400">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-800 text-center text-green-200">
          <p>&copy; 2024 FreshFarm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
