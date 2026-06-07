# Restful Booker API Automation Framework

A robust, enterprise-grade API automation testing framework built with **Playwright** and **TypeScript**. This project implements the **Page Object Model (POM)** pattern for API controllers, providing a scalable and maintainable architecture for comprehensive API testing of the Restful-Booker service.

**Table of Contents**
- [Overview](#overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Project Architecture](#project-architecture)
- [Test Coverage](#test-coverage)
- [Reporting](#reporting)
- [Debugging](#debugging)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

This framework automates testing of the **Restful-Booker API**, a comprehensive booking service API. It provides tools for validating API endpoints, request/response schemas, business logic, and integration workflows. The framework follows industry best practices for API test automation, including proper layering, data management, and comprehensive reporting.

### Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | Latest | Cross-browser API testing framework |
| **TypeScript** | 5.x | Type-safe code development |
| **Node.js** | 18+ | JavaScript runtime |
| **Allure** | 2.x | Advanced test reporting |
| **Husky** | Latest | Git hooks for code quality |
| **dotenv** | Latest | Environment variable management |

## Key Features

- ✅ **Page Object Model (POM)** – Decoupled API controllers for clean, maintainable, and reusable code
- ✅ **Type Safety** – Full TypeScript implementation with strict typing and comprehensive interfaces
- ✅ **Environment Management** – Secure credential handling using dotenv
- ✅ **Allure Reporting** – Rich, interactive dashboards with test history, trends, and detailed logs
- ✅ **Comprehensive Test Coverage** – Smoke, sanity, and regression test suites with detailed assertions
- ✅ **Data Factories** – Centralized test data management and booking creation utilities
- ✅ **Proper Assertions** – Schema validation, response code verification, and business logic checks
- ✅ **Git Hooks** – Husky integration for pre-commit code quality checks
- ✅ **CI/CD Ready** – Can be integrated into any CI/CD pipeline

## Project Structure

```text
restful-booker-api-automation/
├── controllers/              # API Controller Layer (POM Pattern)
│   ├── BaseController.ts      # Base class with common HTTP methods
│   ├── AuthController.ts      # Authentication endpoints
│   ├── CreateBookingController.ts
│   ├── GetBookingController.ts
│   ├── UpdateBookingController.ts
│   ├── DeleteBookingController.ts
│   └── PingController.ts      # Health check endpoint
├── models/                   # TypeScript Interfaces & Data Models
│   ├── AuthModel.ts           # Auth request/response types
│   ├── BookingModel.ts        # Booking data types
│   └── UpdateModel.ts         # Update operation types
├── tests/                    # Test Specifications (.spec.ts files)
│   ├── auth.spec.ts
│   ├── createBooking.spec.ts
│   ├── getBooking.spec.ts
│   ├── updateBooking.spec.ts
│   ├── deleteBooking.spec.ts
│   └── ping.spec.ts
├── utils/                    # Utilities & Test Data Factories
│   └── BookingTestData.ts     # Reusable test data and fixtures
├── artifacts/                # Test artifacts and logs
├── allure-results/           # Raw Allure test results
├── allure-report/            # Generated Allure HTML report
├── playwright-report/        # Playwright default HTML report
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
├── .env.example              # Example environment variables
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- **Node.js** – v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** – v9.0.0 or higher (included with Node.js)
- **Git** – For cloning the repository
- **IDE** – VS Code recommended with Playwright Test for VS Code extension

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/restful-booker-api-automation.git
   cd restful-booker-api-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize Git hooks (Husky):**
   ```bash
   npm run prepare
   ```

4. **Verify installation:**
   ```bash
   npx playwright --version
   ```

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# API Configuration
BASE_URL=https://restful-booker.herokuapp.com
API_TIMEOUT=30000

# Authentication
API_ADMIN_USER=admin
API_ADMIN_PASS=password123

# Logging
DEBUG=false
LOG_LEVEL=info
```

**Important:** Never commit the `.env` file to version control. Use `.env.example` as a template for your team.

### Playwright Configuration

The `playwright.config.ts` file contains:

- Test directory configuration
- Browser settings (Chromium, Firefox, WebKit)
- Timeout settings
- Reporter configuration (Allure, HTML)
- Parallel execution settings

## Running Tests

### NPM Scripts

| Command | Description | Tags |
|---------|-------------|------|
| `npm run test` | Run entire test suite | All tests |
| `npm run test:smoke` | Run smoke tests | `@smoke` |
| `npm run test:sanity` | Run sanity tests | `@sanity` |
| `npm run test:regression` | Run full regression suite | `@regression` |
| `npm run test:ui` | Run tests in UI mode (interactive) | All tests |
| `npm run test:debug` | Run with debug output | All tests |

### Running Specific Tests

```bash
# Run tests in a specific file
npx playwright test tests/auth.spec.ts

# Run tests matching a pattern
npx playwright test --grep "TC_001"

# Run tests with a specific tag
npx playwright test --grep "@smoke"

# Run a single test case
npx playwright test -g "Generate Auth Token Successfully"

# Run with specific browser
npx playwright test --project=chromium

# Run tests in headed mode (see browser)
npx playwright test --headed
```

### Test Execution Examples

```bash
# Run all smoke tests with verbose output
npm run test:smoke -- --reporter=verbose

# Run a specific spec file
npx playwright test tests/createBooking.spec.ts --headed

# Run in parallel with custom workers
npx playwright test --workers=3

# Run and generate Allure report
npm run test && npm run allure:report
```

## Project Architecture

### Controller Layer (Page Object Model)

Each controller corresponds to a set of related API endpoints:

**BaseController** – Common functionality
```typescript
// Example: Making API requests
protected async request(method, endpoint, payload?, token?)
```

**AuthController** – Authentication operations
```typescript
generateAuthToken(username: string, password: string): Promise<IAuthResponse>
```

**BookingControllers** – CRUD operations on bookings
```typescript
createBooking(payload: IBooking): Promise<IBookingResponse>
getBooking(bookingId: number, token?: string): Promise<IBooking>
updateBooking(bookingId: number, payload: Partial<IBooking>, token: string): Promise<IBooking>
deleteBooking(bookingId: number, token: string): Promise<void>
```

### Models Layer

TypeScript interfaces define the contract for API requests and responses:

```typescript
// BookingModel.ts
interface IBooking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
}

interface IBookingResponse {
  bookingid: number;
  booking: IBooking;
}
```

### Test Layer

Tests are organized by functionality with proper setup, execution, and assertion phases:

```typescript
test('TC_004: Create New Booking Successfully @smoke', async () => {
  // Arrange: Setup test data
  const bookingPayload = BookingTestData.getValidBookingData();
  
  // Act: Execute API call
  const response = await createBookingController.createBooking(bookingPayload);
  
  // Assert: Verify response
  expect(response.status()).toBe(200);
  expect(response.booking.firstname).toBe(bookingPayload.firstname);
});
```

## Test Coverage

### Coverage Breakdown

| Module | Test Cases | Status |
|--------|-----------|--------|
| **Authentication** | 2 | ✅ Complete |
| **Create Booking** | 2 | ✅ Complete |
| **Get Booking** | 2 | ✅ Complete |
| **Update Booking** | 2 | ✅ Complete |
| **Delete Booking** | 3 | ✅ Complete |
| **Ping/Health** | 1 | ✅ Complete |
| **Total** | **14** | ✅ Complete |

### Test Categories

- **Smoke Tests** (`@smoke`) – Critical path tests ensuring core functionality
- **Sanity Tests** (`@sanity`) – Basic validation tests
- **Regression Tests** (`@regression`) – Comprehensive test suite covering all scenarios
- **End-to-End** – Full workflow tests (e.g., Create → Read → Update → Delete)

## Reporting

### Allure Reports

Generate interactive Allure dashboards with metrics and analytics:

```bash
# Generate report from latest results
npm run allure:report

# Generate Allure report (manual)
npm run allure:generate

# Open existing report
npm run allure:open

# Clean and regenerate
npm run allure:clean && npm run allure:generate
```

**Allure Dashboard Features:**
- Test execution timeline and history
- Pass/fail statistics and trends
- Severity and priority breakdowns
- Detailed test steps with attachments
- Flaky test detection
- Duration analytics

### Playwright HTML Report

```bash
# Open the default Playwright HTML report
npx playwright show-report
```

## Debugging

### Debug Mode

Run tests with debug output:

```bash
# Enable Playwright inspector
npx playwright test --debug

# Run with verbose logging
npm run test:debug

# Run with trace recording
npx playwright test --trace on
```

### Viewing Traces

```bash
# After running with trace recording
npx playwright show-trace trace.zip
```

### Common Debugging Techniques

1. **Use `test.only()`** to run a single test:
   ```typescript
   test.only('Specific test', async () => { /* ... */ });
   ```

2. **Add console logs** for debugging:
   ```typescript
   console.log('Request payload:', payload);
   console.log('Response status:', response.status());
   ```

3. **Use Playwright Inspector:**
   ```bash
   PWDEBUG=1 npx playwright test
   ```

4. **Check network requests:**
   ```typescript
   await page.on('response', response => {
     console.log(`${response.status()} ${response.url()}`);
   });
   ```

## Contributing

### Code Standards

- Follow **TypeScript strict mode** rules
- Use **ES6+ syntax** for all new code
- Name test files with `.spec.ts` extension
- Tag all tests with appropriate categories (`@smoke`, `@sanity`, `@regression`)
- Write descriptive test names following: `TC_###: Description @tag`

### Commit Message Format

```
type(scope): subject

body

footer
```

Examples:
- `feat(auth): add token validation test`
- `fix(booking): resolve schema validation issue`
- `docs(readme): update installation steps`

### Pull Request Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "feat(scope): description"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

## Troubleshooting

### Common Issues

**Issue: `Cannot find module '@playwright/test'`**
```bash
# Solution: Install dependencies
npm install
```

**Issue: Tests timeout**
```bash
# Solution: Increase timeout in playwright.config.ts
timeout: 60000  // 60 seconds
```

**Issue: API connection refused**
```bash
# Verify BASE_URL in .env
# Check if API server is running
curl https://restful-booker.herokuapp.com/ping
```

**Issue: Allure report not generating**
```bash
# Clear cache and regenerate
npm run allure:clean
npm run allure:generate
```

**Issue: Tests pass locally but fail in CI/CD**
- Check Node.js version compatibility
- Verify environment variables are set in CI pipeline
- Review browser compatibility settings

### Getting Help

1. Check test logs in `allure-report/` or `playwright-report/`
2. Review error messages in terminal output
3. Enable debug mode: `npm run test:debug`
4. Check the [Playwright documentation](https://playwright.dev)

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Last Updated:** June 2026
**Framework Version:** 1.0.0
