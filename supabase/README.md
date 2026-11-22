# Configuración de Supabase para Marea Fresca

**Estado actual:** pendiente de crear proyecto en Supabase. El despliegue publicado sigue siendo una demostración con datos ficticios. El SQL de este repositorio es una propuesta que aún no se ha aplicado.

## 1. Crear proyecto
1. Abre https://supabase.com/dashboard/projects y pulsa **New project**.
2. Selecciona tu organización **DanSan**, si es donde deseas alojarlo. Revisa el costo/plan que muestra Supabase antes de confirmar.
3. Nombre recomendado: `marea-fresca-pfc3`.
4. Región recomendada para explorar: **South America (São Paulo)**, si aparece y tiene un costo aceptable.
5. Usa una contraseña de base de datos segura y guárdala en tu gestor de contraseñas. **Nunca la pegues en ChatGPT ni en GitHub**.

## 2. Aplicar SQL
Abre SQL Editor del proyecto y revisa/ejecuta el script [schema.sql](schema.sql). Crea `profiles` y `catch_listings`, habilita RLS, permite lectura pública de las publicaciones y restringe cambios al pescador propietario.

Pruebas sugeridas en SQL Editor:
```sql
select table_name from information_schema.tables
 where table_schema = 'public' and table_name in ('profiles','catch_listings');
select tablename, rowsecurity from pg_tables
 where schemaname='public' and tablename in ('profiles','catch_listings');
```

## 3. Conectar con la aplicación
La integración de lectura/escritura y autenticación **todavía requiere implementación y pruebas**. No basta con introducir variables de entorno para que una app basada en `localStorage` escriba en Supabase.

En el proyecto Supabase, abre **Connect** o **Project Settings > API Keys** y localiza:
- Project URL: `SUPABASE_URL`
- Publishable key: `SUPABASE_PUBLISHABLE_KEY`

Estas dos claves son suficientes para preparar un cliente **con políticas RLS**. No publiques la base de datos, `service_role` ni `secret key` en el frontend.

En Vercel configura esas variables bajo **Project Settings > Environment Variables** del proyecto `marea-fresca-pfc3-github`. Necesitan un redeploy para que el proyecto las lea. **Esta versión de la aplicación aún no las consume.**

## 4. Qué sigue
Adaptar frontend y API para usar Supabase Auth y las tablas reales. Probar usuarios distintos, lectura anónima, inserción propia y bloqueo de modificación de terceros. Luego actualizar tests, pipeline y Vercel.

## Referencias
- https://supabase.com/docs/guides/api/securing-your-api
- https://supabase.com/docs/guides/getting-started/api-keys
