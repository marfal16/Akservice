import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import coverImage from '../assets/ak_copertina.png';  
import workImage from '../assets/work.jpg';  
import payImage from '../assets/pay.jpg';  
import studyImage from '../assets/study.jpg';  
import languagesImage from '../assets/languages.jpg'; 
import readImage from '../assets/read.jpg';  
import logoImage from '../assets/logo-ak-multicolor.png';  
import presentation from '../assets/presentation.mp4'; 
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import scrollDown from '../assets/scroll-bar.png';
import scrittaLogo from '../assets/AKSERVICE-W.png';
import whatsappImg from '../assets/whatsapp.png';
import coverImage from '../assets/cover.jpg';  
import { Helmet } from 'react-helmet';



const Home = () => {
  const location = useLocation(); // per rilevare cambiamenti di percorso
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
  
    return () => {
      script.remove();
    };
  }, []);

  
  const handleClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;
  
    // Creazione del link mailto con l'oggetto che include il nome
    const mailtoLink = `mailto:info@akservice.it?subject=Richiesta%20Informazioni%20da%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0A--%0A${encodeURIComponent(name)}`;
  
    // Invio dell'email
    window.location.href = mailtoLink;
  };
  

  return (
    <div>
      <Helmet>
        <title>AK SERVICE - Formazione e Supporto</title>
        <meta name="description" content="Corsi e servizi per il tuo futuro professionale. Scopri di più su AK SERVICE!" />
        <meta property="og:title" content="AK SERVICE - Formazione e Supporto" />
        <meta property="og:description" content="Corsi pratici e teorici pensati per crescere insieme." />
        <meta property="og:image" content="https://www.akservice.it/assets/logo-ak-multicolor.png" />
        <meta property="og:url" content="https://akservice.it" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.akservice.it/assets/logo-ak-multicolor.png" />
      </Helmet>
      <header className="cover-image" id="home">
        <video
          src={presentation}
          className="cover-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={coverImage}
        />
        <img src={scrittaLogo} alt="Scritta Logo" className="top-icon" />
        <a href="#about">
        <img src={scrollDown} alt="Scroll Down" className="scroll-icon" />
      </a>
      </header>

      <div className="about-us" id="about">
        <h2>CHI SIAMO</h2>
        <div className="about-content">
          <img src={logoImage} alt="Immagine di AK SERVICE" className="about-image" /> 
           <p>  AK SERVICE è nata nel 2022 con la missione di trasformare il futuro professionale dei giovani, offrendo percorsi formativi di alta qualità per prepararli alle sfide del mondo del lavoro 
          <br />  <br />   Offriamo corsi pratici e teorici, pensati per sviluppare competenze concrete, con un approccio innovativo e orientato al miglioramento continuo.
          <br />  <br /> Crediamo fermamente che la formazione sia la chiave del successo. Per questo motivo, accompagniamo ogni studente e professionista nel suo percorso di crescita, garantendo supporto costante e programmi formativi all'avanguardia.
          <br />  <br /> Il nostro impegno è creare un ponte tra le opportunità di oggi e il futuro che vogliamo costruire, un futuro dove inclusività e preparazione si intrecciano per dare a ogni individuo gli strumenti giusti per emergere e prosperare.
          </p>
        </div>
      </div>

      <section className="services-courses" id="services" >
        <h2>I NOSTRI SERVIZI</h2>
        <div className="services-list">
          <div className="service-item">
            <img src={workImage} alt="Servizio 1" className="service-icon" />
            <h3>Certificazioni Informatiche</h3>
            <p>Preparazione completa per il mondo del lavoro, con corsi che combinano teoria e pratica nel campo delle tecnologie informatiche.</p>
            <button onClick={(e) => handleClick(e, '/corsi-informatici')} className="card-button">Scopri di più</button>
          </div>
          <div className="service-item">
            <img src={languagesImage} alt="Servizio 2" className="service-icon" />
            <h3>Certificazioni Linguistiche</h3>
            <p>Corsi pratici e mirati per acquisire competenze linguistiche che aprono la porta a carriere internazionali e opportunità professionali.</p>
            <button onClick={(e) => handleClick(e, '/corsi-lingue')} className="card-button">Scopri di più</button>
          </div>
          <div className="service-item">
            <img src={readImage} alt="Servizio 3" className="service-icon" />
            <h3>Corsi Regionali</h3>
            <p>Programmi di formazione specifici per le esigenze del mercato locale, pensati per i settori più richiesti nella tua regione.</p>
            <button onClick={(e) => handleClick(e, '/corsi-regionali')} className="card-button">Scopri di più</button>
          </div>
          <div className="service-item">
            <img src={studyImage} alt="Servizio 4" className="service-icon" />
            <h3>Formazione Universitaria</h3>
            <p>Percorsi di studi universitari online che ti permettono di ottenere una laurea e acquisire competenze per entrare nel mondo del lavoro.</p>
            <button onClick={(e) => handleClick(e, '/formazione-universitaria')} className="card-button">Scopri di più</button>
          </div>
        </div>
      </section>

      {/* Sezione Testimonianze */}
      <section className="testimonials-section" id="testimonials">
        <h2>DICONO DI NOI</h2>
        <div className="elfsight-app-aead171d-92ed-4d0e-aaab-eb9bc30f870b" data-elfsight-app-lazy></div>
      </section>

      {/* Sezione Contatti */}
      <section className="contact-section" id="contact">
        <h2>CONTATTI</h2>
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
                <a href="https://wa.me/3333254691" target="_blank" className="whatsapp-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  3333254691 - WhatsApp
                  <img src={whatsappImg} alt="WhatsApp" style={{ width: '20px', marginLeft: '8px' }} />
                </a>
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
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">NOME</label>
                <input type="text" id="name" name="name" ref={nameRef} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input type="email" id="email" name="email" ref={emailRef} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">MESSAGGIO</label>
                <textarea id="message" name="message" rows="4" ref={messageRef} required></textarea>
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