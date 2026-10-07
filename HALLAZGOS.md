# Parte B

1. **Corre la comprobación de tipos** (`(cd backend && npm run typecheck)`) y di si está en verde o en rojo. Las dos respuestas son normales, y las dos enseñan algo.

La comprobación dió verde.

2. **Mira el diff del fichero de tipos generado** (`backend/database/schema.ts`) entre la rama de partida y lo que tienes ahora. Puede salir con declaraciones cambiadas o **vacío**, y las dos salidas son normales. Si salen cambios, di qué declaraciones han cambiado de tipo y de qué a qué. Si sale vacío, busca **qué fija esos tipos** para que no cambien al cambiar de motor, porque vacío no quiere decir que no haya cambiado nada: quiere decir que lo que cambió no está en lo que el proyecto declara.

El diff está vacío porque database/schema_rules.ts fija status y due_date, y esa regla sigue conectada mediante rulesPaths.
 

3. **Busca cómo decide el proyecto si una tarea está vencida** y léelo con lo que encontraste en el punto anterior delante. Hay un comentario en ese código que explica por qué la comparación funciona. Di si ese comentario sigue siendo verdad, y compruébalo con una tarea que ya debería estar vencida, no leyéndolo.

Archivo task.ts, function  isOverdueOn.
No va a funcionar porque PostreSQL entrega Date. Y la comparación Date contra string da siempre falso.



# Hallazgos

Aquí van **las tres líneas** del ejercicio, una por cada punto de abajo. Es lo único que hay que
traer hecho: un cambio de motor a medias con estas tres líneas escritas vale más que lo contrario,
porque lo que se discute en el directo es dónde te chocaste.

Escribe **una sola línea por punto**, con tus palabras y con lo que mediste, no con lo que suponías.

## 1. Las filas que cambian y la rama

Cuántas filas cambian de valor en tu cambio de esquema, medido con una consulta, y en qué rama del
árbol de reversibilidad cae. Si tu migración no toca datos, dilo tal cual: también es una respuesta.

La migración no tocó datos.
-

## 2. Lo que la batería de pruebas no podía ver

Una cosa que la batería de pruebas no podía ver. Si no encontraste ninguna, escribe qué buscaste y dónde.

De tareas solo se prueba el responsable. No se comprueba el la regla de vencida.

-

## 3. Tu duda

De qué dudaste, o qué no pudiste comprobar.

Dudé de por qué no había cambiado el schema.ts pero entendí por qué.
-
