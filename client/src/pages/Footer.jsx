import React from 'react';
import './Footer.css'; // Se hai uno stile CSS dedicato per il footer

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        {/* Colonna: Social */}
        <div className="footer-socials">
          <h3>Seguici su</h3>
          <ul>
            <li>
              <a href="https://www.facebook.com/people/Ak-Service/100091582421040/" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/ak_service_srl/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/akservice/posts/?feedView=all&viewAsMember=true" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.tiktok.com/@akservicesrl?_tZN-8vY9xR0GGta&_r=1" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>

        {/* Colonna: Contatti */}
        <div className="footer-contact">
          <h3>Contatti</h3>
          <p>Telefono: 08118207535</p>
          <p>
            WhatsApp:{" "}
            <a href="https://wa.me/3333254691">
              3333254691
            </a>
          </p>
          <p>
            Email: <a href="mailto:info@akservice.it">info@akservice.it</a>
          </p>
        </div>

        {/* Colonna: Link Utili */}
        <div className="footer-links">
          <h3>Link Utili</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">Chi Siamo</a></li>
            <li><a href="#services">I Nostri Servizi</a></li>
            <li><a href="#contact">Contatti</a></li>
            <li>
              <a
                className="privacy-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.UC_UI && window.UC_UI.showSecondLayer();
                }}
              >
                Privacy e Cookie
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 AK SERVICE S.R.L. | Tutti i diritti riservati | P.IVA: 10024911215 </p>
      </div>
    </footer>
  );
};

export default Footer;
