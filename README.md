# Shoporia | Luxury E-Commerce Archive
Shoporia is a high-end, minimalist e-commerce platform designed for curated collections of bags, watches, perfumes, and luxury accessories. The system features a sophisticated "Archive" aesthetic, emphasizing a clean user interface and robust administrative controls for inventory and order management.

LIVE LINK🚀: https://shoporiafrontend.vercel.app

## 📝 Description
Shoporia serves as a digital ledger and storefront for luxury goods. It allows users to browse a meticulously curated catalog, manage a personal shopping bag, and execute secure checkouts. The administrative side provides an "Executive Control" dashboard to oversee the entire lifecycle of a product—from "Acquisition" (creation) to "Modification" (editing) and "Ledger" management (order tracking).

## 🚀 Key Features
### **Public Storefront**
* **The Collection:** A fluid, responsive product gallery with category filtering.
* **Narrative Product Details:** Rich product descriptions emphasizing craftsmanship and heritage.
* **The Shopping Bag:** Persistent local storage-based cart system with real-time quantity adjustments.
* **The Ledger:** Personal transaction history for users to track their past acquisitions.
* **Testimonials:** Integrated rating and review system for post-purchase feedback.

### **Executive Control (Admin)**
* **Registry Management:** Full CRUD (Create, Read, Update, Delete) operations for products and users.
* **Secure Acquisitions:** Multi-part form handling for high-resolution asset (image) uploads.
* **Order Synchronization:** Real-time status updates (Pending, Shipped, Delivered) for customer orders.
* **Logistics Archive:** Detailed view of consignee information and internal tracking IDs.

## 🛠 Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | Vue 3 (Composition API), Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB & Mongoose |
| **File Handling** | Multer (Server-side storage) |
| **Deployment** | Render (Web Service & Static Hosting) |

## 📂 System Architecture

The system follows a standard **Client-Server** architecture:

1.  **Client:** The Vue 3 application sends requests to the API and handles the "Visual Manifest."
2.  **API:** An Express server validates requests and communicates with the Database.
3.  **Storage:** * **Database:** Stores text data (Product specs, User credentials, Orders).
    * **Filesystem:** Stores physical image assets in an `uploads/` directory.

## ⚙️ Installation & Setup

### **Prerequisites**
* Node.js (v18+)
* MongoDB Atlas account or local MongoDB instance

### **1. Clone the Repository**
```bash
git clone [https://github.com/yourusername/shoporia.git](https://github.com/yourusername/shoporia.git)
cd shoporia
```
### **2. Backend Setup**
```bash
# Navigate to backend folder
cd backend
npm install
# Create a .env file and add your credentials:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000
# JWT_SECRET=your_secret_key
npm start
```
### **3. Frontend Setup**
```bash
# Navigate to frontend folder
cd frontend
npm install
# Run the development server
npm run dev
```
