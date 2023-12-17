# RailRoad
Projet d'école en 3 ème année

## Auteur

-Paul Afchain

-Flavien Day

## Installation

- Vous devez intaller npm (https://www.npmjs.com/package/npm)

- Dézipper le projet sur l'IDE que vous souhaitez

- Maintenant sur le terminal, faites la commande : 

```
npm run dev
```

Par défaut le premier compte est un User, pour changer un utilisateur est le mettre en Admin, il faudra vous connecter à mongodb compass puis vous connectez avec ce lien : 

```
mongodb+srv://Admin:1234@projectrailroad.jqxb6pg.mongodb.net/
```

Quand vous êtes connecté, aller dans la base de données "Test" puis dans la collection user et sélectionner votre l'utilisateur a modifié et changer son rôle par "Admin".

## Test

Pour lancer les test, il suffit de faire la commande suivante :

```
npm exec vitest
```

## Documentation

Pour la documentation, voici le lien que vous devrez mettre dans votre navigateur une fois le code lancer :

[Lien de la documentation ](http://localhost:3000/api-docs)