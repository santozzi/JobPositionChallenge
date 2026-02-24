# Challenge


* Eventualmente haria que el .env esté dentro del .gitignore.
* Me centré en el funcionamiento de la app y no en detalles.
* Me aferré al enunciado, no agrego pantallas extras como podría ser cambiar a una pantalla de postulado o error de postulacion una vez hecho el click en Submit.
* Utilicé Typescript para darle más estructura, no quice agregar mucho más para no complicarlo tanto, por ejemplo una interface con los métodos de los servicios los cuales habria hecho con una clase.
* Originalmente habia puesto a PostulationViewer dentro de la parpeta de PostulacionContainer, pero me resultó algo incomodo, asi que hice una carpeta llamada Postulaciones y dentro puse los dos componentes, el Container y el Viewer. 
* Instalé la libreria sweet alert2 para que les sea más facil ver los errores que capturé.

## Capa de servicios

### Funciones

```typescript
 obtenerDatosDeCandidato(email: string): Promise<Candidato>
 obtenerPostulacionesDisponibles(): Promise<Postulacion[]>
 enviarPostulacion(apply: Apply): Promise<boolean>
 ```
#### Errores manejados
* obtenerDatosDeCandidato(email: string): Promise<Candidato>:
    * Falta el email del candidato
    * Formato de email incorrecto
    (Esos dos los valido en PostulationViewer pero de esta forma desacoplo)
    * No se encontró un candidato con ese email
    * Y por los que no haya visto: "Error inesperado"

* obtenerPostulacionesDisponibles(): Promise<Postulacion[]>:
    * No se me ocurrieron muchos errores que pueda tener esta función, agrege un "Error con el servidor, intente más tarde" en el caso de que el servidor esté apagado o reiniciando.
    * Error inesperado:  en el caso de que tenga algun otro error que no haya visto.
    * Este no es un error persé, pero en algunos lugares lo he visto asi. "No se encontraron posiciones abiertas", Por ahí hubiera sido mejor ponerlo en el container, si las posiciones están vacias mostrar un cartel, no hay posiciones y no usar el sistema de errores para la algoritmia.

* enviarPostulacion(apply: Apply): Promise<boolean>:
    * Solicitud incorrecta, error interno: este error sucede cuantod se envia mal el payload, el cual llamé apply, si le falta un dato tira el error 400, le puse error interno porque el usuario no tiene por qué saber que pasó.
    * Error inesperado:  en el caso de que tenga algun otro error que no haya visto.

#### Errores personalizados
Los hice para demostrar que los sé usar mas que nada y son:
*  EmptyOpenPositionListException: para cuando la lista de postulantes está vacia.
* NotFoundCandidateException: Para cuando el email del candidato no existe.
