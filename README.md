Shoporia | Luxury E-Commerce Archive
Shoporia is a high-end, minimalist e-commerce platform designed for curated collections of bags, watches, perfumes, and luxury accessories. The system features a sophisticated "Archive" aesthetic, emphasizing a clean user interface and robust administrative controls for inventory and order management.
📝 Description
Shoporia serves as a digital ledger and storefront for luxury goods. It allows users to browse a meticulously curated catalog, manage a personal shopping bag, and execute secure checkouts. The administrative side provides an "Executive Control" dashboard to oversee the entire lifecycle of a product—from "Acquisition" (creation) to "Modification" (editing) and "Ledger" management (order tracking).

Live URL: https://shoporiafrontend.vercel.app

🚀 Key Features
Public Features
The Collection: A fluid, responsive product gallery with category filtering.
Narrative Product Details: Rich product descriptions emphasizing craftsmanship and heritage.
The Shopping Bag: Persistent local storage-based cart system with real-time quantity adjustments.
The Ledger: Personal transaction history for users to track their past acquisitions.
Testimonials: Integrated rating and review system for post-purchase feedback.

Administrative Features (Executive Control)
Registry Management: Full CRUD operations for products and users.
Secure Acquisitions: Multi-part form handling for high-resolution asset (image) uploads.
Order Synchronization: Real-time status updates (Pending, Shipped, Delivered) for customer orders.
Inquiry Clearing: Management system for customer contact messages.

🛠 Tools & Technologies
Frontend
Vue 3 (Composition API): Modern reactive framework for a fast, single-page application experience.
Tailwind CSS: For the bespoke, minimalist "Stone & Amber" design system.
Vue Router: Handles seamless navigation between the shop and admin sectors.
Axios: For streamlined API communication with the backend.

Backend
Node.js & Express: Scalable server architecture.
MongoDB & Mongoose: NoSQL database for flexible product and order schemas.
Multer: Middleware for handling multipart/form-data and server-side file uploads.

Infrastructure
Render: Primary hosting platform for both the web service and the static frontend.
LocalStorage API: Used for maintaining cart state across browser sessions.
Google Fonts: Integration of 'Playfair Display' for that signature luxury serif look.

📂 System Architecture
The system follows a standard Client-Server architecture:
Client: The Vue 3 application sends requests to the API and handles the "Visual Manifest."
API: An Express server validates requests and communicates with the Database.
Storage: * Database: Stores text data (Product specs, User credentials, Orders).
Filesystem: Stores physical image assets in an uploads/ directory (or persistent disk on Render).

⚙️ Installation & Setup
Prerequisites
Node.js (v16+)

MongoDB Atlas account or local MongoDB instance

1. Clone the Repository
Bash
git clone https://github.com/yourusername/shoporia.git
cd shoporia
2. Backend Setup
Bash
# Navigate to backend folder (if separate)
npm install
# Create a .env file and add:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000
# JWT_SECRET=your_secret_key
npm start
3. Frontend Setup
Bash
# Navigate to frontend folder
npm install
npm run dev
⚠️ Important Deployment Notes (Render)
Because this system uses Multer for image uploads:
Ephemeral Storage: Standard Render web services reset the filesystem on every deploy. To keep product images permanently, you must attach a Render Blueprint Disk and mount it to the /uploads folder.
Environment Variables: Ensure VITE_BACKEND_URL (for frontend) and MONGO_URI (for backend) are correctly set in the Render dashboard.

✒️ Design Philosophy
The "Shoporia" aesthetic is built on:
Typography: High-contrast Serifs (Playfair Display) paired with wide-tracked Sans-serifs.
Palette: #fafafa (Stone), #900 (Amber), and #000 (True Black).
Motion: Subtle "Reveal" animations and blur transitions to mimic high-end fashion editorials.
