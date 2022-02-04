import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './routers/AppRouter';

import './index.css';


function App() {
  return (
    <Router>
      <Header />
      <AppRouter />
      <Footer />
    </Router>
  );
}

export default App;
