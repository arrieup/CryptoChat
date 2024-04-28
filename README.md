# CryptoChat - Plateforme de messagerie sécurisée

## Description
CryptoChat est une application de messagerie instantanée sécurisée développée dans le cadre d'un projet d'école d'ingénierie informatique. Elle permet aux utilisateurs de créer des canaux de discussion sécurisés où les messages sont cryptés côté serveur.

## Technologies utilisées
- **Backend**: Python avec le framework Flask pour la gestion des routes et la logique serveur.
- **Authentification et Stockage**: Utilisation de Firebase Realtime Database via Pyrebase pour gérer l'authentification des utilisateurs et le stockage des données.
- **Frontend**: Angular, un framework moderne pour construire des interfaces utilisateur dynamiques.
- **Cryptographie**: Cryptage des messages côté serveur pour assurer la confidentialité et l'intégrité des communications.

## Installation

### Prérequis
Avant de démarrer l'installation, assurez-vous que Python et Node.js sont installés sur votre machine. Vous aurez également besoin de npm pour gérer les paquets Node.js.

## Installation des dépendances
Pour installer les dépendances nécessaires, exécutez les commandes suivantes :

### Installer les dépendances Python
pip install -r requirements.txt

### Installer les dépendances Angular
cd frontend  # Remplacer par le chemin de votre répertoire frontend
npm install


## Démarrage de l'application

### Serveur Backend Flask
Pour démarrer le serveur backend, exécutez :
python run.py

### Application Angular
Pour lancer l'interface utilisateur :
ng serve
 
Accédez ensuite à http://localhost:4200 dans votre navigateur pour utiliser l'application.


# Fonctionnement de l'application

## Sécurité
Les messages sont cryptés côté serveur avant d'être stockés dans Firebase

## Structure du projet

# Le projet est structuré comme suit :

backend/ : Contient le code Flask, les modèles et les services.
frontend/ : Contient les fichiers Angular pour l'interface utilisateur.
models/ : Définitions des modèles de données pour les utilisateurs et les messages.

## Points clés du code
# Modèle utilisateur

Chaque utilisateur est représenté par une instance de la classe User, qui stocke le nom d'utilisateur, l'email et le mot de passe crypté.
