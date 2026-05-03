I’ve updated the `README.md` to remove those specific sections and signatures while maintaining the high-quality SDET structure for the project.

---

# Restful-Booker Playwright API Automation

This is an industry-standard API automation framework built with **Playwright** and **TypeScript**. It leverages a **Page Object Model (POM)** approach for API controllers, ensuring a scalable and maintainable architecture for testing the Restful-Booker API.

## 🚀 Key Features

*   **Page Object Model (POM)**: Decoupled API controllers for clean, reusable code logic.
*   **Environment Management**: Secure configuration using `dotenv` to manage sensitive credentials.
*   **Allure Reporting**: High-level dashboards providing severity levels, tags, and execution steps.
*   **Type Safety**: Full TypeScript implementation with strict type checking via `tsconfig.json`.
*   **Dynamic Data Factory**: Centralized test data and credential management in `BookingTestData.ts`.

## 🛠️ Project Structure

```text
restful-booker-playwright/
├── controllers/          # API Controllers (POM)
├── lib/                  # Fixtures and Base configuration
├── models/               # TypeScript Interfaces/Models
├── tests/                # Test specifications (.spec.ts)
├── utils/                # Data factories and Utilities
├── allure-results/       # Raw Allure data
├── playwright-report/    # Standard Playwright HTML report
├── .env                  # Environment variables (Git ignored)
└── playwright.config.ts  # Playwright global configuration
```

## 💻 Getting Started

### Prerequisites
*   **Node.js**: v18 or higher
*   **npm**: v9 or higher

### Installation
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Initialize Husky for Git hooks:
    ```bash
    npm run prepare
    ```

### Environment Configuration
Create a `.env` file in the root directory and add your credentials:
```env
BASE_URL=https://restful-booker.herokuapp.com
API_ADMIN_USER=your_admin_user
API_ADMIN_PASS=your_admin_password
```

## 🧪 Running Tests

We use tags to categorize the test suite for efficient execution via NPM scripts:

| Command | Description |
| :--- | :--- |
| `npm run test` | Run all tests in the suite |
| `npm run test:smoke` | Run critical smoke tests tagged with `@smoke` |
| `npm run test:regression` | Run the full regression suite tagged with `@regression` |
| `npm run test:ui` | Open Playwright UI Mode for interactive debugging |

## 📊 Reporting

### Allure Dashboard
To generate and view the visual Allure dashboard:
```bash
# Generate and open the report
npm run allure:report

# Manual generation
npm run allure:generate
npm run allure:open
```

---
**Author**: Sumeet Shah
```