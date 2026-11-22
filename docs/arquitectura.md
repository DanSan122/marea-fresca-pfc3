# Arquitectura lógica y DevSecOps

Frontend HTML/CSS/JavaScript servido desde Vercel. La API de ejemplo (GET /api/arrivals y GET /api/health) devuelve JSON desde funciones serverless. La demostración usa datos ficticios; el formulario guarda localStorage, no una base de datos.

En una fase posterior: autenticación y PostgreSQL con Supabase; políticas de acceso por pescador mediante RLS; publicación compartida de ofertas en tiempo real. **Estos elementos no están implementados en este despliegue.**

DevSecOps: Plan (Jira), Code (GitHub/PR), Build (Node.js), Test (node:test), Release (PR a main), Deploy (Vercel), Operate (logs de Vercel), Monitor (estado de Vercel/Actions). Seguridad shift-left: revisión de PR, lint, pruebas, npm audit, Semgrep y Gitleaks. Verificar ejecuciones de Actions antes de afirmar éxito.
