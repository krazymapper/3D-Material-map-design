import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">
            <h2>TERESMA Produits Terroir - Dashboard</h2>

            <div className="map-grid">
                <div className="map-card">
                    <div className="map-title">Carte 1: Superposition des lieux</div>
                    <div className="map-description">
                        <ul>
                            <li>Superposition des lieux avec aplats de couleur</li>
                            <li>Infobulle avec nombre de lieux superposés</li>
                            <li>Zoom et pan avec souris</li>
                        </ul>
                    </div>
                    <Link to="/carte1" className="view-button">Voir la carte</Link>
                </div>

                <div className="map-card">
                    <div className="map-title">Carte 2: Diversité des échelles</div>
                    <div className="map-description">
                        <ul>
                            <li>Superposition des lieux avec aplats de couleur</li>
                            <li>Diversité des échelles avec figuré</li>
                            <li>Choix de la source par liste déroulante</li>
                            <li>Infobulle avec nom du lieu</li>
                            <li>Surbrillance du lieu sélectionné</li>
                        </ul>
                    </div>
                    <Link to="/carte2" className="view-button">Voir la carte</Link>
                </div>

                <div className="map-card">
                    <div className="map-title">Carte 3: Produits laitiers</div>
                    <div className="map-description">
                        <ul>
                            <li>Superposition des lieux avec aplats de couleur</li>
                            <li>Cercles proportionnels produits laitiers</li>
                            <li>Choix de la source par liste déroulante</li>
                            <li>Surbrillance du lieu sélectionné</li>
                            <li>Infobulle avec nom du lieu et nombre de produits laitiers</li>
                        </ul>
                    </div>
                    <Link to="/carte3" className="view-button">Voir la carte</Link>
                </div>

                <div className="map-card">
                    <div className="map-title">Carte 4: Catégories de produits</div>
                    <div className="map-description">
                        <ul>
                            <li>Catégorie de produits en points décalés, avec couleur</li>
                            <li>Choix de la catégorie par liste déroulante</li>
                            <li>Surbrillance du lieu sélectionné</li>
                            <li>Infobulle par point avec nom du lieu, nom de la catégorie et nombre de produits</li>
                        </ul>
                    </div>
                    <Link to="/carte4" className="view-button">Voir la carte</Link>
                </div>

                <div className="map-card">
                    <div className="map-title">Carte 5: Catégories de produits (variante)</div>
                    <div className="map-description">
                        <ul>
                            <li>Similaire à la carte 4</li>
                            <li>Variante de visualisation des catégories de produits</li>
                        </ul>
                    </div>
                    <Link to="/carte5" className="view-button">Voir la carte</Link>
                </div>

                <div className="map-card info-card">
                    <div className="map-title">À propos du projet</div>
                    <div className="map-description">
                        <p>Ce projet présente une série de cartes interactives affichant des données géographiques sur les produits du terroir en France. Chaque carte propose différentes fonctionnalités telles que des superpositions de lieux avec des aplats de couleur, des infobulles, des capacités de zoom/panoramique et des options de filtrage.</p>
                        <p>Les cartes utilisent la bibliothèque D3.js pour la visualisation des données et la projection Lambert-93 pour une représentation précise de la France.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;