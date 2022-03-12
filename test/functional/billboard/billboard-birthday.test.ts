describe('billboard tests', () => {
  it('should be able to get billboard top100', async () => {
    const response = await global.testRequest.get('/api/billboard-birthday/top-hundred?date=2000-02-06');
    expect(response.status).toBe(200);
  });
});
