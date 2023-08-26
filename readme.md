# Week 6 - Challenge 5 (Back/Front)

API REST
Crea una API REST que se conecte a un fichero JSON para manipular. El JSON tendrá una sola propiedad de tipo array, donde almacenarán objetos que representarán cosas que hemos aprendido en el bootcamp.

La API REST debe tener los siguientes endpoints:

[GET] /things -> devuelve el array de cosas.

[GET] /things/:idThing -> devuelve una cosa.

[DELETE] /things/:idThing -> borra una cosa.

[POST] /things -> crea una cosa (la recibe en el body).

[PATCH] /things -> modifica una cosa (la recibe en el body).

Usamos express con las capas:

app
router
controller
repo
AÑADIMOS un front con REDUX y sus respectivos tests.

Lista de 'things'

Añadir 'thing'

Borrar 'thing'

Editar 'thing'
