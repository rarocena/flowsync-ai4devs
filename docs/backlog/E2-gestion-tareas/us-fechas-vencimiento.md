# Fecha de vencimiento y tareas vencidas

**Identificador:** FS-118

**Historia:** Como miembro del equipo, quiero indicar la fecha de vencimiento de una tarea al crearla y ver de un vistazo cuáles ya están vencidas, para priorizar sin perder de vista lo que se pasó de plazo.

## Criterios de aceptación

**1. Camino feliz — crear con fecha futura**
DADO que estoy creando una tarea
CUANDO le asigno una fecha de vencimiento futura
ENTONCES la tarea queda creada mostrando esa fecha, y no aparece marcada como vencida.

**2. Camino feliz — crear sin fecha**
DADO que estoy creando una tarea
CUANDO no le asigno ninguna fecha de vencimiento
ENTONCES la tarea queda creada sin fecha, y nunca aparece marcada como vencida mientras no tenga una.

**3. Camino feliz — se ve qué está vencido**
DADO que una tarea tiene una fecha de vencimiento anterior a hoy
CUANDO cualquier miembro del equipo consulta la lista de tareas
ENTONCES esa tarea se distingue visualmente de las demás como vencida, sin que nadie tenga que calcularlo a mano.

**4. Edge — vence hoy mismo**
DADO que una tarea tiene la fecha de vencimiento igual a la fecha de hoy
CUANDO se consulta la lista de tareas
ENTONCES la tarea NO se marca todavía como vencida — se considera vencida a partir del día siguiente.

**5. Edge — vencida pero ya terminada**
DADO que una tarea tiene una fecha de vencimiento anterior a hoy y su trabajo ya está terminado
CUANDO se consulta la lista de tareas
ENTONCES esa tarea deja de mostrarse como vencida, aunque su fecha haya pasado.
*Nota: depende de que exista un estado tipo "terminada", algo que el PRD todavía no enumera (ver `docs/prd/flowsync-mvp.md`, Puntos abiertos, punto 3). No implementable tal cual hasta que esa decisión exista.*

**6. Edge — crear una tarea con fecha ya pasada**
DADO que estoy creando una tarea nueva
CUANDO le asigno una fecha de vencimiento anterior a hoy
ENTONCES el sistema la crea igualmente, y aparece marcada como vencida desde el momento de crearla.

**7. Edge — sin aviso activo por vencer**
DADO que una tarea acaba de pasar su fecha de vencimiento
CUANDO eso ocurre
ENTONCES nadie recibe ningún aviso activo — ni notificación, ni email, ni mensaje. La única forma de enterarse es mirando la lista.

**8. Error — fecha inválida al crear**
DADO que estoy creando una tarea
CUANDO intento ponerle una fecha de vencimiento que no es una fecha real
ENTONCES el sistema no la acepta y me deja corregirla antes de guardar, sin que pierda el resto de datos que ya había rellenado.
