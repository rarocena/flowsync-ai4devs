# Tickets — Historia FS-118 (fecha de vencimiento y tareas vencidas)

Cada ticket hereda los criterios de aceptación de FS-118 tal como están en [`us-fechas-vencimiento.md`](./us-fechas-vencimiento.md). El Definition of Done de cada ticket es checklist de entrega (tests, manejo de error, convenciones), no criterios nuevos.

---

### FS-118.1 — Persistir la fecha de vencimiento de una tarea
**Tipo:** Migración/DB
**Dependencias:** ninguna dentro de esta historia. *Prerrequisito externo: asume que ya existe la entidad Tarea con sus campos base (título, responsable, estado) — eso pertenece a otra historia de E2 todavía sin descomponer en tickets.*

**Definition of Done**
- La migración es reversible (se puede deshacer sin dejar el esquema inconsistente).
- Corre limpia tanto sobre una base nueva como sobre la base de desarrollo ya existente.
- El esquema generado del proyecto queda actualizado y commiteado junto con la migración.
- Sigue la convención de nombres/timestamps de migraciones ya usada en el repo.
- No rompe ninguna migración ni test existente al correr la suite completa.

---

### FS-118.2 — Calcular si una tarea está vencida (regla base)
**Tipo:** Modelo/Dominio
**Cubre:** criterios 3, 4 y 6 de la historia.
**Dependencias:** FS-118.1

**Definition of Done**
- La regla de "está vencida" vive en un único sitio reutilizable (no se recalcula por separado en cada capa que la necesite).
- Cubierta por tests unitarios que reproducen explícitamente los criterios 3, 4 y 6 (vencida, vence hoy no cuenta, creada ya con fecha pasada).
- El caso límite del "día de hoy" queda expresado como test, no solo como comentario.

---

### FS-118.3 — Excluir del cálculo de "vencida" las tareas ya terminadas
**Tipo:** Modelo/Dominio · **BLOQUEADO**
**Cubre:** criterio 5 de la historia.
**Dependencias:** FS-118.2, y que se resuelva el Punto abierto 3 del PRD (enumeración de los estados posibles de una tarea). No se puede completar antes de esa decisión.

**Definition of Done (a aplicar cuando se desbloquee)**
- La regla de "vencida" (FS-118.2) deja de aplicar a las tareas cuyo estado se defina como "terminado".
- Cubierto por test unitario del criterio 5.
- No se toca la regla base de FS-118.2 para las tareas que siguen en curso — el ajuste es aditivo, no una reescritura.

---

### FS-118.4 — Crear tarea aceptando fecha de vencimiento opcional
**Tipo:** Endpoint/API
**Cubre:** criterios 1, 2, 6 y 8 de la historia.
**Dependencias:** FS-118.1. *Prerrequisito externo: el endpoint de creación de tarea en sí (título, responsable) es de otra historia; este ticket asume que ya existe y solo añade el manejo de la fecha.*

**Definition of Done**
- Acepta la creación de una tarea con fecha de vencimiento, sin fecha, o con fecha ya pasada — sin rechazar ninguno de los tres casos legítimos.
- Si la fecha recibida no es una fecha real, la petición se rechaza de forma clara y no se crea ninguna tarea a medias.
- La validación sigue el mecanismo de validación ya usado en el resto del proyecto (mismo estilo de errores que los validadores existentes).
- Cubierto por test automatizado para los cuatro casos: fecha futura, sin fecha, fecha pasada, fecha inválida.

---

### FS-118.5 — Formulario de creación con fecha de vencimiento opcional
**Tipo:** Frontend
**Cubre:** criterios 1, 2, 6 y 8 desde la interfaz.
**Dependencias:** FS-118.4

**Definition of Done**
- El campo de fecha se percibe claramente como opcional en el formulario.
- Si el usuario introduce algo que no es una fecha válida, el error se muestra asociado a ese campo y el resto de los datos ya rellenados no se pierde.
- Reutiliza los componentes/convenciones de formulario y estilo ya existentes en el frontend (shadcn/ui, Tailwind) — no introduce un patrón nuevo.
- Verificado manualmente en navegador contra los criterios 1, 2, 6 y 8.

---

### FS-118.6 — Indicador visual de tareas vencidas en la lista
**Tipo:** Frontend
**Cubre:** criterios 3 y 4 desde la interfaz.
**Dependencias:** FS-118.2. *No depende de FS-118.3: se puede entregar y lanzar con la regla base; cuando FS-118.3 se desbloquee, el indicador dejará de aplicar a tareas terminadas sin que este ticket deba rehacerse.*

**Definition of Done**
- La distinción visual de "vencida" es perceptible sin depender solo del color (para no dejar fuera a quien no distingue colores).
- El frontend consume el cálculo de "vencida" ya resuelto por el dominio (FS-118.2) — no reimplementa la regla de fechas en el cliente.
- Sigue el sistema de diseño ya existente del proyecto.
- Verificado manualmente contra los criterios 3 y 4, incluido el caso de "vence hoy".

---

### FS-118.7 — Verificar que vencerse no dispara ningún aviso activo
**Tipo:** Test
**Cubre:** criterio 7 de la historia.
**Dependencias:** FS-118.1, FS-118.2

**Definition of Done**
- Test automatizado (o checklist manual si no existe infraestructura de notificaciones que testear) que confirma que ni backend ni frontend generan ningún efecto secundario — email, notificación, mensaje — cuando una tarea cruza su fecha de vencimiento.
- Sirve como regresión: si en el futuro alguien añade un aviso por vencimiento sin querer, este test debe fallar.
