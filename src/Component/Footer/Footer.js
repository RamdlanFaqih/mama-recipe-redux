import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div>
  <footer className='container-fluid'>
    <div className="row align-items-center">
      <section id="footer-section" className="container-fluid text-center">
        <div className="col12">
          <h1>Eat, Cook, Repeat</h1>
          <p>Share your best recipe by uploading here !</p>
        </div>
      </section>

      <section id="footer-nav">
        <div className="col12">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Company</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Learn More</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Get In Touch</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </footer>
</div>

  )
}

export default Footer
