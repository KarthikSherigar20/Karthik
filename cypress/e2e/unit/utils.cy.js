// Example unit tests for utility functions
describe('Utility Functions', () => {
  it('validates email format', () => {
    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    expect(validateEmail('test@example.com')).to.be.true;
    expect(validateEmail('invalid-email')).to.be.false;
    expect(validateEmail('')).to.be.false;
  });

  it('formats API response', () => {
    const formatResponse = (data) => {
      return {
        success: true,
        data: data,
        timestamp: new Date().toISOString()
      };
    };

    const result = formatResponse({ id: 1, name: 'Test' });
    expect(result).to.have.property('success', true);
    expect(result).to.have.property('data');
    expect(result).to.have.property('timestamp');
  });

  it('builds query string', () => {
    const buildQuery = (params) => {
      return Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');
    };

    const query = buildQuery({ page: 1, limit: 10, search: 'test user' });
    expect(query).to.eq('page=1&limit=10&search=test%20user');
  });

  it('handles error responses', () => {
    const handleError = (error) => {
      return {
        success: false,
        message: error.message || 'Unknown error',
        code: error.code || 500
      };
    };

    const result = handleError({ message: 'Not found', code: 404 });
    expect(result.success).to.be.false;
    expect(result.message).to.eq('Not found');
    expect(result.code).to.eq(404);
  });
});