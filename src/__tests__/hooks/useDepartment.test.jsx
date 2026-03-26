import { renderHook } from '@testing-library/react-hooks';
import { useDepartment } from '../../hooks/useDepartment';

describe('useDepartment', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should load data and set loading false', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ people: { staff: [], students: [] } }));
    const { result, waitForNextUpdate } = renderHook(() => useDepartment('cse'));
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.dept).toEqual({ people: { staff: [], students: [] });
  });

  it('should set error on fetch error', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));
    const { result, waitForNextUpdate } = renderHook(() => useDepartment('cse'));
    await waitForNextUpdate();
    expect(result.current.error).toBeTruthy();
  });
});