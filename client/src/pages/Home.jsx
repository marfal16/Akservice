import React, { useEffect } from 'react';
import './Home.css';
import coverImage from '../assets/ak_copertina.png';  
import workImage from '../assets/work.jpg';  
import payImage from '../assets/pay.jpg';  
import studyImage from '../assets/study.jpg';  
import languagesImage from '../assets/languages.jpg'; 
import readImage from '../assets/read.jpg';  
import logoImage from '../assets/logo.jpg';  
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://cdn.shapo.io/js/embed.js';
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        if (window.Shapo) {
          window.Shapo.init();
        }
      };
  
    }, []);
  
  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div>
      <header className="cover-image" id="home">
        <img src={coverImage} alt="Copertura Azienda" className="cover-img" />
      </header>

      <div className="about-us" id="about">
        <h2>Chi Siamo</h2>
        <div className="about-content">
          <img src={logoImage} alt="Immagine di AK SERVICE" className="about-image" /> 
           <p> <br /> <br /> AK SERVICE nasce nel 2022 con l’obiettivo di offrire percorsi di formazione professionale e scolastica per preparare i giovani alle sfide del mondo del lavoro. Attraverso corsi mirati e un approccio pratico, forniamo competenze utili per una crescita personale e professionale.  
          <br />  <br />   Crediamo nella formazione come chiave del successo, supportando studenti e lavoratori nella loro evoluzione con programmi innovativi e assistenza continua.
          <br />  <br /> Il nostro impegno è creare opportunità concrete per un futuro più solido e inclusivo.</p>
        </div>
      </div>

      <section className="services-courses" id="services">
        <h2>I Nostri Servizi</h2>
        <div className="services-list">
          <div className="service-item">
            <img src={workImage} alt="Servizio 1" className="service-icon" />
            <h3>Certificazioni Informatiche</h3>
            <p>Corsi pensati per preparare i giovani al mondo del lavoro, con focus su competenze pratiche e teoriche.</p>
            <button onClick={(e) => handleClick(e, '/corsi-informatici')} className="card-button">Scopri i dettagli</button>
          </div>
          <div className="service-item">
            <img src={languagesImage} alt="Servizio 3" className="service-icon" />
            <h3>Certificazioni Linguistiche</h3>
            <p>Offriamo corsi pratici su competenze specifiche per carriere professionali nel settore tecnico.</p>
            <button onClick={(e) => handleClick(e, '/corsi-lingue')} className="card-button">Scopri i dettagli</button>
          </div>
          <div className="service-item">
            <img src={readImage} alt="Servizio 2" className="service-icon" />
            <h3>Corsi Regionali</h3>
            <p>Offriamo corsi pratici su competenze specifiche per carriere professionali nel settore tecnico.</p>
            <button onClick={(e) => handleClick(e, '/corsi-regionali')} className="card-button">Scopri i dettagli</button>
          </div>
          <div className="service-item">
            <img src={studyImage} alt="Servizio 2" className="service-icon" />
            <h3>Formazione Universitaria</h3>
            <p>Offriamo corsi pratici su competenze specifiche per carriere professionali nel settore tecnico.</p>
            <button onClick={(e) => handleClick(e, '/formazione-universitaria')} className="card-button">Scopri i dettagli</button>
          </div>
        </div>
      </section>

      {/* Sezione Testimonianze */}
      <section className="testimonials-section" id="testimonials">
        <h2>Dicono di noi</h2>
        <div id="shapo-widget-3631ed6ab32424719ed3"></div>
      </section>

      {/* Sezione Contatti */}
      <section className="contact-section" id="contact">
        <h2>Contatti</h2>
        <div className="contact-container">
          <div className="contact-box map-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.3409010696755!2d14.465603076416016!3d40.776519033662666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133ba57060cd3eef%3A0x735a772a38a573ef!2sAK%20service!5e0!3m2!1sen!2sit!4v1742903934698!5m2!1sen!2sit"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          <div className="contact-box info-box">
            <div className="info-row">
              <strong className="info-title">Indirizzo</strong>
              <p className="info-content">Via Pucillo, 14 Boscotrecase (Na) 80042</p>
            </div>
            <div className="info-row">
              <strong className="info-title">Ore Lavorative</strong>
              <p className="info-content">
                LUN-VEN: 10:00 - 13:00 / 16:00 - 18:30<br />
                SAB: 10:00 - 12:30
              </p>
            </div>
            <div className="info-row">
              <strong className="info-title">Telefono</strong>
              <p className="info-content">
                08118207535
              </p>
              <p className="info-content">
                <a href="https://wa.me/3333254691" target="_blank" className="whatsapp-link">3333254691 - WhatsApp</a>
              </p>
            </div>
            <div className="info-row">
              <strong className="info-title">Email</strong>
              <p className="info-content">
                <a href="mailto:info@akservice.it">info@akservice.it</a><br />
                <a href="mailto:assistenza@akservice.it">assistenza@akservice.it</a><br />
                <a href="mailto:segreteria@akservice.it">segreteria@akservice.it</a>
              </p>
            </div>
          </div>

          <div className="contact-box form-box">
            <form action="mailto:info@akservice.it" method="post" encType="text/plain">
              <div className="form-group">
                <label htmlFor="name">NOME</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">MESSAGGIO</label>
                <textarea id="message" name="message" rows="4" required></textarea>
              </div>
              <button type="submit">Invia</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;