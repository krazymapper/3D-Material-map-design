# TERESMA Produits Terroir

## Description

Ce projet présente une série de cartes interactives affichant des données géographiques sur les produits du terroir en France. Chaque carte propose différentes fonctionnalités telles que des superpositions de lieux avec des aplats de couleur, des infobulles, des capacités de zoom/panoramique et des options de filtrage.

## Demo

Vous pouvez voir l'application en ligne sur [GitHub Pages](https://lucinadev.github.io/D3_produits_terroir/).

## Technologies

- **Frontend**: React.js
- **Visualisation de données**: D3.js
- **Routing**: React Router
- **Données**: GeoJSON

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/lucinadev/D3_produits_terroir.git
cd D3_produits_terroir

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm start

# Construire l'application pour la production
npm run build

# Déployer sur GitHub Pages
npm run deploy
```

## Structure du projet

- **public/**: Fichiers statiques et données GeoJSON
- **src/**: Code source React
  - **components/**: Composants React réutilisables
  - **maps/**: Composants de cartes interactives
  - **App.js**: Composant principal avec routing
  - **index.js**: Point d'entrée de l'application

## Cartes disponibles

### Carte 1: Superposition des lieux

- Superposition des lieux avec aplats de couleur
- Infobulle avec nombre de lieux superposés
- Zoom et pan avec souris

### Carte 2: Diversité des échelles

- Superposition des lieux avec aplats de couleur
- Diversité des échelles avec figuré
- Choix de la source par liste déroulante
- Infobulle avec nom du lieu
- Surbrillance du lieu sélectionné

### Carte 3: Produits laitiers

- Superposition des lieux avec aplats de couleur
- Cercles proportionnels produits laitiers
- Choix de la source par liste déroulante
- Surbrillance du lieu sélectionné
- Infobulle avec nom du lieu et nombre de produits laitiers

### Carte 4: Catégories de produits

- Catégorie de produits en points décalés, avec couleur
- Choix de la catégorie par liste déroulante
- Surbrillance du lieu sélectionné
- Infobulle par point avec nom du lieu, nom de la catégorie et nombre de produits

### Carte 5: Catégories de produits (variante)

- Similaire à la carte 4
- Variante de visualisation des catégories de produits
