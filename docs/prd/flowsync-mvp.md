# PRD — FlowSync MVP

Fuente del alcance: [`alcance-mvp.md`](./alcance-mvp.md) (consensuado previamente). Este documento lo desarrolla en formato PRD; no cambia las decisiones ya tomadas allí.

## 1. Problema y contexto

Un equipo remoto pierde tiempo y coordinación por falta de visibilidad de estado, no por falta de comunicación en general. Dos síntomas concretos y medibles motivan este MVP:

1. La ronda de "¿en qué estás?" se come la mitad de los 15 minutos de la daily.
2. Sin esa visibilidad, dos personas pueden empezar a tocar lo mismo sin saberlo (episodio real que motivó este proyecto: dos días perdidos por trabajo duplicado).

Hoy la única forma de conocer el estado del equipo es interrumpir a alguien o esperar a una reunión síncrona. El contexto de partida en el repo: existe autenticación funcional (signup, login, logout, perfil) y ningún dominio de tareas todavía — este PRD cubre exactamente esa pieza que falta.

## 2. Usuarios y jobs-to-be-done

**Perfil:** equipos remotos pequeños (3–10 personas), roles planos, sin reporte jerárquico hacia un manager. El valor se cobra entre pares, no hacia arriba.

**Caso de estudio de referencia** [SUPUESTO: no es un cliente validado, es el escenario usado para razonar el alcance]: equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada.

**Jobs-to-be-done:**
- *Cuando* llego a trabajar o vuelvo de una reunión, *quiero* ver qué se ha movido en el equipo sin preguntar, *para* no interrumpir a nadie y no esperar a la próxima sync.
- *Cuando* voy a empezar algo nuevo, *quiero* saber qué está tocando cada compañero ahora mismo, *para* no duplicar trabajo que ya está en marcha.
- *Cuando* termino o cambio de tarea, *quiero* reflejar mi estado actual en segundos, *para* dejar de recibir la pregunta "¿cómo vas?" por chat.
- *Cuando* decido qué coger a continuación, *quiero* ver qué tareas siguen pendientes, *para* priorizar sin abrir otra herramienta.

> **Corrección (contradicción interna detectada en revisión):** la redacción original de este job prometía "ver mi propia cola de trabajo", es decir, un filtro por responsable. La sección 4 (Alcance) solo entrega filtrado por estado y define explícitamente que nada más allá de esas cinco acciones es MVP — un filtro por responsable no está incluido. Se corrige el job para no prometer una capacidad que el propio alcance del documento impide cumplir. Se declara así, sin añadir un requisito nuevo para taparlo: si hace falta un filtro por responsable, es una decisión pendiente (ver Puntos abiertos, punto 6).

## 3. Propuesta de valor

Una lista de tareas compartida donde el estado se ve al abrirla, no se pregunta. A cambio de teclear su propio estado en dos clics, cada persona deja de recibir interrupciones y gana una cola de trabajo propia para decidir qué coger a continuación.

## 4. Alcance / Fuera de alcance

### Dentro (vertical de punta a punta)
- Espacio único compartido para todo el equipo; todos ven y editan todo, sin jerarquía de permisos.
- Crear una tarea con título, responsable, estado y (opcional) fecha de vencimiento.
- Cambiar el estado de cualquier tarea en el mínimo de pasos posible (dos clics desde la lista).
- Ver la lista completa de tareas del equipo y filtrarla por estado.
- Reutilizar el login/signup ya existente — sin trabajo de producto nuevo en acceso.

### Fuera (y por qué)

| Fuera | Por qué se corta |
|---|---|
| Entidad "equipo" / multi-equipo / permisos | El caso de estudio es un único equipo; añadir jerarquía de acceso apuesta por una necesidad no pedida. |
| Presencia ("quién está conectado ahora") | Rechazado explícitamente como vigilancia, no como recorte técnico. |
| Notificaciones / push / avisos de vencimiento | El producto es "resumen que espera", no "aviso que interrumpe"; push reintroduciría la interrupción que se quiere eliminar. |
| Derivar estado de Git/CI/calendario | Es otro producto (integraciones y OAuth de terceros); debilita la señal porque el valor está en que la persona declare su estado. |
| Sprints, estimaciones, épicas, backlog priorizado, informes | Es justo el "rollo de Jira" que se rechazó. |
| Comentarios / hilos por tarea | FlowSync competiría con Slack en vez de sustituir la pregunta "¿en qué estás?". |
| Subtareas / dependencias entre tareas | El dolor es "no sé qué toca alguien", no "no sé en qué orden van las tareas". |
| Historial, archivado, búsqueda, reportes de productividad | Es reporting hacia arriba, y el problema descarta que exista alguien arriba que lo pida. |
| App móvil / nativa | El momento de uso es frente al ordenador (llegada, vuelta de reunión); una segunda plataforma no cambia eso. |

Detalle completo de justificación en [`alcance-mvp.md`](./alcance-mvp.md).

## 5. Épicas del MVP

- **E1 — Cuentas y acceso:** agrupa registro, login, logout y consulta del propio perfil (ya implementado en el repo).
- **E2 — Gestión de tareas:** agrupa crear una tarea y editar sus datos básicos, incluido su estado.
- **E3 — Actividad del equipo:** agrupa la vista compartida de todas las tareas del equipo y su filtrado por estado — donde se materializa la propuesta de valor de "ver sin preguntar".

## 6. Requisitos funcionales

*A nivel de producto — qué debe hacer el sistema, no cómo se implementa.*

**E1 — Cuentas y acceso**
- **RF-1.** El sistema debe permitir a una persona registrarse con nombre, email y contraseña.
- **RF-2.** El sistema debe permitir a una persona registrada autenticarse e iniciar sesión.
- **RF-3.** El sistema debe permitir a una persona autenticada cerrar sesión.
- **RF-4.** El sistema debe permitir a una persona autenticada consultar su propio perfil.
- **RF-5.** El sistema no debe permitir acceso al espacio de tareas a nadie sin sesión iniciada.

**E2 — Gestión de tareas**
- **RF-6.** El sistema debe permitir a cualquier usuario autenticado crear una tarea especificando título y responsable.
- **RF-7.** El sistema debe permitir asignar opcionalmente una fecha de vencimiento a una tarea, en el momento de crearla o después.
- **RF-8.** El sistema debe asignar automáticamente un estado inicial a toda tarea nueva, sin exigir que el usuario lo elija.
- **RF-9.** El sistema debe permitir a cualquier usuario autenticado cambiar el estado de cualquier tarea del espacio compartido, sea o no su responsable (roles planos, sin restricción de permisos).
- **RF-10.** El sistema debe permitir cambiar el estado de una tarea en un máximo de dos interacciones desde la lista, sin abrir un formulario completo.
- **RF-11.** El sistema debe permitir editar el título, el responsable y la fecha de vencimiento de una tarea ya creada [SUPUESTO: el alcance consensuado solo detalla explícitamente la edición rápida de estado; la edición del resto de campos se asume necesaria para que la gestión de tareas sea usable, pero no fue validada punto por punto].
- **RF-12.** El sistema no debe exigir campos adicionales a título, responsable, estado y fecha de vencimiento para crear o mantener una tarea.

**E3 — Actividad del equipo**
- **RF-13.** El sistema debe mostrar, a cualquier usuario autenticado, la lista completa de tareas del espacio compartido.
- **RF-14.** El sistema debe mostrar para cada tarea, como mínimo: título, responsable, estado y fecha de vencimiento (si tiene).
- **RF-15.** El sistema debe permitir filtrar la lista de tareas por estado.
- **RF-16.** El sistema debe permitir identificar visualmente, dentro de la propia lista, las tareas cuya fecha de vencimiento ya pasó.
- **RF-17.** El sistema debe reflejar un cambio de estado hecho por una persona en la vista de cualquier otra persona sin exigirle una acción manual de refresco al momento de consultar la lista.
- **RF-18.** El sistema no debe mostrar indicadores de presencia ni de actividad de los usuarios (quién está conectado, activo o inactivo).
- **RF-19.** El sistema no debe enviar notificaciones push, emails ni alertas activas sobre cambios de estado o vencimientos.

## 7. Requisitos no funcionales

- **RNF-1.** La interfaz debe ser usable por una persona sin formación previa ni onboarding guiado — coherente con "sin flujos de configuración ni campos obligatorios más allá de los definidos".
- **RNF-2.** El sistema debe estar disponible durante horario laboral para equipos distribuidos en distintos husos horarios [SUPUESTO: no se definió un SLA formal de disponibilidad].
- **RNF-3.** El sistema debe ser accesible desde un navegador de escritorio actual, sin instalación [SUPUESTO: no se validó explícitamente el conjunto de navegadores soportados ni soporte móvil vía navegador, dado que "app móvil / nativa" quedó fuera de alcance].
- **RNF-4.** El acceso al espacio de tareas debe requerir siempre sesión autenticada; no debe existir acceso anónimo ni enlaces públicos a tareas individuales.
- **RNF-5.** El sistema no necesita soportar operación offline ni sincronización posterior a la reconexión — el uso asumido es siempre en línea.
- **RNF-6.** El sistema no se diseña para escalar más allá de equipos de 3–10 personas por espacio en este MVP; no hay requisito de rendimiento bajo alta concurrencia.
- **RNF-7.** El idioma de la interfaz es español [SUPUESTO: no discutido explícitamente; se infiere del idioma de todas las conversaciones de producto].

## 8. Restricciones

- Backend existente: AdonisJS 7 + Lucid + SQLite. Frontend existente: React 19 + Vite. El MVP se construye sobre esta base, no sobre un stack nuevo.
- La autenticación (signup, login, logout, perfil) ya está implementada en el repo y no forma parte del trabajo de este PRD más que como dependencia a reutilizar (E1 documenta lo existente, no trabajo nuevo).
- Ninguna integración con servicios de terceros (OAuth externo, Git, CI, calendario, mensajería) — quedó fuera de alcance en la sección 4 y se mantiene como restricción de construcción.
- Sin infraestructura de notificaciones push ni servicios de mensajería externos, dado que RF-19 los excluye explícitamente.

## 9. Métricas de éxito

- **Métrica primaria (activación de la propuesta de valor):** al cierre de la primera semana de uso real, el equipo piloto deja de hacer la ronda de "¿en qué estás?" en la daily y nadie pide que vuelva. Medición: confirmación directa del equipo al final de la semana (sí/no) [SUPUESTO: medición cualitativa por no haber instrumentación de producto definida en este MVP].
- **Métrica de riesgo — frescura del estado:** número de veces, durante la semana de piloto, en que un miembro del equipo reporta que el estado visto en la lista no coincidía con la realidad. Es el riesgo #1 identificado para este producto; se observa cualitativamente, sin umbral numérico predefinido [SUPUESTO: sin mecanismo de medición automática en el MVP].
- **Métrica de colisión evitada:** ausencia de nuevos incidentes de "dos personas tocando lo mismo sin saberlo" durante el piloto, en contraste con el episodio que motivó el proyecto.
- **Condición de fallo, explícita:** si al final de la semana el equipo sigue haciendo la ronda de "¿en qué estás?" igual que antes, el MVP no funcionó, independientemente de cuánto se haya usado la lista de tareas.

## 10. Puntos abiertos

Hallazgos de la revisión adversarial que son decisiones de producto (qué se ve, con qué lente, cuánto riesgo se acepta) o defectos subsanables durante la construcción — no contradicciones del documento, así que no se resuelven aquí. Cada uno queda pendiente de decisión explícita antes o durante la construcción.

1. **Riesgo de frescura sin mitigación.** La propuesta de valor depende de que el estado se actualice en el momento del cambio, pero ningún RF/NFR empuja ni verifica que ocurra; si falla, el producto pierde sentido. Falta decidir: si el MVP incorpora algún refuerzo pasivo (p. ej., señalar tareas sin tocar hace días) o si se acepta el riesgo tal cual y se observa solo durante el piloto.

2. **Ambigüedad de "tiempo real" en RF-17.** "Sin exigir refresco manual al momento de consultar" admite dos lecturas: frescura al cargar la página, o sincronización en vivo con la página abierta. Solo la primera es compatible con las restricciones de la sección 8. Falta decidir: que producto elija explícitamente una de las dos lecturas antes de que se estime el trabajo de construcción.

3. **Estados de una tarea sin enumerar.** RF-8, RF-9, RF-10, RF-15 y RF-16 hablan de "el estado" sin definir sus valores posibles, lo que los deja no testeables tal cual. Falta decidir: el conjunto mínimo de estados (sigue siendo nivel de producto, no modelo de datos).

4. **JTBD de "evitar duplicar trabajo" sin RF ni métrica con dientes.** Es la mitad del problema original (el episodio de los dos días perdidos) pero ningún requisito ni métrica prueba si se resuelve de verdad. Falta decidir: si vale instrumentar u observar esto más directamente en el piloto, o aceptar que quede sin validar en esta primera vuelta.

5. **Métricas de éxito sin instrumentación real.** Las tres métricas de la sección 9 dependen de autorreporte cualitativo del equipo piloto; en particular, "colisión evitada" compara la ausencia de incidentes en una semana contra un único episodio histórico, lo cual no es una tasa medible. Falta decidir: aceptar explícitamente que la validación de este MVP es cualitativa, o definir qué instrumentación mínima haría falta para medir alguna de las tres de forma objetiva.

6. **¿Hace falta un filtro por responsable ("mis tareas")?** Surge de la corrección aplicada en la sección 2: el job original lo prometía, el alcance actual no lo entrega. Falta decidir: si esto se queda fuera del MVP (como está ahora) o si es lo bastante barato como para sumarlo sin romper la regla de las cinco acciones de la sección 4.

7. **RF-11 permite reasignar una tarea a otro responsable.** Nunca se discutió en la conversación de producto; el problema validado es que cada quien declare su propio estado, no que gestione el trabajo de otros. Falta decidir: si la reasignación es necesaria para el MVP o se recorta, dejando que solo el propio responsable cambie su tarea (lo cual reabriría también el punto de "roles planos, todos editan todo" del alcance).

8. **RNF-1 y RNF-2 no son falsables tal como están escritas.** "Usable sin formación previa" y "disponible en horario laboral" no tienen protocolo de prueba ni huso horario de referencia para un equipo repartido en tres. Falta decidir: un protocolo mínimo de test de usabilidad y una definición de horario de referencia, o aceptar que no aplica al no haber SLA formal.

9. **RF-10: "máximo dos interacciones" sin definir qué cuenta como interacción.** Es un umbral de UX razonable pero no auditable en QA tal como está redactado. Falta decidir: el patrón de interacción exacto (fuera del alcance de este PRD) y confirmar que dos pasos es el límite correcto.
