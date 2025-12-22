# RealStack Developers

## 📖 ¿De qué trata este proyecto?

**RealStack Developers** es una plataforma web moderna y completa para la gestión y visualización de desarrollos inmobiliarios. Es una solución integral que combina un sitio web público elegante con un potente panel de administración, diseñada específicamente para empresas desarrolladoras de bienes raíces.

## 🎯 Propósito

El proyecto permite a las empresas inmobiliarias:

- **Mostrar sus proyectos**: Presentar desarrollos inmobiliarios con información detallada, imágenes, planos, y ubicación en mapas
- **Gestionar contenido**: Administrar proyectos, clientes, operaciones y configuración del sitio desde un panel intuitivo
- **Captar clientes**: Recibir consultas de potenciales compradores a través de formularios de contacto
- **Controlar accesos**: Sistema de roles (admin/usuario) para gestionar permisos y accesos
- **Seguimiento**: Registrar y dar seguimiento a operaciones de venta y reserva

## ✨ Características Principales

### 🏠 Sitio Web Público

- **Hero dinámico**: Sección principal personalizable con título y subtítulo
- **Proyectos destacados**: Galería de proyectos más importantes con información clave
- **Catálogo completo**: Vista de todos los proyectos disponibles con filtros
- **Detalles de proyectos**: Páginas dedicadas con:
  - Galería de imágenes por ambiente (cocina, baño, dormitorio, living)
  - Tipos de unidades con especificaciones (dormitorios, baños, área, precio)
  - Amenities y características
  - Planos de planta
  - Ubicación en mapa interactivo
  - Estado de disponibilidad
- **Sección "Nosotros"**: Historia de la empresa, valores y timeline
- **Newsletter**: Suscripción para recibir novedades
- **Contacto**: Formulario de contacto con integración de Google Maps

### 👤 Sistema de Usuarios

- **Autenticación segura**: Login/registro con Supabase Auth
- **Dos tipos de roles**:
  - **Admin**: Acceso completo al panel de administración
  - **Usuario**: Acceso a perfil personal con favoritos y citas
- **Perfil de usuario**:
  - Gestión de proyectos favoritos
  - Programación de visitas
  - Información personal

### 🔐 Panel de Administración

Accesible solo para usuarios con rol de administrador:

#### Gestión de Proyectos
- Crear, editar y eliminar proyectos
- Configurar proyectos destacados
- Gestionar galería de imágenes por ambiente
- Definir tipos de unidades disponibles
- Añadir planos de planta
- Establecer coordenadas GPS para mapas
- Gestionar amenities (alberca, gimnasio, seguridad, etc.)

#### Gestión de Clientes
- Visualizar contactos recibidos
- Información de clientes potenciales
- Historial de consultas

#### Gestión de Operaciones
- Registrar ventas y reservas
- Vincular operaciones con proyectos y clientes
- Seguimiento de estado (pendiente/completada/cancelada)
- Notas y montos

#### Gestión de Usuarios
- Ver todos los usuarios registrados
- Asignar/revocar roles de administrador
- Gestionar permisos
- Eliminar usuarios

#### Gestión de Citas
- Visualizar citas programadas por usuarios
- Administrar calendario de visitas
- Gestionar disponibilidad

#### Configuración del Sitio
- Personalizar textos del hero
- Actualizar información de contacto
- Configurar URL de Google Maps

## 🛠️ Stack Tecnológico

### Frontend
- **React 18**: Biblioteca principal para la UI
- **TypeScript**: Tipado estático para mayor robustez
- **Vite**: Build tool rápido y moderno
- **Tailwind CSS**: Framework CSS utility-first
- **Lucide React**: Iconos modernos y escalables

### Backend/Base de Datos
- **Supabase**: Backend as a Service
  - PostgreSQL como base de datos
  - Autenticación integrada
  - Row Level Security (RLS) para seguridad
  - Storage para archivos
  - Realtime subscriptions

### Estructura de la Base de Datos
- `projects`: Información de desarrollos inmobiliarios
- `clients`: Datos de clientes y contactos
- `operations`: Registro de operaciones de venta/reserva
- `page_config`: Configuración del sitio web
- `user_roles`: Sistema de roles y permisos
- `favorites`: Proyectos favoritos de usuarios
- `appointments`: Citas programadas para visitas

## 📂 Estructura del Proyecto

```
realstack/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── admin/         # Componentes del panel admin
│   │   ├── Hero.tsx       # Sección hero
│   │   ├── FeaturedProjects.tsx
│   │   ├── AllProjects.tsx
│   │   ├── ProjectDetails.tsx
│   │   ├── ProjectLanding.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Newsletter.tsx
│   │   └── Footer.tsx
│   ├── pages/             # Páginas principales
│   │   ├── Login.tsx      # Autenticación
│   │   ├── Admin.tsx      # Panel de administración
│   │   └── UserProfile.tsx # Perfil de usuario
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilidades y configuración
│   │   └── supabase.ts    # Cliente de Supabase
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Punto de entrada
├── supabase/
│   └── migrations/        # Migraciones de base de datos
├── public/                # Archivos estáticos
└── package.json          # Dependencias del proyecto
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Cuenta en Supabase

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/Kawdoor/realstack.git
cd realstack
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
```

4. **Configurar Supabase**

- Crea un proyecto en [Supabase](https://supabase.com)
- Ejecuta las migraciones SQL en el SQL Editor de Supabase en el siguiente orden:
  1. `20251113211932_create_projects_schema.sql`
  2. `20251114000001_add_favorites_table.sql`
  3. `20251114000002_add_project_details.sql`
  4. `20251114000003_add_user_roles.sql`
  5. `20251114000004_add_appointments.sql`
  6. `20251114000005_add_project_coordinates.sql`
- Habilita Email Authentication en Authentication > Providers

5. **Crear usuario administrador**

Sigue las instrucciones en [ROLES_SETUP.md](./ROLES_SETUP.md) para configurar el usuario admin principal.

**Nota**: Por defecto, el sistema asigna automáticamente el rol de administrador al usuario con email `admin@realstack.com`. Puedes usar este email o modificar la lógica de asignación de roles según tus necesidades en la migración `20251114000003_add_user_roles.sql`.

6. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📝 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta el linter (ESLint)
- `npm run typecheck`: Verifica los tipos de TypeScript

## 🔒 Seguridad

- Row Level Security (RLS) habilitado en todas las tablas
- Autenticación segura con Supabase Auth
- Sistema de roles para control de accesos
- Políticas de seguridad configuradas para proteger datos sensibles
- Acceso público solo a información necesaria (proyectos y configuración)

## 📚 Documentación Adicional

- [ADMIN_SETUP.md](./ADMIN_SETUP.md): Configuración legacy del administrador
- [ROLES_SETUP.md](./ROLES_SETUP.md): Sistema de roles y permisos
- [CHECK_ADMIN_ROLE.sql](./CHECK_ADMIN_ROLE.sql): Script para verificar roles

## 🎨 Diseño y UX

La aplicación cuenta con un diseño minimalista y elegante:
- Paleta de colores neutral (blanco, grises, negro)
- Tipografía ligera con espaciado amplio
- Animaciones suaves y transiciones fluidas
- Diseño responsive para todos los dispositivos
- Imágenes de alta calidad con efectos hover
- Navegación intuitiva y clara

## 🌐 Caso de Uso Ideal

Este proyecto es perfecto para:
- Desarrolladoras inmobiliarias que desean presencia web profesional
- Empresas que venden propiedades en pozo (pre-construcción)
- Agencias inmobiliarias que gestionan múltiples proyectos
- Startups del sector inmobiliario que necesitan una solución completa y escalable

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a Kawdoor/realstack.

## 📧 Contacto

Para más información sobre el proyecto, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ usando React, TypeScript y Supabase**
