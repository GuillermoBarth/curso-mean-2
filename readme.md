Agregar funcionalidad para "buscar"
    1- Se creó un nuevo controller en el api, llamada 'controllers/search.js' con sus respectivas funciones para buscar por albums, artistas y canciones.
    2- Se creó nuevas rutas para las funciones de buscar en 'routes/search.js'
    3- Se creó un nuevo componente 'component/search.component.ts'
    4- Se creó un nuevo servicio 'services/search.service.ts'
    5- Se creó una nueva vista 'views/search.html'
    6- En la vista “views/search.ts” se encuentra en campo imput llamado “filterSearch”, el cual se envía como parámetro a la búsqueda.


Agregar la funcionalidad “Albums”
    1- Se agregó una función en 'controllers/albums' de albums en la api 'getAlbumsList();'.
    2- Se agregó la ruta en 'routes/album'.
    3- Se creó un nuevo componente "albums-list.component.ts" el cual utiliza los servicios de           'album.service.ts' y 'song.service.ts'.
    4- Se agregó una nueva vista "album-list.html".


Agregar un campo “Género” para los artistas
    1- Agregar campo "gender" en 'api/models/artist.js'.
    2- En la función "saveArtist()" en 'api/controllers/artist.js' se debe agregar el parámetro          "gender", "artist.gender = params.gender;".
    3- Agregar campo "gender" en 'client/models/artist.ts'.
    4- Agregar el campo en 'views/artist-add.html' para poder editar el campo "gender".
    5- Se creó una función "onGenderList()" en "albums-list.component.ts" y                              "artist-list.component.ts".
    6- Se agregó un tag select que mediante el evento click invoca la función "onGenderList()" para      filtrar los albums y artistas mediante directivas "ngIf" ubicados en el listado de los mismo      en "album-list.html" y "artist-list.html".
