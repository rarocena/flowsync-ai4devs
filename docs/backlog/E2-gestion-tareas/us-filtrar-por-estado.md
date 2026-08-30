# Filtrar tareas por estado

**Identificador:** FS-142

**Historia:** Como miembro del equipo, quiero filtrar la lista de tareas por su estado, para centrarme en lo que sigue pendiente sin distraerme con lo que ya está resuelto.

## Criterios de aceptación

**1. Camino feliz — filtrar por un estado con resultados**
DADO que hay tareas con distintos estados en el espacio compartido
CUANDO filtro la lista por un estado concreto
ENTONCES veo únicamente las tareas que están en ese estado, y ninguna de las demás.

**2. Camino feliz — quitar el filtro**
DADO que tengo la lista filtrada por un estado
CUANDO quito el filtro
ENTONCES vuelvo a ver todas las tareas del espacio compartido, sin importar su estado.

**3. Edge — estado válido, cero tareas**
DADO que ningún miembro del equipo tiene tareas en un estado concreto
CUANDO filtro la lista por ese estado
ENTONCES veo la lista vacía junto con un aviso de que no hay tareas en ese estado — distinto del caso de error del criterio 5.

**4. Edge — espacio sin ninguna tarea todavía**
DADO que el espacio compartido no tiene ninguna tarea creada todavía
CUANDO intento filtrar la lista por cualquier estado
ENTONCES veo un aviso de que todavía no hay tareas, distinto del mensaje del criterio 3.

**5. Error — se pide un estado que no existe**
DADO que estoy filtrando la lista de tareas
CUANDO solicito un estado que no es uno de los estados válidos del sistema
ENTONCES el sistema me avisa explícitamente de que ese estado no existe, y no me muestra una lista vacía como si simplemente no hubiera tareas en ese estado.
*Nota: para que esto sea verificable hace falta que el conjunto de estados válidos esté definido (ver `docs/prd/flowsync-mvp.md`, Puntos abiertos, punto 3).*

**6. Edge — el filtro sigue activo cuando algo deja de encajar**
DADO que tengo la lista filtrada por un estado concreto
CUANDO una tarea que estaba dentro del filtro cambia a un estado distinto (por mí o por otra persona)
ENTONCES esa tarea deja de aparecer en la lista filtrada.
*Nota: la rapidez con la que desaparece depende de si "tiempo real" en esta app significa frescura al cargar o sincronización en vivo — decisión todavía sin cerrar (ver `docs/prd/flowsync-mvp.md`, Puntos abiertos, punto 2).*
