import { renderHook } from '@testing-library/react-hooks';
import { useAppSync } from '../../hooks/useAppSync';
import { API_URL, API_KEY } from '../../services/api';

jest.mock('../../services/api', () => ({
  API_URL: 'https://mock.api/graphql',
  API_KEY: 'mock-key',
}));

describe('useAppSync', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch data and set loading false', async () => {
    const mockResult = { data: { listFaculty: { items: [{ facultyId: '1', name: 'John' }] } };
    fetchMock.mockResponseOnce(JSON.stringify(mockResult));
    const { result, waitForNextUpdate } = renderHook(() => useAppSync(`query {}`));
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockResult.data);
  });

  it('handles error', async () => {
    fetchMock.mockRejectOnce(new Error('fetch fail'));
    const { result, waitForNextUpdate } = renderHook(() => useAppSync(`query {}`));
    await waitForNextUpdate();
    expect(result.current.error).toBeTruthy();
  });
});