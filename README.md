# Event Tracker

Mini API de suivi d'événements — Test technique

## Stack

- Backend : Python 3.12 / FastAPI
- Base de données : PostgreSQL 15
- Frontend : React + Vite
- Conteneurisation : Docker + docker-compose

## Lancer le projet

Prérequis : Docker Desktop installé et lancé

Copier le fichier d'environnement :

    cp .env.example .env

Lancer l'ensemble :

    docker compose up --build

L'application est disponible sur :

- Frontend : http://localhost:5173
- API : http://localhost:8000
- Documentation API (Swagger) : http://localhost:8000/docs

## Structure du projet

    backend/        API FastAPI (routes, modèles, schémas, accès DB)
    frontend/       Interface React (formulaire, liste, résumé)
    docker-compose.yml   Orchestration des 3 services
    .env.example    Variables d'environnement à copier dans .env

## Choix techniques

**SQLAlchemy** comme ORM : intégration naturelle avec FastAPI, gestion propre des sessions,
et `create_all` suffit pour ce périmètre sans avoir besoin d'un outil de migration complet.

**Pydantic** pour la validation : natif dans FastAPI, permet de séparer clairement les schémas
d'entrée/sortie des modèles de base de données.

**UUID** comme identifiant d'événement : non prédictible, adapté à un système distribué.

**Liste fermée de types** via enum Python : `login`, `transaction`, `report`. Toute valeur
invalide est rejetée automatiquement par FastAPI avant d'atteindre la base de données.

**Vite** pour le frontend : démarrage rapide, configuration minimale, standard actuel pour les
projets React.

## Ce qui marche

- POST /events — création d'un événement avec validation du type
- GET /events — liste avec filtres optionnels par user_id et par type
- GET /users/{user_id}/summary — résumé statistique par utilisateur
- GET /health — healthcheck de l'API
- Interface React avec formulaire de création, liste filtrée et résumé utilisateur
- Données persistantes via volume Docker (survivent au redémarrage)
- Un seul `docker compose up --build` lance tout

## Ce qui manque / ce que je ferais avec plus de temps

- Tests automatisés sur les routes API (pytest + httpx)
- Pagination sur GET /events
- Validation plus stricte du champ payload
- Gestion d'erreurs plus explicite côté frontend (messages d'erreur affichés à l'utilisateur)

## Usage de l'IA

J'ai utilisé Claude comme mentor technique tout au long du projet : explication des concepts
(CORS, volumes Docker, séparation schemas/models), débogage des erreurs rencontrées
(initialisation PostgreSQL, version Node.js), et relecture du code produit.
Le code a été écrit et compris étape par étape, pas généré