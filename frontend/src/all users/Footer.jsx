import Logo from '../assets/LOGO.png'

export function Footer() {
  return (
      <footer className="bg-[var(--one)] text-[var(--six)] py-8 text-center">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-28">
                  <div>
                      <h3 className="font-bold mb-4">GRASS COSMETICS</h3>
                      <ul>
                     <img src={Logo} alt="logo" />
                      </ul>
                  </div>
    
                  <div>
                      <h3 className="font-bold mb-4">Contact Us</h3>
                      <p>Phone:+2519999999999999</p>
                      <p>Email: contact@gmail.com</p>
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