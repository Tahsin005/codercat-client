# CoderCat Blog

A modern, responsive blog application built with React and Redux Toolkit, featuring a beautiful UI with dark/light theme support and real-time API integration.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Real-time Data**: Integrated with backend API using RTK Query
- **Blog Management**: View, search, and filter blog posts
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Icons
- **Date Handling**: date-fns
- **Linting**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tahsin005/codercat-client.git
cd codercat-client
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_API_URL=https://your-api.com
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔌 API Integration

The application uses RTK Query for seamless API integration.

### API Configuration

The API base URL is configured via the `VITE_API_URL` environment variable and can be found in `src/api/apiSlice.js`.

## 🎨 Features in Detail

### Theme System
- Automatic theme detection based on system preferences
- Manual theme toggle with persistent storage
- Smooth transitions between themes

### Blog Features
- Dynamic blog post loading from API
- Search functionality
- Category filtering
- Responsive blog cards with loading states

### Navigation
- Responsive navigation with mobile menu
- Active route highlighting
- Smooth page transitions

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables for Production

Make sure to set the `VITE_API_URL` environment variable in your production environment to point to your backend API.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
# nodejs_ts
