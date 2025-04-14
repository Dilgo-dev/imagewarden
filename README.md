# 🔒 ImageWarden

[![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📝 Description

ImageWarden est une application de bureau sécurisée qui vous permet de cacher des mots de passe dans des images à l'aide de la technique de stéganographie. Développée avec Electron, React, TypeScript et Tailwind CSS, cette application offre une interface moderne et intuitive pour stocker vos informations sensibles directement dans des images ordinaires.

## ✨ Fonctionnalités

- 🖼️ **Encodage de mots de passe** - Cachez vos mots de passe dans des images
- 🔓 **Décodage de mots de passe** - Récupérez les mots de passe cachés dans les images
- 🔐 **Chiffrement sécurisé** - Protection par chiffrement AES-256
- 🌓 **Mode clair/sombre** - Interface adaptable à vos préférences
- 🖥️ **Application de bureau multiplateforme** - Fonctionne sur Windows, macOS et Linux
- 📱 **Interface responsive** - Conception adaptée à toutes les tailles d'écran
- 🔌 **Fonctionne hors ligne** - Aucune connexion internet requise

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [npm](https://www.npmjs.com/) (v6 ou supérieur) ou [yarn](https://yarnpkg.com/) (v1.22 ou supérieur)

### Étapes d'installation

```bash
# Cloner le dépôt
git clone https://github.com/Dilgo-dev/imagewarden.git

# Accéder au répertoire du projet
cd imagewarden

# Installer les dépendances
npm install
# ou
yarn install

# Lancer l'application en mode développement
npm run dev
# ou
yarn dev

# Créer un package pour la distribution
npm run build
# ou
yarn build
```

## 🛠️ Technologies utilisées

- **[Electron](https://www.electronjs.org/)** - Framework pour applications de bureau
- **[React](https://reactjs.org/)** - Bibliothèque UI
- **[TypeScript](https://www.typescriptlang.org/)** - Langage de programmation typé
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitaire
- **[Lucide React](https://lucide.dev/)** - Collection d'icônes
- **[Framer Motion](https://www.framer.com/motion/)** - Bibliothèque d'animations

## 📖 Guide d'utilisation

### Encoder un mot de passe

1. 📂 Sélectionnez une image depuis votre ordinateur
2. 🔑 Entrez le mot de passe que vous souhaitez cacher
3. 💾 Cliquez sur "Encoder" pour créer l'image avec le mot de passe caché
4. 📥 Enregistrez l'image encodée à l'emplacement de votre choix

### Décoder un mot de passe

1. 📂 Sélectionnez une image précédemment encodée
2. 🔍 Cliquez sur "Décoder" pour révéler le mot de passe caché
3. 📋 Utilisez le bouton de copie pour copier le mot de passe dans le presse-papiers

## ⚙️ Configuration

Accédez aux paramètres de l'application pour personnaliser :

- 🌓 Thème de l'interface (clair, sombre, ou automatique)
- 🔒 Niveau de chiffrement
- ✂️ Options de nettoyage automatique du presse-papiers
- 📝 Format d'image par défaut

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. 🍴 Forker le projet
2. 🔄 Créer une nouvelle branche (`git checkout -b fonctionnalite/amazante`)
3. 💾 Commiter vos changements (`git commit -m 'Ajout d'une fonctionnalité amazante'`)
4. 📤 Pousser vers la branche (`git push origin fonctionnalite/amazante`)
5. 🔍 Ouvrir une Pull Request

---

Créé avec ❤️ par [Dilgo-dev](https://github.com/Dilgo-dev)