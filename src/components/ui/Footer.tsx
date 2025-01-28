import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#001845] text-white py-8 px-6 md:px-40">
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Welcome to our stationery shop, your one-stop destination for books,
            arts and crafts, stationery, and classroom supplies. We are
            committed to providing high-quality products for creativity and
            productivity.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/books"
                className="text-gray-300 text-sm hover:text-yellow-400 transition"
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                to="/art-craft"
                className="text-gray-300 text-sm hover:text-yellow-400 transition"
              >
                Arts and Crafts
              </Link>
            </li>
            <li>
              <Link
                to="/stationery"
                className="text-gray-300 text-sm hover:text-yellow-400 transition"
              >
                Stationery
              </Link>
            </li>
            <li>
              <Link
                to="/classroom-supplies"
                className="text-gray-300 text-sm hover:text-yellow-400 transition"
              >
                Classroom Supplies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-gray-300 text-sm">
              <span className="font-semibold">Email:</span>{" "}
              web.moniruzzaman1@gmail.com
            </li>
            <li className="text-gray-300 text-sm">
              <span className="font-semibold">Phone:</span> +880 19257 16395
            </li>
            <li className="text-gray-300 text-sm">
              <span className="font-semibold">Address:</span> 2100 Sherpur, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Stationery Shop. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-yellow-400 transition"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-yellow-400 transition"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-yellow-400 transition"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-yellow-400 transition"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
