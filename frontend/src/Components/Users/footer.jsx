export function Footer() {
  return (
      <footer className="bg-[var(--one)] text-[var(--six)] py-8">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                      <h3 className="font-bold mb-4">Useful Links</h3>
                      <ul>
                          <li><a href="/about" className="hover:underline">About Us</a></li>
                          <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                          <li><a href="/deals" className="hover:underline">Best Deals</a></li>
                          <li><a href="/faqs" className="hover:underline">FAQs</a></li>
                      </ul>
                  </div>
                  <div>
                      <h3 className="font-bold mb-4">Categories</h3>
                      <ul>
                          <li><a href="/bath-body" className="hover:underline">Bath & Body</a></li>
                          <li><a href="/skin-care" className="hover:underline">Skin Care</a></li>
                          <li><a href="/hair-care" className="hover:underline">Hair Care</a></li>
                          <li><a href="/face-wash" className="hover:underline">Face Wash & Packs</a></li>
                          <li><a href="/body-care" className="hover:underline">Body Care & Soaps</a></li>
                      </ul>
                  </div>
                  <div>
                      <h3 className="font-bold mb-4">Contact Us</h3>
                      <p>123 Fifth Avenue, New York, NY 10010</p>
                      <p>Phone: 529-242-6868</p>
                      <p>Email: contact@jmlint.com</p>
                  </div>
              </div>
              <div className="mt-8">
                  <h3 className="font-bold mb-4">Subscribe Now</h3>
                  <div className="flex">
                      <input type="email" placeholder="Email" className="border rounded-l px-4 py-2 w-full" />
                      <button className="bg-[var(--four)] text-black rounded-r px-4 py-2">Submit</button>
                  </div>
              </div>
          </div>
          <div className="text-center py-4">
              <p className="text-sm text-[var(--four)]">Copyright © 2022 Beauty Products Store</p>
          </div>
      </footer>
  );
}
export default Footer