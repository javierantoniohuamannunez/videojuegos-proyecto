# Videojuegos Proyecto - Throne & Liberty


El proyecto sigue una separación clara de responsabilidades
- Datos     → services
- Lógica    → pages
- Vista     → components

## Flujo de la aplicación
```
API REST (Node + Express + MongoDB)
   │
   ▼
API Layer (axios services)
   │
   ▼
Custom Hooks (opcional / mejora futura)
(useBosses, useDungeons)
   │
   ▼
UI Components (React + TypeScript)

App
 ├─ Navbar
 │
 ├─ BossesPage
 │   ├─ Card
 │   └─ BossModal
 │
 └─ DungeonsPage
     ├─ Card
     └─ DungeonModal
```
## Tecnologías utilizadas

### Backend
- Node.js
- Express
- MongoDB (Mongoose)

### Frontend
- React
- TypeScript
- Axios
- Bootstrap (CDN)

---