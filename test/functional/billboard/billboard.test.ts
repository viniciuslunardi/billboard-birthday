describe('billboard tests', () => {
  it('should be able to get billboard top100', async () => {
    const response = await global.testRequest.get('/api/billboard/top-hundred');
    expect(response.status).toBe(200);
  });
});
