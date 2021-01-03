
## Frontend TeamSpeak 3 

Sitio Web desarrollado en ReactJS para administrar y gestionar cuentas de usuarios e información de los canales del servidor. Con esta aplicación se puede manejar la creación, edición y eliminación de canales de forma remota contando con un usuario autorizado para esto.

### Requisitos

Para instalar manualmente esta aplicación, su computador debe contar con lo siguiente:

	- NodeJS v12.19
	- NPM v6.14

### Configuraciones

Para realizar peticiones a la *API*, primero se deben configurar los parámetros de conexión, modificando en el archivo `src/services/ConfigService.js` el siguiente campo:
```
    apiurl: 'path/to/api/index.php'
```
### Instalación de dependencias

Para poder ejecutar un ambiente de desarrollo o bien generar y ejecutar un ambiente de producción, debe contar con las dependencias y paquetes NPM instalados en el directorio. Para esto debe ejecutar el siguiente comando dentro de la carpeta `teamspeak-frontend`

```
    npm install
```

### Ejecución

Para ejecutar la aplicación en una ambiente de desarrollo, utilice el siguiente comando:

```  
    npm start
```



