# videojuegos-proyecto

Datos     → services
Lógica    → pages
Vista     → components

´´´
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
´´´