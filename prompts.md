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
Actuá como QA automation de la API de FlowSync, responsable de cubrir con tests funcionales de backend (Japa, peticiones HTTP contra la API, sin navegador) el Requirement «Cuándo una tarea está vencida», y de demostrar con evidencia que esos tests miden el contrato de la spec y no lo que hoy hace el código. Tu trabajo termina en el test: si la implementación no cumple, lo reportás, no lo arreglás.

En este paso solo leés: no modifiques archivos ni ejecutes nada que escriba (make, node ace, npm, git add/commit/restore).

Leé:
- openspec/specs/tasks/spec.md: el Requirement «Cuándo una tarea está vencida» y, para saber cómo se crea, consulta y modifica una tarea, «Fijar, cambiar y retirar la fecha de vencimiento», «El día de referencia lo pone quien mira», «Consulta de una tarea suelta» y «Cambio de estado de cualquier tarea».
- docs/capabilities/tasks/README.md: la tabla de Endpoints (todo va bajo /api/v1) y «Tres formas de tarea». Los ejemplos con curl del final usan host, puerto y un id fijo: no son modelo para el test.
- backend/tests/bootstrap.ts y backend/tests/functional/: cómo aíslan, cómo crean cuenta, login y tarea, y cómo hacen las peticiones.

No abras backend/app/models/task.ts ni los transformers: el valor esperado de cada test sale del Scenario, no del código.

Enunciado literal:

"""
**La unidad de trabajo es una y está nombrada:** el Requirement **«Cuándo una tarea está vencida»** de `openspec/specs/tasks/spec.md`. No elijas otro. Sus Scenarios son el enunciado, así que no tienes que inventarte los casos: están escritos, y están escritos desde antes de que existiera el código.

> ✋ **Y el corte es fijo: no arregles la implementación.** El ejercicio termina con los tests escritos y en rojo. El arreglo se hace en el directo, y lo que se compara allí es **tu rojo con el de la clase**.

### 🅰️ Parte A: el contrato primero

1. Lee el Requirement entero y sus Scenarios.
2. Escribe **un archivo de tests funcionales** que los ejerza **entrando por HTTP** (*HyperText Transfer Protocol*, el protocolo por el que entra un cliente de la interfaz de programación de aplicaciones), igual que entra la aplicación que consume este backend. Uno por Scenario.
3. Córrelo con `make test-e2e` y **quédate con la salida entera**, no solo con si pasó o no.

Cinco restricciones, y ninguna es decorativa:

- **No toques ni una línea fuera de `backend/tests/`.** Ni el modelo, ni el transformer, ni el controlador. Si tu agente cambia implementación mientras escribe el test, el test nacerá verde y no comprobará nada.
- Los tests comprueban **lo que sale en la respuesta**, no lo que devuelve un método interno. El campo se llama `isOverdue` y viaja en el cuerpo.
- **El día de referencia se le pasa a la petición.** Nada de la fecha de hoy ni de ningún reloj.
- Sigue **la forma de aislamiento que ya usan** los tests de `backend/tests/functional/`, sin inventar otra.
- **No des por hecho ningún identificador**: usa el que te devuelva la creación.
"""

Los cambios que ya muestra git status (backend/.adonisjs/, los package-lock.json, salida-previa.out) no son de esta tarea.

Devolveme:
1. Una fila por Scenario: título literal | peticiones que arman la precondición (orden, cuerpo, today) | en la respuesta de qué petición se mira | qué se espera de isOverdue y de cualquier otro campo que el Scenario nombre.
2. Tus dudas como preguntas, sin decidirlas vos. Revisá sobre todo los Scenarios cuya precondición no se puede armar solo por HTTP y los que no dicen en qué respuesta se comprueba.
3. Ruta y nombre del único archivo que vas a crear.

```

**Qué salió:** Planteo varias dudas que fui respondiendo de a una para que actulice el plan.

Las preguntas con sus respuestas:

P1. «Sin fecha no se vence nunca»: por HTTP no se puede crear una tarea «hace semanas».
La regla compara dueDate con el today recibido; createdAt no entra. La tarea se crea con POST sin fecha y se consulta con un today muy posterior (2099-12-31), para que quede a la vista el «por antigua que sea». La sub-duda P1-bis quedó descartada.

P2. ¿La cuenta se crea con User.create o con POST /auth/signup?
Se sigue el patrón de los tests que ya existen: User.create y login por HTTP. Se parte de que el usuario ya existe, porque lo que se prueba es el vencimiento y no el alta de cuentas.

P3. «Darla por hecha»: ¿en qué respuesta se mira el THEN?
En un GET posterior con el mismo today. Al PATCH solo se le pide 200, porque devuelve la forma de lista, que no trae isOverdue.

P4. En los Scenarios que dicen «se consulta», ¿miro el GET o también el PUT?
Solo el GET. Al PUT de la precondición se le pide 200 y nada más.

P5. «Una tarea hecha con la fecha pasada»: ¿qué va primero, done o la fecha?
Primero PATCH a done, después PUT con dueDate anterior a today. Al consultar, no está vencida porque está hecha.

P6. En «Darla por hecha» y «Aplazar», que parten de «una tarea vencida»: ¿se comprueba antes del cambio que está vencida?
Sí (opción A): un GET debe dar isOverdue === true antes del cambio. La aserción lleva un mensaje de precondición.

P7. ¿«No hecha» incluye pending e in_progress?
«No hecha» quiere decir status !== 'done'. Para esta regla los dos estados valen lo mismo, así que se usa pending y no hay caso aparte para in_progress.

P8. «Sin fecha»: ¿nunca la tuvo o se la quitaron?
Nunca la tuvo: solo POST. Quitarla con null es otro Requirement. Salió de la respuesta a P1.

P9. ¿Dónde va today en el PUT?
En el cuerpo, junto a dueDate, como dice la tabla de Endpoints del README de la capability y como ya hace trash.spec.ts. En el GET va en la query.

P10. ¿Cómo se comprueba dueDate?
- «Darla por hecha»: GET antes del cambio para guardar la fecha, PATCH a done, GET después, y se compara la fecha nueva con la guardada además de revisar isOverdue.
- «Aplazar»: se comprueban las dos cosas, isOverdue === false y dueDate === '2026-08-21'.

P11. ¿Agrego casos que crucen un cambio de mes o de año?
No. Solo D (2026-08-20) y sus días vecinos.

P12. ¿false estricto y además comprobar que el campo existe?
Sí: assert.property(data, 'isOverdue') y después assert.isTrue o assert.isFalse, que comparan estricto.




## Prompt 2

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```
Plan aprobado. Implementalo.

Límites:
- Creás solo el archivo del plan. Ningún otro, ni dentro ni fuera de backend/tests/. Si necesitás tocar algo más, pará y preguntame.
- Las peticiones van con el `client` de Japa y rutas relativas /api/v1/..., como en los tests existentes. Nada de fetch, axios, host ni puerto.
- Lo esperado sale del Scenario. Si un test queda rojo, no cambies lo esperado: ese rojo es el resultado. Si pasan todos, tampoco los cambies para que fallen: avisame.
- Solo corregís un test si falla antes de llegar a la aserción por un error suyo (ruta, cuerpo, today, token), y lo documentás. Si falla un paso previo y la causa parece la implementación, pará y avisame.
- No toques los cambios previos, HALLAZGOS.md, prompts.md ni backend/tests/unit/. No abras PR ni lances el adversarial-reviewer.
- Si la suite no arranca porque el puerto está ocupado, pará y avisame: no cambies puertos ni .env, y no mates procesos.
- No commitees».

Corré desde la raíz `make test-e2e 2>&1 | tee salida-parte-a.out` (ese archivo no se commitea).

Antes de darlo por terminado, corré estos chequeos y pegá su salida:
- git status --short → además de lo previo, solo el archivo nuevo y salida-parte-a.out
- git diff --stat -- backend/app backend/start backend/database backend/config → vacío
- grep -nE "new Date\(|Date\.now|DateTime\.(now|local|utc)\(|isOverdueOn|/tasks/[0-9]+|localhost|:3333|fetch\(" <archivo> → vacío
- grep -n "withGlobalTransaction" <archivo> → presente

Entregame:
1. Tabla por Scenario: título literal | test | verde/rojo | isOverdue esperado | isOverdue recibido | en qué respuesta se miró. Para cada rojo, su bloque de error copiado de salida-parte-a.out.
2. Cifras copiadas de la pantalla: tests nuevos, cuántos fallaron, cuántos pasaron; de los 40 que ya había (salida-previa.out), cuántos siguen en verde. Incluí literal la línea de resumen final.
3. Qué le corregiste al test durante la ejecución y por qué.
4. Lo que no hayas podido comprobar, marcado PENDIENTE.
No expliques por qué pasa o falla cada test: eso lo deduzco yo.

```



## Prompt 3

**Modelo:** Opus 1M xHigh
**Herramienta:** Claude Code

```

## Rol

Actuá como un ingeniero de software senior especializado en TypeScript, testing unitario y Test-Driven Development (TDD).

Tu objetivo es incorporar pruebas unitarias para la regla que determina si una tarea está vencida, sin modificar su implementación actual.

## Contexto

Estamos trabajando en el proyecto FlowSync, dentro del ejercicio del módulo 11 de AI4Devs.

La regla de negocio está implementada en:

`backend/app/models/task.ts`

Método: `isOverdueOn`

Actualmente no existe el directorio `backend/tests/unit/`.

## Objetivo

Crear tests unitarios que validen el comportamiento esperado de `isOverdueOn`, independientemente del comportamiento actual de la implementación.

Los tests deben llamar directamente a la regla, sin utilizar HTTP, servidor ni base de datos.

## Instrucciones

### 1. Exploración

Antes de escribir código:

- Analizá la implementación y la firma de `isOverdueOn`.
- Identificá cómo se representan las fechas y el estado de las tareas.
- Revisá el framework de testing, las convenciones y los comandos disponibles en el proyecto.
- Consultá `openspec/specs/tasks/spec.md` para comprender la regla de negocio.
- Identificá cómo construir los objetos necesarios para ejecutar los tests sin dependencias externas.

No modifiques código durante esta etapa.

### 2. Implementación de tests

Creá el directorio `backend/tests/unit/` y agregá un archivo de tests que cubra los siguientes escenarios:

1. **Fecha anterior:** una tarea no completada cuya fecha es anterior al día de referencia debe estar vencida.
2. **Fecha igual:** una tarea cuya fecha coincide exactamente con el día de referencia no debe estar vencida.
3. **Fecha posterior:** una tarea con fecha posterior al día de referencia no debe estar vencida.
4. **Sin fecha:** una tarea sin fecha de vencimiento no debe estar vencida.
5. **Tarea completada:** una tarea completada no debe estar vencida aunque su fecha sea anterior al día de referencia.
6. **Representación de fechas:** la regla debe producir el mismo resultado cuando recibe una fecha como texto o como objeto `Date`, utilizando fechas equivalentes.

Para el sexto escenario, verificá cómo llegan realmente los datos a la regla y construí un test que permita detectar diferencias entre ambas representaciones.

Usá fechas fijas y explícitas. No utilices la fecha actual ni dependas del reloj del sistema.

### 3. Restricciones obligatorias

- NO modifiques `backend/app/models/task.ts`.
- NO corrijas errores de implementación.
- NO modifiques archivos fuera de `backend/tests/`.
- NO agregues dependencias si no son necesarias.
- NO utilices mocks de base de datos ni levantes servidores.
- NO escribas tests basándote en lo que actualmente devuelve la función si contradice el comportamiento esperado.
- NO alteres las expectativas para conseguir que los tests pasen.

Los tests deben representar el comportamiento esperado de la regla de negocio y no limitarse a documentar la implementación existente.

### 4. Ejecución y verificación

Una vez escritos los tests:

1. Ejecutá los tests unitarios con `make test-unit` desde la raíz del repositorio.
2. Registrá cuáles pasan y cuáles fallan.
3. Verificá que los fallos correspondan a diferencias entre la implementación actual y los comportamientos esperados.
4. Verificá que no existan errores de configuración, imports o infraestructura que invaliden los resultados.
5. Revisá los cambios con `git diff` y `git status`.

No corrijas la implementación aunque encuentres defectos.

### 5. Resultado esperado

Al finalizar, presentá un resumen con:

- Archivo de tests creado.
- Escenarios implementados.
- Número de tests ejecutados, aprobados y fallidos.
- Explicación de los fallos observados.
- Identificación de tests que hayan pasado y posibles razones.
- Confirmación de que no se modificó código de producción.

## Criterio de finalización

El trabajo termina cuando los tests están escritos, ejecutados y sus resultados documentados.

**Es válido y esperado que existan tests en rojo.**

No continúes con la corrección de la implementación: eso corresponde a otra etapa del ejercicio.
```