# Utiliser une version de Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application dans le conteneur
COPY . ./

# Définir une variable d'environnement pour le port
ENV PORT 4000

# Exposer le port sur lequel l'application écoutera
EXPOSE ${PORT}

# Commande par défaut pour démarrer l'application
CMD ["npm", "start"]
