import { render, screen, waitFor } from '@testing-library/react';
import DepartmentPeople from '../../modules/department/pages/DepartmentPeople';

// Mocking fetch for department JSON
beforeAll(() => {
  window.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('DepartmentPeople component', () => {
  const deptData = {
    people: {
      staff: [{ name: 'Alice', photo: 'alice.jpg', designation: 'Staff' }],
      students: [{ name: 'Bob', photo: 'bob.jpg', designation: 'Student' }],
    },
  };

  const facultyData = {
    data: { listFaculty: { items: [{ facultyId: '1', name: 'Prof X', designation: 'Professor' }] } },
  };

  it('renders faculty, staff and students', async () => {
    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => deptData })
      .mockResolvedValueOnce({ ok: true, json: async () => facultyData });
    render(<DepartmentPeople deptId="cse" />);
    expect(await screen.findByText('Faculty')).toBeInTheDocument();
    expect(await screen.findByText('Staff')).toBeInTheDocument();
    expect(await screen.findByText('Students')).toBeInTheDocument();
    expect(await screen.findByText('Prof X')).toBeInTheDocument();
    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(await screen.findByText('Bob')).toBeInTheDocument();
  });

  it('shows loading and empty states', async () => {
    // No faculty returned
    fetch
      .mockResolvedValueOnce({ ok: true, json: async () => deptData })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ data: { listFaculty: { items: [] } } }) });
    render(<DepartmentPeople deptId="cse" />);
    expect(await screen.findByText('Loading faculty...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('No faculty found')).toBeInTheDocument();
    });
  });
});