import Navbar from '../components/Navbar';

export default function Footer() {
  const currentdate = new Date();

  const yearnow = currentdate.getFullYear();

  return (


    <footer className='footer seccion'>
      <div className='container'>
        <Navbar />
      </div>
      <a
        href='https://wa.me/5491155555555'
        className='whatsapp_float'
        target='_blank'
        rel='noopener noreferrer'>
        <i className='fa fa-whatsapp whatsapp-icon'></i>
      </a>
      <p className='copyright'>
        Todos los derechos Reservados {yearnow} &copy;
      </p>
    </footer>


  );
}
