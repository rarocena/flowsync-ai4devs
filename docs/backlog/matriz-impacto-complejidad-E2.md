# Matriz impacto vs complejidad — E2 "Gestión de tareas" (+ sync en tiempo real de E3)

Incluye las historias de E2 dentro del MVP, las que quedaron fuera de alcance, y el tema de sincronización en tiempo real de E3 (la lectura "fuerte" de RF-17), para poder comparar todo el conjunto de una vez.

| Historia / tema | Impacto | Complejidad | Cuadrante | Por qué |
|---|---|---|---|---|
| **Crear tarea (título + responsable)** — RF-6, sin ID todavía | Alto | Baja | ⭐ Quick win | Es la base sin la que nada más existe; mismo patrón CRUD que ya usa el auth del repo. |
| **Cambiar estado en pocos pasos** — RF-9+RF-10, sin ID todavía | Alto | Baja-media | ⭐ Quick win | Es el corazón del loop central del producto ("ver sin preguntar"); técnicamente sencillo, sin bloqueos externos críticos. |
| **FS-142 (filtrar por estado)** — solo tickets 142.1/142.3 | Alto | Baja | ⭐ Quick win | Convierte "ver todo" en "centrarme en lo pendiente"; los tickets del camino feliz son S y sin bloqueo. |
| **Estado inicial automático** — RF-8, sin ID todavía | Bajo | Baja | Relleno | Necesario pero invisible para el usuario; se hace de paso junto a "crear tarea". |
| **FS-118 (fecha de vencimiento + vencidas)** | Medio | Media | Núcleo intermedio | Aporta valor real ("priorizar sin perder el plazo") pero no es el loop central; 7 tickets, uno bloqueado. |
| **FS-142 (validar estado inexistente)** — tickets 142.2/142.4/142.5 | Medio (parte del mismo FS-142) | Media-alta *(incierta)* | Núcleo intermedio, bloqueado | Depende de dos Puntos abiertos del PRD (#2 y #3); no se puede tallar con confianza todavía. |
| **Editar título de tarea ya creada** — fuera de alcance MVP | Bajo | Baja | Relleno | Corrige errores de tipeo; no mueve la métrica de éxito del piloto. |
| **Editar fecha de vencimiento después de creada** — fuera de alcance MVP | Bajo-medio | Baja | Relleno | Útil si el plan cambia, pero no es lo que el piloto necesita validar. |
| **Reasignar responsable de una tarea** — fuera de alcance MVP | Bajo (y potencialmente negativo) | Baja de construir / alta de decidir | Descartar | Tensiona con la premisa "cada quien declara su propio estado" (Puntos abiertos, punto 7 del PRD); no está claro que sume. |
| **Sync en tiempo real (lectura fuerte de RF-17, E3)** | Bajo-medio | **Alta** | 🚫 Trampa | Es la única pieza de todo este conjunto que exigiría infraestructura nueva (websockets/polling), justo lo que la sección 8 del PRD prohíbe. El PRD ya define que la frescura al cargar basta para cumplir la propuesta de valor — construir esto es apostar caro por un valor incremental no validado. |

No hay ningún ítem en el cuadrante "alto impacto / alta complejidad" (gran apuesta) en este conjunto — el MVP, tal como está definido, no necesita ninguna pieza cara para funcionar.

## Orden de backlog propuesto

1. **Crear tarea (RF-6)** + **Estado inicial automático (RF-8)** — se construyen juntas, es la base de todo.
2. **Cambiar estado en pocos pasos (RF-9+RF-10)** — el otro pilar del loop central.
3. **FS-142, camino feliz (142.1 + 142.3)** — quick win, ya usable con lo mínimo.
4. **FS-118 completo**, dejando FS-118.3 aparcado — valor medio, se apoya en todo lo anterior.
5. **FS-142.2 + FS-142.4** y **FS-118.3** — en cuanto se resuelva el Punto abierto #3 (estados enumerados), se insertan aquí sin reordenar el resto.
6. **FS-142.5** — en cuanto se resuelva el Punto abierto #2 (qué significa "tiempo real").
7. **Fuera de alcance MVP** (editar título, editar fecha, reasignar responsable) — no entran al backlog del MVP; se reconsideran después del piloto, según lo que el equipo eche en falta de verdad, no antes.
8. **Sync en tiempo real de E3** — el último candidato de toda la lista, y solo si el piloto demuestra que la frescura al cargar no basta. No se agenda antes de eso.
