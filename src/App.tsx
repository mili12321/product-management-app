import React from 'react';
import { Routes , Route, BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from './cmps/Navbar';
import { ProductProvider } from './productContext/ProductProvider';
import {routes} from './routes.js'
import { componentTypes } from './utils/componentTypes';

function App() {
  
  const getComponent = (componentKey: string) => {
    const Component: React.FC = componentTypes[componentKey];
    return <Component/>
  }

  return (
          <ProductProvider>
            <Router>
              <Navbar/>
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    element={getComponent(route.component)}
                    path={route.path}
                  />
                ))}
              </Routes>
            </Router>
          </ProductProvider>
  );
}

export default App;
