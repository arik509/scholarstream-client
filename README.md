# ScholarStream - Client

## Project Overview
ScholarStream is a comprehensive scholarship management platform that connects students with scholarship opportunities worldwide. The platform features role-based dashboards for Students, Moderators, and Admins.

## Live URL
🔗 [Live Site](https://your-app-name.vercel.app)

## Key Features
- 🔐 Secure JWT-based authentication with role management
- 🔍 Advanced search, filter, and sort functionality for scholarships
- 💳 Integrated Stripe payment system for application fees
- 📊 Admin analytics dashboard with charts
- 👥 Role-based access control (Student, Moderator, Admin)
- 📱 Fully responsive design for all devices
- 🎨 Modern UI with DaisyUI and Tailwind CSS
- ⚡ Real-time data updates and loading states
- 📄 Pagination for better performance

## Tech Stack
- **Frontend Framework:** React 18
- **Routing:** React Router v7
- **Styling:** Tailwind CSS, DaisyUI
- **Authentication:** Firebase Authentication
- **Payment:** Stripe
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Notifications:** SweetAlert2
- **Charts:** Recharts
- **Animations:** Framer Motion

## NPM Packages Used
{
"react": "^18.3.1",
"react-router": "^7.1.0",
"firebase": "^11.1.0",
"@stripe/react-stripe-js": "^2.10.0",
"@stripe/stripe-js": "^4.11.0",
"axios": "^1.7.9",
"sweetalert2": "^11.15.3",
"react-icons": "^5.4.0",
"recharts": "^2.15.0",
"framer-motion": "^11.15.0"
}


## Installation

1. Clone the repository:
git clone https://github.com/arik509/scholarstream-client.git
cd scholarstream-client


2. Install dependencies:
npm install


3. Create `.env` file:
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key


4. Run the development server:
npm run dev


## Admin Credentials
**Email:** sabir@arik.com
**Password:** A112233*

## Features by Role

### Student
- Browse and search scholarships
- Apply for scholarships with payment
- Track application status
- Write and manage reviews
- View feedback from moderators

### Moderator
- Manage all student applications
- Update application status
- Provide feedback to applicants
- Moderate user reviews

### Admin
- Add and manage scholarships
- Manage user roles
- View platform analytics
- Delete inappropriate content
- Full system control

## Author
Developed by Sabir Hossain Arik




