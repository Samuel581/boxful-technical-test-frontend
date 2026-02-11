# Boxful - Order Management Frontend

A delivery order management application built with Next.js 16 and React 19. Allows users to register, log in, create package delivery orders, and track order history with filtering and CSV export.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5**
- **Ant Design 6** for UI components
- **Axios** for HTTP requests with JWT interceptor
- **Day.js** for date handling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://boxful-technical-test-backend.onrender.com/
```

### Development

```bash
pnpm dev
```

The app runs at `http://localhost:8080`.

### Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
app/
├── (auth)/                        # Auth route group
│   ├── layout.tsx
│   ├── login/page.tsx
│   └── register/page.tsx
├── dashboard/                     # Protected routes
│   ├── layout.tsx
│   ├── page.tsx                   # Redirects to /dashboard/create-order
│   ├── create-order/page.tsx
│   └── history/page.tsx
├── components/
│   ├── features/
│   │   ├── auth/                  # LoginForm, RegisterForm
│   │   └── order/                 # CreateOrderForm, OrderHistory, NavLinks
│   └── layout/                    # AuthPanelLayout, DashboardLayout, ProtectedRoute
├── constants/                     # Colors, routes, form constants
├── context/                       # AuthContext (JWT + React Context)
├── form-rules/                    # Ant Design form validation rules
├── lib/api/                       # Axios instance with interceptors
├── services/                      # authService, ordersService
├── types/                         # TypeScript interfaces
├── utils/                         # CSV export utility
├── layout.tsx                     # Root layout (AntdRegistry + AuthProvider)
└── page.tsx                       # Redirects based on auth state
```

## Routes

| Path | Description | Auth |
|------|-------------|------|
| `/` | Redirects to `/dashboard` or `/login` | - |
| `/login` | Login page | Public |
| `/register` | Registration page | Public |
| `/dashboard` | Redirects to `/dashboard/create-order` | Protected |
| `/dashboard/create-order` | Create a new delivery order | Protected |
| `/dashboard/history` | Order history with filters | Protected |

## Features

### Authentication
- Registration with name, email, phone, gender, and birth date
- JWT-based login with token stored in localStorage
- Automatic Bearer token injection via Axios interceptor
- Auto-redirect to login on 401 responses

### Order Creation
- Two-step form: order details, then package list
- Recipient info, collection/destination addresses, scheduled date
- Add multiple packages with dimensions and weight

### Order History
- Server-side paginated table
- Date range filter synced to URL search params (`?page=2&startDate=2025-01-01&endDate=2025-01-31`)
- CSV export of filtered orders
- Items-per-page selector (5, 10, 20)

## Docker

### Prerequisites

- Docker and Docker Compose

### Build and run

```bash
docker network create boxful-network

# In the backend repo
docker compose up -d

# In the frontend repo
docker compose up -d
```

The frontend will be available at `http://localhost:8080` and the backend at `http://localhost:3000`.

The `NEXT_PUBLIC_API_URL` build arg defaults to `http://localhost:3000`. Override it via a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Both the frontend and the backend share the `boxful-network` Docker network so they can communicate when running side by side.

## API Integration

The frontend communicates with a REST backend through two services:

- **authService** - `login()`, `register()`
- **ordersService** - `create()`, `getAll()` (paginated), `getAllForExport()` (all pages for CSV)

The Axios instance (`app/lib/api/axios.ts`) handles token injection and 401 error interception automatically.
