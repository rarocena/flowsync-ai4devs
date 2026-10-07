# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Este es el ejemplo. Bórralo.

El prompt va aquí dentro, entero y con sus saltos de línea,
para que se sepa dónde empieza y dónde acaba.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.



## Prompt 1

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Este es el ejemplo. Bórralo.

El prompt va aquí dentro, entero y con sus saltos de línea,
para que se sepa dónde empieza y dónde acaba.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.



## Prompt 1

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

Objetivo: Explorar y planificar

```
Actúa como desarrollador responsable de migrar el motor de base de datos de este proyecto y de demostrar con evidencia que la migración cumple las restricciones.

Fuente de verdad: CLAUDE.md, el Makefile, la configuración de base de datos del backend, los ficheros .env de ejemplo y backend/database/migrations. Léelos antes de proponer nada.

Objetivo, según el enunciado: migrar el proyecto de SQLite a PostgreSQL corriendo en Docker, con dos bases de datos: una de desarrollo y otra de pruebas.

Restricciones del enunciado, copiadas literalmente. Son la fuente de verdad y no son negociables:

"""
- El fichero de Compose se llama compose.yaml y los dos servicios se llaman db y db-test.
- La imagen es pgvector/pgvector:pg17. Es la imagen oficial de PostgreSQL con la extensión de vectores ya dentro.
- Los puertos son 54410 para desarrollo y 54411 para pruebas. No el 5432: quien tenga un PostgreSQL suyo levantado se lo encontraría ocupado, y el error que vería no menciona a Docker por ningún lado.
- La base de pruebas va en memoria, sin volumen. Es efímera a propósito: una batería de pruebas que depende de lo que dejó la anterior no es una batería de pruebas.
- Los dos servicios llevan comprobación de salud, y el arranque espera a que estén sanos. La propia imagen avisa de que, la primera vez, crea la base y no acepta conexiones mientras tanto, y de que eso rompe a quien levanta varios contenedores a la vez.
- Sin la clave version: en el fichero de Compose: está obsoleta y Docker imprime un aviso.
- La batería de pruebas apunta a la otra base por su propio fichero de entorno, que el framework carga solo cuando el entorno es de pruebas.
- Y deja atajos en el Makefile para levantar las bases, pararlas, migrar las dos y correr las pruebas.
- Ninguna migración existente se toca.
"""

En este paso NO modifiques archivos. Entrégame:
- Cada restricción convertida en un requisito verificable, con la comprobación observable que usarás para demostrarlo.
- Las restricciones que admitan más de una interpretación (por ejemplo, qué significa "el arranque"), con las opciones que ves. No elijas tú: pregúntame.
- La lista de archivos que piensas crear o modificar, con el motivo de cada uno.
- Los puntos de la configuración actual que dependen de SQLite (driver, rutas de fichero, comportamientos propios de SQLite) que podrían cambiar de comportamiento en PostgreSQL. Solo listarlos, sin corregirlos.
- Cualquier contradicción o falta de información indispensable. Para decisiones menores, usa tu criterio y justifícalo en una línea.

```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

Como resultado el agente generó un plan donde para queada requisito definió una forma de comprobarlo. Además me realizó 4 preguntas sobre los puntos que le generaron dudas.



## Prompt 2

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code
Objetivo: Ejecutar el plan devuelto en el prompt anterior con algunas restricciones extra.

```
Plan aprobado. Impleméntalo.

Límites:
- Modifica solo los archivos del plan.
- No toques backend/database/migrations. "No tocar" significa no editar, renombrar ni borrar sus archivos. Ejecutarlas contra db y db-test sí es parte de la tarea.
- No edites a mano backend/database/schema.ts. Si se regenera, déjalo como quede.
- Si el typecheck falla, NO lo corrijas: solo informa del resultado. Lo analizaré aparte.

Criterios de aceptación. Verifica cada uno ejecutando el comando y muestra la salida real:
1. git diff --stat upstream/s10/start -- backend/database/migrations está vacío.
2. docker compose config muestra db y db-test con pgvector/pgvector:pg17, puertos 54410 y 54411, healthcheck en los dos, sin volumen en db-test y sin version:.
3. Prueba en frío: bajar las bases, subirlas con el atajo de make y migrar las dos sin errores de conexión rechazada.
4. La suite del backend pasa con el atajo de make y corre contra db-test (puerto 54411). Demuéstralo con una evidencia concreta, no solo con el verde.
5. Si corres la suite dos veces seguidas, las dos pasan y la segunda no hereda datos de la primera.
6. make help lista los atajos nuevos.

Formato de entrega:
- Resumen de cambios por archivo.
- Una tabla con estas columnas: criterio | resultado esperado | resultado observado | evidencia (comando + salida relevante).
- Lo que no pudiste comprobar, marcado como PENDIENTE.
- Cualquier cosa que hayas notado y que la suite no detectaría, aunque no la hayas corregido.
```


## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code
Objetivo: Entender por qué no cambio schema.ts

```
por qué no cambió el schema.ts?
```

## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code
Objetivo: Saber si hay casos de prueba para la fecha de vencimiento

```
Qué casos de prueba hay definidos?
```
