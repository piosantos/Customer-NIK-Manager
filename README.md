# ⛽ Customer NIK Manager - LPG 3Kg

A modern, privacy-first, offline-capable digital ledger designed specifically for subsidized 3Kg LPG retailers (pangkalan) in Indonesia. This tool helps you manage your customer NIKs, track weekly purchases, and streamline your transaction workflow with MyPertamina—all without ever sending your data to a server.

---

### ✨ Key Features

*   **👥 Full Customer Management:** Easily add, search, edit, and delete customer profiles (Name, NIK, Type, Notes).
*   **📈 Transaction Logging & Quota Tracking:**
    *   Log purchases with a single click.
    *   Automatically tracks weekly purchases against individual customer quotas (1 for Rumah Tangga, 2 for Usaha Mikro).
    *   Visual indicators turn customer cards **yellow** (partially met) or **green** (fully met) when quotas are reached.
*   **📜 Detailed History with Undo:** View a complete, time-stamped transaction history for any customer and easily undo accidental entries.
*   **🚀 One-Click MyPertamina Workflow:** A dedicated "Transaction" button copies the customer's NIK and opens the official MyPertamina verification portal in a new tab, saving you time and clicks.
*   **📂 CSV Import & Export:** Secure your data by exporting your entire customer list to a CSV file. Easily import data to get started or restore a backup.
*   **⚙️ Customizable Settings:** Adjust the total weekly quota for your base and set which day the sales week starts on (e.g., Monday).
*   **🔒 100% Private & Offline:** All your data is stored securely in your browser's `localStorage`. It never leaves your device and the app works perfectly without an internet connection.
*   **⌨️ Power-User Shortcuts:** Use `Ctrl+F` to instantly focus the search bar and `Ctrl+N` to start adding a new customer.
*   **📱 Responsive Design:** Works beautifully on desktops, tablets, and mobile phones.

---

### 🎨 User Interface Preview

Imagine a clean, card-based layout on a light gray background. At the top, a dashboard gives you an at-a-glance overview: **Total Customers**, **Transactions this Week / Base Quota**, and a breakdown by customer type. Below that, a powerful search and filter bar lets you find exactly who you're looking for.

The main area is a list of customer cards. Each card clearly displays:
- Customer's Name and Type (e.g., "Rumah Tangga")
- Formatted NIK (`xxxxxx-xxxxxx-xxxx`)
- A weekly purchase counter (`1/2`)
- Quick-action buttons for **Beli** (Log Purchase), **Transaksi** (MyPertamina), **Edit**, **Copy NIK**, and **Delete**.

The entire interface is designed for speed and clarity, helping you manage your daily operations efficiently.

---

### 🛠️ Tech Stack

This application is a pure front-end Progressive Web App (PWA) built with modern technologies:

*   **React:** For a dynamic and responsive user interface.
*   **TypeScript:** For robust, type-safe code.
*   **Tailwind CSS:** For a clean, utility-first design system.
*   **Browser `localStorage`:** For 100% client-side, offline data storage.

There is **no backend, no database, and no server**. It's just a set of static files you can run in any modern web browser.

---

### 🚀 Getting Started

Using the application is incredibly simple:

1.  **Open the App:** Simply open the `index.html` file in your web browser. The app will load directly from the pre-built `prebuilt/app.js` file.
2.  **Add Your First Customer:** Use the "Tambah Pelanggan Baru" form to add your customers' details. The app includes real-time NIK validation to prevent errors.
3.  **Log Purchases:** Click the **"Beli"** button on a customer's card to log a transaction for the current week.
4.  **Transact on MyPertamina:** When a customer is ready to buy, click the **"Transaksi"** button. Their NIK is instantly copied, and you're taken directly to the MyPertamina site to complete the official verification.
5.  **Backup Your Data:** Regularly use the **"Export Data"** button to save a CSV backup of your customer list.

---

### 🛡️ A Note on Privacy

Your customer's data is sensitive. This application was built with a **privacy-first** approach. By storing all information exclusively in your browser's `localStorage`, we ensure that:

*   **You are in complete control of your data.**
*   **No information is ever transmitted over the internet.**
*   **The application functions fully offline, anytime, anywhere.