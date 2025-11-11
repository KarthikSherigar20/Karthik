# Cypress API Testing Framework

Complete API automation testing with Cypress including unit, integration, and mocking tests.

## 🚀 Quick Start

```bash
npm install
npm run cy:open
```

## 📁 Structure

```
cypress/
├── e2e/
│   ├── api/           # API tests
│   ├── integration/   # Integration tests  
│   └── unit/          # Unit tests
├── fixtures/          # Test data
└── support/           # Commands & config
```

## 🧪 Test Types

- **API Tests**: CRUD operations, validation, security
- **Integration**: End-to-end workflows
- **Unit Tests**: Utility functions
- **Mocking**: Response simulation, network conditions

## 🔧 Commands

```bash
npm run test:api         # API tests only
npm run test:integration # Integration tests
npm run test:unit        # Unit tests
npm run cy:run          # All tests headless
```

## ⚙️ Configuration

Update `cypress.config.js`:
```javascript
env: {
  apiUrl: 'your-api-url',
  authUrl: 'your-auth-url'
}
```

## 🎯 Edge Cases

- SQL injection protection
- XSS payload handling  
- Large payload limits
- Authentication security
- Rate limiting
- Network timeouts
- Concurrent operations