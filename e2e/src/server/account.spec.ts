import axios from 'axios';

describe('GET /', () => {
  it('It should create an account', async () => {
    const input = {
      holder_name: 'John Doe',
      holder_dob: '1960-10-21',
      initial_balance: 100,
      type: 'checking'
    }
    const res = await axios.post(`/api/v1/accounts/create`, input);

    expect(res.status).toBe(201);
  });

  it('Fail validation', async () => {
    const input = {
    }
    const res = await axios.post(`/api/v1/accounts/create`, input);

    expect(res.status).toBe(400);
  });
});
