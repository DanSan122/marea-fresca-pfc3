# Marea Fresca · Terminal Pesquero de Chorrillos

Proyecto académico de **Práctica Calificada 2, Tipo F**, orientado a informar llegadas de embarcaciones, especies, precios por kilo y disponibilidad.

## Enlaces

- [Jira MFP](https://dbravoo.atlassian.net/jira/software/projects/MFP/boards/37/backlog)
- [Demostración publicada](https://marea-fresca-pfc3.vercel.app)

## Alcance implementado

Sitio web estático con panel, consulta de llegadas y precios, filtro, registro demostrativo e historial. **Todos los datos son ficticios.** El formulario persiste exclusivamente en localStorage; no hay login, persistencia compartida ni tiempo real en producción. La API incluida expone datos de ejemplo con GET /api/arrivals y /api/health; no admite escrituras.

## Ejecutar y verificar

Requiere Node.js 20+.

```bash
npm ci
npm run lint
npm test
npm run build
npx serve public
```

## Seguridad y CI

GitHub Actions verifica sintaxis y build, pruebas Node, npm audit, Semgrep y Gitleaks. Las ejecuciones deben verificarse en la pestaña Actions; la existencia del archivo workflow no garantiza que cada job haya pasado. No se usan credenciales de producción ni información real de pescadores.

## Entregable académico

Jira tiene 4 épicas, 16 historias, story points y 4 sprints futuros, que representan **planificación de una simulación**, no avance histórico. La sustentación y las evidencias deben distinguir estado real y simulado. Este proyecto debe usarse solo conforme a los permisos del docente.
