# Kerry Bros Internal Portal

A comprehensive React Next.js application for Kerry Brothers Truck Repair's internal operations, featuring authentication, analytics, work order management, fleet tracking, and more.

## 🚛 Features

### Authentication & Security
- **Microsoft OAuth Integration** via Clerk
- Role-based access control (Admin, Manager, Service Advisor, Technician, Parts Clerk)
- Secure session management

### Dashboard & Analytics
- **Real-time Analytics** with interactive charts
- Revenue tracking and performance metrics
- Team efficiency monitoring
- Work order progress visualization

### Work Order Management
- Create, assign, and track service requests
- Priority-based workflow
- Progress tracking with time estimates
- Technician assignment and status updates

### Fleet Management
- Vehicle registration and tracking
- Maintenance scheduling
- Fuel level monitoring
- Location tracking
- Service history

### Team Management
- Technician performance metrics
- Skill specialization tracking
- Workload distribution
- Real-time status monitoring

### Additional Features
- **Inventory Management** (parts tracking, stock levels)
- **Scheduling System** (maintenance appointments)
- **Reporting Tools** (performance reports, analytics)
- **Real-time Notifications**
- **Mobile-responsive Design**
- **Smooth Animations** with Framer Motion

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom truck shop theme
- **Authentication**: Clerk (Microsoft OAuth)
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Chart.js with React Chart.js 2
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Render or local)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kerrybros-internal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Database
   DATABASE_URL=postgresql://username:password@host:port/database

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Clerk Setup
1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Configure Microsoft OAuth provider
3. Set up your redirect URLs
4. Copy your API keys to `.env.local`

### Database Setup (Render)
1. Create a PostgreSQL database on Render
2. Copy the connection string to `DATABASE_URL`
3. Run Prisma migrations

### Customization
- **Colors**: Edit `tailwind.config.js` for custom truck shop colors
- **Branding**: Update logos and company info in components
- **Features**: Add/remove features based on your needs

## 📱 User Roles & Permissions

- **Admin**: Full system access, user management
- **Manager**: Analytics, reporting, team oversight
- **Service Advisor**: Work orders, customer interaction
- **Technician**: Assigned work orders, time tracking
- **Parts Clerk**: Inventory management, parts ordering

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#FF6B35` (Kerry Bros Orange)
- **Primary Blue**: `#004E89` (Kerry Bros Blue)
- **Success Green**: `#10B981`
- **Warning Yellow**: `#F59E0B`
- **Error Red**: `#EF4444`

### Components
- Consistent spacing and typography
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible color contrasts

## 📊 Database Schema

### Core Models
- **Users**: Employee information and roles
- **Vehicles**: Fleet management data
- **Work Orders**: Service requests and tracking
- **Parts**: Inventory management

### Relationships
- Users can create and be assigned work orders
- Vehicles have multiple work orders
- Work orders track parts usage

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🔒 Security Features

- **Authentication**: Microsoft OAuth via Clerk
- **Authorization**: Role-based access control
- **Data Protection**: Encrypted connections, secure sessions
- **Input Validation**: Prisma schema validation
- **CORS**: Configured for production domains

## 📈 Performance

- **Server-Side Rendering**: Next.js SSR for fast initial loads
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: Built-in Next.js caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or feature requests, contact the development team.

## 📄 License

This project is proprietary to Kerry Brothers Truck Repair.

---

**Built with ❤️ for Kerry Brothers Truck Repair**
