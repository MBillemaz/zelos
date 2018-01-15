# zelos

Billemaz Maxime
Buathier Thibault
Jalabert Adrien

## Premier démarrage

Lancez 'nmp install' puis 'node index.js'.
Vous avez besoin d'une base de donnée mongodb nommé "projet", sur le port 27017.

## Utilisation de l'api

* localhost:3000/ (GET) -> retourne des informations sur le serveur (le numéro de version)

### Recherche

Pour toutes les recherches, vous pouvez définir un 'offset' et un 'limit'.
Par défaut, l'offset est réglé sur 0, et la limite sur 10.

* localhost:3000/search/users -> (GET) retourne les utilisateurs enregistrés en base de donnée.
Vous pouvez rajouter un offset et un limit. Par exemple :
'localhost:3000/search/users?offset=1&limit=2' retourne 2 utilisateurs, à partir du deuxième (le premier n'est pas affiché).

* localhost:3000/search/groups -> (GET) retourne les groupes enregistrés en base de donnée.

### User

* localhost:3000/user/:id -> (GET) permet de récupérer l'utilisateur via son id.
* localhost:3000/user/:id -> (PATCH) permet de modifier un ou des attributs d'un utilisateur via son id.
* localhost:3000/user/:id -> (DELETE) permet de supprimer (désactiver) un utilisateur de la base de donnée, via son id.
* localhost:3000/user -> (POST) permet de créer un utilisateur. Exemple de requête à envoyer pour la création d'un utilisateur :

'''header: Content-Type: application/json
body:

{
  "name": "username",
  "first_name": "userfirstname",
  "birth_date": 1515493872,
  "login": "userlogin",
  "password": "userpassword"
}'''

### Group

* localhost:3000/group/:id -> (GET) permet de récupérer un groupe via son id.
* localhost:3000/group/:id -> (PATCH) permet de modifier un ou des attributs d'un groupe via son id.
* localhost:3000/group/:id -> (DELETE) permet de supprimer (désactiver) un groupe de la base de donnée, via son id.
* localhost:3000/group -> (POST) permet de créer un groupe.

### Authentification

Dans cette api, il n'y a pas véritablement de système d'authentification (avec jwt par exemple).
Cependant, vous pouvez vérifier un combo login / mot de passe.

* localhost:3000/authenticate -> (POST) permet de vérifier que le combo login / mot de passe est bon. Exemple de requête à envoyer :
'''header: Content-Type: application/json
body:
{
  "login": "userlogin",
  "password": "userpassword"
}
'''
