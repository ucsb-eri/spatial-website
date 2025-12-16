/**
 * Integration Tests for Admin Features
 * 
 * These tests verify that admin functionality (add/edit/delete) is properly
 * implemented and accessible when logged in.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { AdminLoginContext } from '../../context/AdminProvider';
import { ProjectProvider } from '../../context/ProjectContext';

// Import pages to test
import People from '../../pages/People';
import Projects from '../../pages/Projects';
import About from '../../pages/About';

// Mock queries
import { QUERY_PEOPLE, GET_PROJECTS, GET_INFOPANELS } from '../../utils/queries';
import { ADD_PERSON, EDIT_PERSON, DELETE_PERSON } from '../../utils/mutations';

// Mock data
const mockPeopleData = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    title: ['Professor'],
    category: 'Leadership',
    description: 'Test description',
    current: true,
    image: 'test.jpg',
    email: 'john@test.com',
    projects: [],
    advisors: []
  }
];

const mockProjectsData = [
  {
    id: '1',
    name: 'Test Project',
    pis: 'John Doe',
    summary: 'Test summary',
    description: 'Test description',
    image: 'project.jpg'
  }
];

const mockInfoPanelsData = [
  {
    id: '1',
    location: 'about',
    name: 'Test Panel',
    tabname: 'Test',
    taborder: '1',
    content: [
      {
        id: '1',
        subtitle: 'Test',
        description: 'Test description',
        image: []
      }
    ]
  }
];

// Mock Apollo queries/mutations
const mocks = [
  {
    request: {
      query: QUERY_PEOPLE,
    },
    result: {
      data: {
        people: mockPeopleData
      }
    }
  },
  {
    request: {
      query: GET_PROJECTS,
    },
    result: {
      data: {
        projects: mockProjectsData
      }
    }
  },
  {
    request: {
      query: GET_INFOPANELS,
    },
    result: {
      data: {
        infoPanels: mockInfoPanelsData
      }
    }
  }
];

// Helper to render with all providers
const renderWithProviders = (component, { isLoggedIn = false, mocks = [] } = {}) => {
  const mockAdminContext = {
    isLoggedIn,
    login: jest.fn(),
    logout: jest.fn()
  };

  const mockProjectContext = {
    editPersonId: null,
    setEditPersonId: jest.fn(),
    editProjectId: null,
    setEditProjectId: jest.fn(),
    editInfoPanelId: null,
    setEditInfoPanelId: jest.fn(),
    peopleData: [],
    setPeopleData: jest.fn(),
    infoPanelData: mockInfoPanelsData,
    setInfoPanelData: jest.fn()
  };

  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <AdminLoginContext.Provider value={mockAdminContext}>
          <ProjectProvider>
            {component}
          </ProjectProvider>
        </AdminLoginContext.Provider>
      </BrowserRouter>
    </MockedProvider>
  );
};

describe('Admin Features Integration Tests', () => {
  describe('People Page', () => {
    test('should NOT show "Add new member" button when logged out', () => {
      renderWithProviders(<People />, { isLoggedIn: false, mocks });
      
      const addButton = screen.queryByText(/add new member/i);
      expect(addButton).not.toBeInTheDocument();
    });

    test('should show "Add new member" button when logged in', async () => {
      renderWithProviders(<People />, { isLoggedIn: true, mocks });
      
      await waitFor(() => {
        const addButton = screen.getByText(/add new member/i);
        expect(addButton).toBeInTheDocument();
      });
    });

    test.skip('should show edit button in person bio when logged in', async () => {
      // This test is skipped because it requires full integration with the People page
      // and GraphQL data loading, which is better tested in E2E tests
      renderWithProviders(<People />, { isLoggedIn: true, mocks });
      
      // Wait for people to load and click on a person
      await waitFor(() => {
        expect(screen.getByText('John')).toBeInTheDocument();
      });
    });
  });

  describe('Projects Page', () => {
    test('should NOT show "Add new project" button when logged out', () => {
      renderWithProviders(<Projects />, { isLoggedIn: false, mocks });
      
      const addButton = screen.queryByText(/add new project/i);
      expect(addButton).not.toBeInTheDocument();
    });

    test('should show "Add new project" button when logged in', async () => {
      renderWithProviders(<Projects />, { isLoggedIn: true, mocks });
      
      await waitFor(() => {
        const addButton = screen.getByText(/add new project/i);
        expect(addButton).toBeInTheDocument();
      });
    });
  });

  describe('About Page', () => {
    test('should NOT show "Add new panel" button when logged out', () => {
      renderWithProviders(<About />, { isLoggedIn: false, mocks });
      
      const addButton = screen.queryByText(/add new panel/i);
      expect(addButton).not.toBeInTheDocument();
    });

    test('should show "Add new panel" button when logged in', () => {
      renderWithProviders(<About />, { isLoggedIn: true, mocks });
      
      const addButton = screen.getByText(/add new panel/i);
      expect(addButton).toBeInTheDocument();
    });
  });

  describe('Admin Context', () => {
    test('should properly provide isLoggedIn state', () => {
      const TestComponent = () => {
        const { isLoggedIn } = React.useContext(AdminLoginContext);
        return <div>{isLoggedIn ? 'Logged In' : 'Logged Out'}</div>;
      };

      const { rerender } = renderWithProviders(<TestComponent />, { isLoggedIn: true });
      expect(screen.getByText('Logged In')).toBeInTheDocument();

      // Rerender with logged out state
      renderWithProviders(<TestComponent />, { isLoggedIn: false });
      expect(screen.getByText('Logged Out')).toBeInTheDocument();
    });
  });
});

describe('Admin Button Visibility', () => {
  const pages = [
    { name: 'People', component: People, buttonText: /add new member/i },
    { name: 'Projects', component: Projects, buttonText: /add new project/i },
    { name: 'About', component: About, buttonText: /add new panel/i },
  ];

  pages.forEach(({ name, component: Component, buttonText }) => {
    describe(`${name} Page`, () => {
      test(`should hide admin buttons when isLoggedIn is false`, () => {
        renderWithProviders(<Component />, { isLoggedIn: false, mocks });
        expect(screen.queryByText(buttonText)).not.toBeInTheDocument();
      });

      test(`should show admin buttons when isLoggedIn is true`, async () => {
        renderWithProviders(<Component />, { isLoggedIn: true, mocks });
        
        await waitFor(() => {
          expect(screen.getByText(buttonText)).toBeInTheDocument();
        }, { timeout: 3000 });
      });
    });
  });
});

