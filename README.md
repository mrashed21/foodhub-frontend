# 🍔 FoodHub Frontend

A modern, responsive food delivery platform built with Next.js 15, TypeScript, and Tailwind CSS. Experience seamless food ordering with a beautiful UI and smooth user experience.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://foodhub-frontend-flame.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

FoodHub Frontend is a feature-rich, user-friendly food delivery application that connects hungry customers with their favorite restaurants. Built with the latest web technologies, it offers a smooth, fast, and delightful user experience across all devices.

🌐 **Live Demo:** [https://foodhub-frontend-flame.vercel.app](https://foodhub-frontend-flame.vercel.app)

## ✨ Features

### 🎨 User Interface
- 📱 **Fully Responsive Design** - Seamless experience across mobile, tablet, and desktop
- 🌓 **Dark/Light Mode** - Theme toggle for comfortable viewing
- ✨ **Modern UI Components** - Built with shadcn/ui for consistency
- 🎭 **Smooth Animations** - Framer Motion for delightful interactions
- 🎨 **Beautiful Gradients** - Eye-catching design elements

### 🛒 Customer Features
- 🔍 **Advanced Search & Filters** - Find restaurants and dishes easily
- 🏪 **Restaurant Browsing** - Explore restaurants by cuisine, rating, and location
- 📋 **Menu Exploration** - View detailed menu with images and descriptions
- 🛒 **Smart Shopping Cart** - Add, update, and manage orders
- 💳 **Secure Checkout** - Safe and easy payment process
- 📦 **Order Tracking** - Real-time order status updates
- ⭐ **Reviews & Ratings** - Share and read customer experiences
- 👤 **User Profile** - Manage personal information and preferences
- 📍 **Address Management** - Save multiple delivery addresses
- 📜 **Order History** - View past orders and reorder favorites

### 🏪 Restaurant Owner Features
- 📊 **Dashboard** - Analytics and business insights
- 📋 **Menu Management** - Add, edit, and manage menu items
- 📦 **Order Management** - Track and update order status
- 📈 **Sales Reports** - View revenue and performance metrics
- ⚙️ **Restaurant Settings** - Update profile and operating hours

### 🔐 Authentication & Security
- 🔑 **Secure Login/Register** - JWT-based authentication
- 🔒 **Protected Routes** - Role-based access control
- 👥 **Multi-role Support** - Customer, Restaurant Owner, Admin
- 🔄 **Session Management** - Persistent login with token refresh

## 🛠️ Tech Stack

### Core
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

### State Management & Data Fetching
- **API Client:** Axios / Fetch API
- **State Management:** React Context / Zustand
- **Form Handling:** React Hook Form
- **Validation:** Zod

### UI & Animation
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Toast Notifications:** Sonner / React Hot Toast
- **Image Optimization:** Next.js Image

### Development Tools
- **Code Quality:** ESLint, Prettier
- **Package Manager:** npm
- **Version Control:** Git

## 📸 Screenshots

> Add your application screenshots here

```
/screenshots
  ├── home.png
  ├── restaurant-listing.png
  ├── menu.png
  ├── cart.png
  ├── checkout.png
  └── order-tracking.png
```

## 📁 Project Structure

```
foodhub-frontend/
├── public/                    # Static assets
│   ├── images/               # Images and logos
│   └── icons/                # Icon files
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (customer)/      # Customer pages
│   │   ├── (restaurant)/    # Restaurant owner pages
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components (Header, Footer)
│   │   ├── features/       # Feature-specific components
│   │   └── shared/         # Shared/reusable components
│   ├── lib/                # Utility functions and configurations
│   │   ├── api/           # API service functions
│   │   ├── utils/         # Helper functions
│   │   └── hooks/         # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   ├── context/           # React Context providers
│   ├── styles/            # Global styles
│   └── constants/         # Application constants
├── components.json         # shadcn/ui configuration
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mrashed21/foodhub-frontend.git
   cd foodhub-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://foodhub-backend-one.vercel.app
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://foodhub-backend-one.vercel.app
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Maps (Optional - for location features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Cloudinary (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Stripe (Optional - for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_google_analytics_id

# Environment
NODE_ENV=development
```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier

# Type Checking
npm run type-check   # Check TypeScript types
```

## 🌐 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy!

### Other Platforms

You can also deploy to:
- **Netlify:** `npm run build` → Deploy `out` folder
- **AWS Amplify:** Connect your repo and deploy
- **Docker:** Use the included Dockerfile

## 🔌 API Integration

The frontend integrates with the FoodHub Backend API:

**Backend Repository:** [foodhub-backend](https://github.com/mrashed21/foodhub-backend)

**API Base URL:** `https://foodhub-backend-one.vercel.app`

### API Service Example

```typescript
// src/lib/api/restaurants.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRestaurants = async () => {
  const response = await axios.get(`${API_URL}/api/restaurants`);
  return response.data;
};

export const getRestaurantById = async (id: string) => {
  const response = await axios.get(`${API_URL}/api/restaurants/${id}`);
  return response.data;
};
```

## 🎨 UI Components

This project uses **shadcn/ui** for beautiful, accessible components:

### Adding New Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
npx shadcn@latest add form
```

### Available Components
- ✅ Button, Card, Dialog
- ✅ Form, Input, Label
- ✅ Select, Dropdown, Checkbox
- ✅ Toast, Alert, Badge
- ✅ Table, Tabs, Sheet
- ✅ And many more!

## 🔧 Key Features Implementation

### 🛒 Shopping Cart
```typescript
// Context-based cart management
const CartContext = createContext<CartContextType>(initialState);

// Add to cart
const addToCart = (item: CartItem) => {
  // Implementation
};

// Update quantity
const updateQuantity = (itemId: string, quantity: number) => {
  // Implementation
};
```

### 🔐 Authentication
```typescript
// Protected route wrapper
export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  
  if (loading) return <Loader />;
  if (!user) redirect('/login');
  
  return <>{children}</>;
}
```

### 📍 Real-time Order Tracking
```typescript
// WebSocket or polling for order updates
const useOrderTracking = (orderId: string) => {
  const [status, setStatus] = useState<OrderStatus>('pending');
  
  useEffect(() => {
    // Subscribe to order updates
  }, [orderId]);
  
  return { status };
};
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

```typescript
// Tailwind CSS classes for responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

## 🧪 Testing (Optional)

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Follow TypeScript best practices
- Use meaningful component and variable names
- Write clean, readable code with comments
- Maintain consistent code formatting
- Follow the existing project structure

## 🐛 Known Issues

- [ ] Add issue tracking here
- [ ] List any known bugs or limitations

## 🗺️ Roadmap

- [ ] Progressive Web App (PWA) support
- [ ] Multi-language support (i18n)
- [ ] Advanced filtering and sorting
- [ ] Loyalty program integration
- [ ] Social sharing features
- [ ] Voice search
- [ ] AR menu visualization

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**M Rashed**
- GitHub: [@mrashed21](https://github.com/mrashed21)
- Portfolio: [Your Portfolio URL]

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) - Amazing React framework
- [shadcn](https://ui.shadcn.com/) - Beautiful UI components
- [Vercel](https://vercel.com/) - Hosting platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- All open-source contributors

## 🔗 Related Projects

- **Backend API:** [foodhub-backend](https://github.com/mrashed21/foodhub-backend)
- **Admin Dashboard:** Coming soon
- **Mobile App:** Coming soon

## 📧 Contact & Support

- 🐛 **Bug Reports:** [Create an issue](https://github.com/mrashed21/foodhub-frontend/issues)
- 💡 **Feature Requests:** [Create an issue](https://github.com/mrashed21/foodhub-frontend/issues)
- 📧 **Email:** your-email@example.com

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

**Live Demo:** [https://foodhub-frontend-flame.vercel.app](https://foodhub-frontend-flame.vercel.app)

Made with ❤️ by [M Rashed](https://github.com/mrashed21)

</div>