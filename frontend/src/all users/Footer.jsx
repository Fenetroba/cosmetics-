import Logo from '../assets/LOGO.png'

export function Footer() {
  return (
      <footer className="bg-[var(--one)] text-[var(--six)] py-8">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-38">
                  <div>
                      <h3 className="font-bold mb-4">GRASS COSMOTIC</h3>
                      <ul>
                     <img src={Logo} alt="logo" />
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
             
          </div>
          <div className="text-center pt-4 mt-10 border-t-2 border-amber-50">
              <p className="text-sm text-[var(--five)] font-bold">Copyright © 2025 by FENA</p>
            
          </div>
      </footer>
  );
}
export default Footer