# Evidencias y estado de la PC2 Tipo F

Caso: **Terminal Pesquero de Chorrillos**. Corte: 21 de noviembre de 2026 (UTC-5).

## Jira — pregunta 1
- Backlog: https://marea-fresca-dansan.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog
- Épicas recreadas: SCRUM-5, SCRUM-6, SCRUM-7, SCRUM-8 (origen antiguo MFP-1 a MFP-4)
- Historias recreadas: SCRUM-9 a SCRUM-24, vinculadas a épica con criterios Dado/Cuando/Entonces, MoSCoW, estimaciones Fibonacci y asignación al usuario responsable. Los 16 puntos antiguos suman ahora 61 story points.

## Scrum — pregunta 2
- Tablero 1 del sitio propio: 4 sprints FUTUROS (no ejecutados): 23/11–27/11, 30/11–04/12, 07/12–11/12 y 14/12–18/12 de 2026.
- Cada sprint tiene 4 historias. Totales: 15, 13, 14, 16 SP = **58 SP**.
- Burndown, velocidad y Kanban de 4 etapas pertenecen a una **SIMULACIÓN ACADÉMICA**; no implican historias cerradas en Jira.
- El tablero real actualmente muestra tres columnas: **Por hacer / En curso / Listo**, sin límite WIP. Para cumplir exactamente la rúbrica, el usuario deberá agregar la columna **En revisión** y límites WIP en la configuración del tablero, si la edición de su proyecto lo permite.

## GitHub — preguntas 3 y 4
- Repositorio: https://github.com/DanSan122/marea-fresca-pfc3
- PR: https://github.com/DanSan122/marea-fresca-pfc3/pull/1 — **test → main**, borrador sin fusionar.
- Ejecución CI del PR: https://github.com/DanSan122/marea-fresca-pfc3/actions/runs/44974677333
- Resultado comprobado: **build-test, dependency-audit, sast/Semgrep y secrets/Gitleaks exitosos**.
- Se corrigió previamente la compatibilidad de Semgrep con Python 3.11. Las ejecuciones fallidas anteriores se conservan como trazabilidad.

## Vercel
- Proyecto vinculado a GitHub: **marea-fresca-pfc3-github**, producción configurada desde **main**, preview desplegado desde commit de **test**.
- Preview de test desde GitHub: https://marea-fresca-pfc3-github-1n7jaz1vv-daniel-s-projects-5aa9da55.vercel.app (API Vercel: READY)
- Demo anterior independiente: https://marea-fresca-pfc3.vercel.app
- **No hubo merge a main ni despliegue de producción desde el repositorio.**
- La aplicación es una demo con datos ficticios. Aún faltan autenticación, persistencia compartida y Supabase.

## Capturas
El navegador automatizado de este entorno recibió `ERR_BLOCKED_BY_ADMINISTRATOR` al abrir Jira, GitHub y Vercel. Por ello, tomar capturas en la propia sesión web y adjuntarlas al informe. Nunca representar capturas locales como capturas de servicios remotos.


## Migración a Jira independiente (21/11/2026)
- **Sitio vigente:** https://marea-fresca-dansan.atlassian.net
- **Proyecto vigente:** SCRUM (Jira asignó esta clave al proyecto llamado Marea Fresca - PC2, con clave MFP).
- **Backlog:** https://marea-fresca-dansan.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog
- **Épicas:** SCRUM-5 a SCRUM-8; **historias:** SCRUM-9 a SCRUM-24.
- **Estados actuales de las 16 historias:** 8 finalizadas, 6 en curso, 2 por hacer.
- **Asignación:** todas las 16 historias al propietario del proyecto.
- **Estimación total:** 61 story points; sprints: 18 / 15 / 13 / 15 puntos.
- **Sprints:** MFP Sprint 1 id=1; Sprint 2 id=3; Sprint 3 id=4; Sprint 4 id=5. Todos futuros. Sprint 0 id=2 y cuatro incidencias de ejemplo existían previamente y no pertenecen al alcance del proyecto.
- **Limitación:** es reconstrucción funcional; Jira no transfirió los identificadores, el historial de cambios ni los eventos del proyecto anterior.
- **Sitio anterior:** dbravoo.atlassian.net, temporalmente fuera de los permisos otorgados al conector, por tanto no se ha eliminado.
