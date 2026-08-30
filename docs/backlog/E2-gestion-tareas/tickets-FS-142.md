# Tickets — Historia FS-142 (filtrar tareas por estado)

Cada ticket hereda los criterios de aceptación de FS-142 tal como están en [`us-filtrar-por-estado.md`](./us-filtrar-por-estado.md). El Definition of Done de cada ticket es checklist de entrega, no criterios nuevos. Esta historia no necesita ningún cambio de esquema (filtra sobre un campo que ya existe), así que no hay ticket de Migración/DB.

---

### FS-142.1 — Filtrar la lista de tareas por estado (camino feliz)
**Tipo:** Endpoint/API
**Cubre:** criterios 1, 2 y 4 de la historia.
**Dependencias:** ninguna dentro de esta historia. *Prerrequisito externo: el listado base de tareas (E3) y la creación de tareas con su estado (otra historia de E2) ya deben existir.*

**Definition of Done**
- Filtra la lista y devuelve solo las tareas que coinciden con el estado pedido.
- Quitar el filtro devuelve la lista completa, sin importar el estado.
- Si el espacio compartido no tiene ninguna tarea todavía, la respuesta lo señala de forma que el frontend pueda distinguirlo de "hay tareas pero ninguna coincide con el filtro".
- Cubierto por test automatizado de los tres escenarios: filtro con resultados, sin filtro, espacio totalmente vacío.

---

### FS-142.2 — Distinguir "sin resultados para un estado válido" de "estado inexistente"
**Tipo:** Endpoint/API · **BLOQUEADO**
**Cubre:** criterios 3 y 5 de la historia.
**Dependencias:** FS-142.1, y que se resuelva el Punto abierto 3 del PRD (enumeración de los estados válidos de una tarea). No se puede completar antes de esa decisión.

**Definition of Done (a aplicar cuando se desbloquee)**
- Si el estado pedido es uno de los válidos pero no tiene tareas, la respuesta indica "sin resultados", no un error.
- Si el estado pedido no es uno de los válidos, la respuesta indica un error explícito, distinguible del caso anterior.
- Cubierto por test automatizado de ambos escenarios.

---

### FS-142.3 — Selector de filtro por estado en la lista
**Tipo:** Frontend
**Cubre:** criterios 1, 2 y 4 desde la interfaz.
**Dependencias:** FS-142.1

**Definition of Done**
- El control para aplicar y para quitar el filtro es evidente y sigue las convenciones de componentes ya usadas en el proyecto (shadcn/ui, Tailwind).
- El mensaje mostrado cuando el espacio no tiene ninguna tarea es distinto del que se mostrará cuando el filtro simplemente no tenga resultados (ese llega con FS-142.4).
- Verificado manualmente en navegador contra los criterios 1, 2 y 4.

---

### FS-142.4 — Mensajes distintos para "sin resultados" y "estado inválido"
**Tipo:** Frontend · **BLOQUEADO**
**Cubre:** criterios 3 y 5 desde la interfaz.
**Dependencias:** FS-142.2, FS-142.3. Bloqueado por la misma razón que FS-142.2.

**Definition of Done (a aplicar cuando se desbloquee)**
- Muestra un mensaje de "no hay tareas en este estado" cuando el filtro es válido y no tiene resultados.
- Muestra un aviso de error distinguible cuando se solicita un estado que no existe.
- Verificado manualmente contra los criterios 3 y 5.

---

### FS-142.5 — Verificar que una tarea filtrada deja de aparecer al cambiar de estado
**Tipo:** Test · **BLOQUEADO**
**Cubre:** criterio 6 de la historia.
**Dependencias:** FS-142.1, y que se resuelva el Punto abierto 2 del PRD (qué significa "tiempo real" en este producto: frescura al cargar o sincronización en vivo). El comportamiento exacto a testear depende de esa decisión.

**Definition of Done (a aplicar cuando se desbloquee)**
- Test automatizado que confirma que, tras el cambio de estado de una tarea, deja de aparecer en una lista filtrada por su estado anterior, en el momento que defina la decisión ya tomada sobre "tiempo real".
- Sirve de regresión: si el comportamiento se rompe más adelante, este test debe fallar.
