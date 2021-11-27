import { Suspense } from 'react';
import {
    BrowserRouter,
    Navigate,
    NavLink,
    Routes,
    Route
} from 'react-router-dom';

import { routes } from './routes';
import logo from '../logo.svg';

export const Navigation = () => {

    return (
        <Suspense fallback={ <span>Loading...</span> }>
            <BrowserRouter>
                <div className="main-layout">
                    <nav>
                        <img src={ logo } alt="React Logo" />
                        <ul>
                            {
                                routes.map( ({ name, to }) => (        
                                    <li key={ to } >
                                        <NavLink
                                            className={ ({ isActive }) => isActive ? 'nav-active' : '' }
                                            to={ to }
                                        >
                                            { name }
                                        </NavLink>
                                    </li>
                                ))
                            }
                            
                        </ul>
                    </nav>
                    <Routes>
                        {
                            routes.map( ({ Component, path }) => (
                                <Route
                                    element={ <Component /> }
                                    key={ path }
                                    path={ path } 
                                />
                            ))
                        }

                        <Route path="/*" element={ <Navigate to={ routes[0].name } replace /> } />
                    </Routes>
                </div>
            </BrowserRouter>
        </Suspense>
    );
}
