import { Route, Switch } from 'react-router-dom';

import Contacto from '../pages/Contacto';
import Galeria from '../pages/Galeria';
import Home from '../pages/Home';
import Nosotros from '../pages/Nosotros';
import NotFoundPage from '../pages/NotFoundPage';
import Ofertas from '../pages/Ofertas';

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path='/ofertas' component={Ofertas} />
      <Route exact path='/nosotros' component={Nosotros} />
      <Route exact path='/galeria' component={Galeria} />
      <Route exact path='/contacto' component={Contacto} />
      <Route exact path='/' component={Home} />
      <Route path='*' component={NotFoundPage} />
    </Switch>
  );
}
