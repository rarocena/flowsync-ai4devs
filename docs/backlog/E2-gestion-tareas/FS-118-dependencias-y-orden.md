# FS-118 — Grafo de dependencias y orden de implementación

Grafo construido sobre los tickets de [`tickets-FS-118.md`](./tickets-FS-118.md). Flecha = "bloquea a".

```
FS-118.1 (Migración/DB)
   ├──▶ FS-118.2 (Modelo/Dominio — regla base "vencida")
   │        ├──▶ FS-118.3 (Modelo/Dominio — excluir terminadas)  ⛔ + Punto abierto #3 PRD
   │        ├──▶ FS-118.6 (Frontend — indicador visual)
   │        └──▶ FS-118.7 (Test — sin aviso activo)
   ├──▶ FS-118.4 (Endpoint/API — crear con fecha opcional)
   │        └──▶ FS-118.5 (Frontend — formulario de creación)
   └──▶ FS-118.7 (Test — sin aviso activo)   [también depende de FS-118.1 directamente]
```

FS-118.3 no bloquea a ningún otro ticket de esta lista — es una rama muerta hasta que se resuelva el Punto abierto #3.

## Orden de implementación recomendado

1. **FS-118.1** — todo lo demás depende de esto, directa o indirectamente.
2. **FS-118.2** y **FS-118.4** en paralelo — ambos solo dependen de FS-118.1 y no dependen entre sí (una persona puede llevar la regla de dominio mientras otra lleva el endpoint).
3. **FS-118.5** (tras FS-118.4) y **FS-118.6** (tras FS-118.2) en paralelo — cada uno solo espera a su rama respectiva.
4. **FS-118.7** — en cuanto FS-118.1 y FS-118.2 estén listos; no hace falta esperar a FS-118.5/118.6 para escribirlo.
5. **FS-118.3** — fuera de la secuencia normal: se recoge en cuanto se resuelva el Punto abierto #3 del PRD, sin que eso retrase el resto (nada más en la historia lo necesita).

Con dos personas, el camino crítico es FS-118.1 → FS-118.4 → FS-118.5 (tres pasos en serie); todo lo demás cabe en paralelo o se hace después sin bloquear el resto.
