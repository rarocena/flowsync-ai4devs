# Alcance MVP — FlowSync

Estado: consensuado en conversación de producto, pendiente de convertir en PRD.

## 1. Problema

Un equipo remoto pierde tiempo y coordinación por falta de visibilidad de estado, no por falta de comunicación en general. Dos síntomas concretos y medibles:

1. La ronda de "¿en qué estás?" se come la mitad de los 15 minutos de la daily.
2. Sin esa visibilidad, dos personas pueden empezar a tocar lo mismo sin saberlo (episodio real: dos días perdidos por trabajo duplicado).

No es "los equipos remotos no se comunican bien" en abstracto — es que hoy la única forma de saber el estado del equipo es interrumpir a alguien o esperar a una reunión.

## 2. Usuarios

Equipos remotos pequeños (3–10 personas), roles planos, sin reporte jerárquico hacia un manager — a nadie por encima le importa este estado, el valor es entre pares.

Caso de estudio de referencia (no cliente validado, se declara así a propósito): equipo de 6 personas de producto SaaS, en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada.

## 3. Propuesta de valor

Una lista de tareas compartida donde el estado se ve al abrirla, no se pregunta. A cambio de teclear su propio estado en dos clics, cada persona deja de recibir interrupciones y gana una cola de trabajo propia para decidir qué coger a continuación.

Éxito para el usuario: dejar de hacer la ronda de "¿en qué estás?" de la daily porque el estado del equipo se ve de un vistazo. Criterio a una semana de uso real: el equipo cancela esa ronda y nadie pide que vuelva.

## 4. Alcance (IN)

Vertical fina, de punta a punta:

- Un espacio único compartido para todo el equipo (todos ven y editan todo, sin jerarquía de permisos).
- Crear una tarea con: título, responsable, estado, fecha de vencimiento.
- Cambiar el estado de cualquier tarea en dos clics.
- Ver la lista completa y filtrarla por estado.
- Reutiliza el login/signup ya existente en el repo — sin trabajo de producto nuevo ahí.

Regla: si se puede hacer con esas cinco acciones, es MVP; si necesita algo más, es v2.

## 5. NO-alcance (OUT)

| Fuera | Por qué se corta |
|---|---|
| Entidad "equipo" / multi-equipo / permisos | El caso de estudio es un único equipo. Añadir jerarquía de acceso apuesta por una necesidad no pedida y es la complejidad que impediría una vertical fina. |
| Presencia ("quién está conectado ahora") | Rechazado explícitamente como vigilancia, no como recorte técnico. Añadirlo traicionaría la premisa del producto. |
| Notificaciones / push / avisos de vencimiento | El producto es "resumen que espera", no "aviso que interrumpe". Push reintroduciría la interrupción que se quiere eliminar. |
| Derivar estado de Git/CI/calendario | Es otro producto (integraciones y OAuth de terceros) y debilita la señal: el valor está en que la persona declare su estado, no en que se infiera. |
| Sprints, estimaciones, épicas, backlog priorizado, informes | Es lo que "menos rollo que Jira" dijo rechazar. Un equipo que lo necesite no es el usuario de este MVP. |
| Comentarios / hilos por tarea | En cuanto hay conversación dentro de la tarea, FlowSync compite con Slack en vez de sustituir la pregunta "¿en qué estás?". El problema es visibilidad, no comunicación. |
| Subtareas / dependencias entre tareas | El dolor es "no sé qué toca alguien", no "no sé en qué orden van las tareas". |
| Historial, archivado, búsqueda, reportes de productividad | Resuelve "qué se hizo la semana pasada", que es reporting hacia arriba — y el problema descarta que exista alguien arriba que lo pida. |
| App móvil / nativa | El equipo mira el estado al llegar o al volver de una reunión, ya frente al ordenador. Una segunda plataforma duplica trabajo sin cambiar ese momento de uso. |

Regla de corte usada: si una función existe para informar hacia arriba, para conversar, para planificar a futuro, o para vigilar actividad, queda fuera, sin importar cuán barata sea de construir. El MVP solo existe para que una persona sepa, sin preguntar, qué toca la otra ahora mismo.
