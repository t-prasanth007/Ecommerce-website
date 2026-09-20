# 🛒 ApexGizmo - E-Commerce Web Application

**ApexGizmo** is a fully functional, highly interactive front-end e-commerce web application built entirely using core web technologies. The project replicates a modern online shopping experience, featuring a dynamic product catalog, state-persistent cart management, dark mode synchronization across multiple views, and simulated backend mechanics like localized order tracking, complaint management, and vendor product listing.

---

## 📋 Table of Contents

- [Features](#-features)
- [Webpage Architecture](#-webpage-architecture)
- [Storage Architecture](#%EF%B8%8F-storage-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [How to Use](#-how-to-use)

---

## ✨ Features

* **Toggleable Search Interface:** Clicking the search icon dynamically slides/opens the search bar adjacent to it. Clicking the icon a second time hides the bar from view.
* **Instant Product Search:** Global search functionality that filters through product catalog cards in real time as the user types.
* **Global Dark Mode Toggle:** Persistent light/dark mode switch in the header that automatically applies and retains across all 6 main pages and sub-pages.
* **Persistent Cart Management:** Add items to the cart directly from the shop or item details view. Dynamically increase/decrease quantities with automatic price and subtotal updates.
* **Interactive Vendor Portal (Sell Page):** Multi-input form allowing users to create new listings, which automatically append new functional product cards directly onto the Shop page.
* **Dynamic Checkout Experience:** Generates randomized unique Order IDs, processes total billing values, and maps out finalized order summaries.
* **Live Notification Alerts:** Dropdown interface signaling standard "No recent notification" or updating to highlight details of the last compiled order.
* **Account User Interface:** Responsive pop-up box providing quick profile settings, Order Tracking routing, and simulated log-out capabilities.
* **Contextual Feedback Handling:** A dedicated customer portal saving contact and complaint tickets for administrative logging.

---

## 🗺️ Webpage Architecture

The application contains **six primary navigation modules** alongside deeply integrated contextual workflows:

1. **Home Page (`home.html`):** The primary hub featuring promotional sections and highlighted "Trending Gadgets".
2. **Shop Page (`shop.html`):** The complete product gallery featuring dynamic catalog generation, detail-view access routing, and direct add-to-cart prompts.
3. **Product Detail View (`product-details.html`):** Expanded item descriptions with contextual "Add to Cart" and fast-track "Buy Now" triggers.
4. **Cart Page (`cart.html`):** Tabular management overview showing selected product summaries, quantities, and automated subtotal matrices.
5. **Checkout Page (`checkout.html`):** Order finalization portal documenting active billing receipts, generated Order IDs, and delivery structures.
6. **Sell Page (`sell.html`):** A creator/vendor form allowing real-time injection of client-side assets to expand the shop's marketplace.
7. **About Page (`about.html`):** Background information regarding the corporate overview of ApexGizmo.
8. **Contact Page (`contact.html`):** Customer service touchpoint embedded with validation frameworks for capturing support tickets.

---

## ⚙️ Storage Architecture

The application bypasses traditional databases by leveraging native client-side storage structures to maintain cross-page continuity:

### 💾 `localStorage` (Long-Term Persistence)
* **Theme Configuration:** Stores active UI themes (`light` vs `dark`) so user preferences remain consistent across browser restarts.
* **Cart Arrays:** Keeps tracked product objects, pricing, and selected quantities saved across browsing sessions.
* **Complaint Log Data:** Aggregates user feedback and support forms natively for consistent retention.
* **Order History Map:** Archival storage holding comprehensive receipt lists and order tracking metrics.

### ⏳ `sessionStorage` (Temporary Session Scopes)
* **Product Detail Pointer:** Temporarily passes unique IDs or item records to ensure the dedicated product detail viewport renders the correct asset upon click without bloating local space.

---

## 🛠️ Tech Stack

* **Structure:** HTML5
* **Styling & Layout:** CSS3
* **Behavior & State Control:** Vanilla JavaScript (ES6+)

---

## 🚀 Getting Started

Follow these steps to run the application locally on your computer.

### Prerequisites
You only need a modern web browser installed (such as Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).

### Installation & Launch

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   ```
2. **Navigate into the directory:**
   ```bash
   cd your-repo-name
   ```
3. **Execute the interface:**
   Open `home.html` directly in your web browser, or use the **Live Server** extension in Visual Studio Code to launch a localized development host.

---
## Screenshots

<img width="1366" height="728" alt="image" src="https://github.com/user-attachments/assets/5157614f-d932-4e18-a26a-8d22f257eb7a" />

<img width="1366" height="728" alt="image" src="https://github.com/user-attachments/assets/366ad132-e4f9-4674-8669-3e68d2dadd10" />

<img width="1366" height="728" alt="image" src="https://github.com/user-attachments/assets/abbd81a3-86f2-49b9-9df9-a9e7beabc018" />


<img width="1366" height="728" alt="image" src="https://github.com/user-attachments/assets/35723e81-4fa9-4e34-8e67-f17e5d88ed5e" />



## 💡 How to Use

* **Using the Search:** Click the search icon in the header to reveal the search input field. Type your query to instantly filter items in the catalog. Click the icon again to collapse and close the search bar.
* **Adding Products:** Navigate to **Shop**, click **Add to Cart** on a product card, or open a card to click **Buy Now** to bypass standard shopping phases.
* **Simulating Vendor Lists:** Open the **Sell** view, enter dummy product parameters (Title, Price, Category), hit submit, and verify its insertion on the **Shop** page.
* **Tracking Orders:** Finalize an order on the **Checkout** page. Afterward, click the notification bell icon to review your latest order summary, or click your profile avatar to locate the order map tracker.
