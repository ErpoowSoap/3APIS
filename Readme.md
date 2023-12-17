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
npm i
```
ceci installera les dépendances présentes dans le package.json

-puis lancez le projet avec : 
```
npm run dev
```

Par défaut le premier compte est un User, pour changer un utilisateur et le mettre en Admin, il faudra vous connecter à mongodb compass puis vous connecter avec ce lien : 

```
mongodb+srv://Admin:1234@projectrailroad.jqxb6pg.mongodb.net/
```

Quand vous êtes connecté, aller dans la base de donnée "Test" puis dans la collection user , sélectionner votre l'utilisateur a modifier et changez son rôle par "Admin".

## Test

Pour lancer les test, il suffit de faire la commande suivante :

```
npm exec vitest
```

## Documentation

Pour la documentation, voici le lien que vous devrez mettre dans votre navigateur une fois le code lancé :

[Lien de la documentation ](http://localhost:3000/api-docs)
