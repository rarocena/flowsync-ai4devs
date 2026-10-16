# Hallazgos


## 1. Cuántos de tus casos nuevos fallaron y cuántos de los que ya había siguieron en verde, con la cifra que te dio la pantalla.

make test-e2e dio Tests 44 passed, 3 failed (47): de mis 7 casos nuevos fallaron 3 y pasaron 4, y los 40 que ya había siguieron en verde.


## 2. Cuál de tus casos nuevos PASÓ, si alguno pasó, y por qué crees que pasó. Es la pregunta más interesante del ejercicio, y la respuesta no está en ningún sitio: se deduce mirando qué tienen en común los que fallaron.

Casos funcionales que pasaron:
- Vencer hoy todavía no es estar vencida
- Fecha futura
- Sin fecha no se vence nunca
- Una tarea hecha con la fecha pasada


Casos funcionales que no pasaron:
En la salida de la ejecución de los test se puede ver lo siguiente:
- Fecha del día anterior
    - Al consultar si está vencida para la fecha de referencia, devuelve falso. 
	- Debe existir una tarea con fecha de vencimiento anterior a la fecha de referencia
- Darla por hecha la deja de vencer
	- Falla en PRECONDICIÓN (no es el THEN): antes del cambio la tarea tendría que llegar vencida
- Aplazar resuelve el vencimiento
	- Falla en PRECONDICIÓN (no es el THEN): antes del cambio la tarea tendría que llegar vencida

Los 4 casos que pasaron, esperaban que al consultar la isOverdue estuviera false.

Los 3 casos que fallaron esparaban que al consultar la tarea en juego isOverdue se devolviera en true (la tarea está vencida).


La conclusión: isOverdue nunca sale true, así que los 4 que pasaron lo hacen porque esperan el valor que sale siempre, no porque la regla esté bien. Una implementación que devolviera siempre false los pasaría igual.


## 3. **De qué dudaste**, o qué no pudiste comprobar.

No puedo saber si «Una tarea hecha con la fecha pasada» pasa porque la regla mira el estado done o solo porque isOverdue nunca sale true. Mientras ningún caso dé true, ese verde no distingue una cosa de la otra.

Los THEN de «Darla por hecha» y «Aplazar» no se llegaron a ejecutar, porque los dos caen en la precondición: no sé si esos dos comportamientos funcionan.
