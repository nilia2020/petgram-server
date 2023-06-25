# Proyecto petgram-api - Jorge Niglia

### Rutas:

Create (POST)

- `/api/user/signup` Crear un usuario nuevo
- `/api/categories/new` Agregar una categoria
- `/api/photos/new` Agregar una foto

Read (GET)

- `/` Carga archivo html estático.
- `/api/user/seeusers` Ver todos los usuarios
- `/api/user/seeusers/:id` Ver usuario por ID
- `/api/categories/seeall` Ver todas las categorias
- `/api/categories/see/:id` Ver categoria por ID
- `/api/photos/seeall` Ver todas las fotos
- `/api/photos/see/:id` Ver fotos por ID

Update (PUT)

- `/api/user/editpassword/:id` editar contraseña
- `/api/categories/edit/:id` editar categoria
- `/api/photos/edit/:id` editar foto

Delete (DELETE)

- `/api/deleteuser/:id` eliminar usuario
- `/api/categories/delete/:id` eliminar categoria
- `/api/photos/delete/:id` eliminar foto
