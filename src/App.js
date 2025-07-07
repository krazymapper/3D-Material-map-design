import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import map components
import MapOne from './maps/MapOne';
import MapTwo from './maps/MapTwo';
import MapThree from './maps/MapThree';
import MapFour from './maps/MapFour';
import MapFive from './maps/MapFive';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>TERESMA Produits Terroir</h1>
                    <nav>
                        <ul className="nav-links">
                            <li><Link to="/">Dashboard</Link></li>
                            <li><Link to="/carte1">Carte 1</Link></li>
                            <li><Link to="/carte2">Carte 2</Link></li>
                            <li><Link to="/carte3">Carte 3</Link></li>
                            <li><Link to="/carte4">Carte 4</Link></li>
                            <li><Link to="/carte5">Carte 5</Link></li>
                        </ul>
                    </nav>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/carte1" element={<MapOne />} />
                        <Route path="/carte2" element={<MapTwo />} />
                        <Route path="/carte3" element={<MapThree />} />
                        <Route path="/carte4" element={<MapFour />} />
                        <Route path="/carte5" element={<MapFive />} />
                    </Routes>
                </main>

                <footer>
                    <p>TERESMA - Produits du Terroir - Visualisation de données géographiques</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;