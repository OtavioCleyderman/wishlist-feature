import React from 'react'
import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Header from './components/Header'
import Logo from './components/Logo'
import Nav from './components/Nav';
import SearchBar from './components/SearchBar';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import WishlistPage from './pages/WishlistPage';
import Loading from './components/Loading'
import { MemoryRouter } from 'react-router-dom';



describe('Logo Component', () => {
  it('should render logo with title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    expect(getByText('MagaNets')).toBeInTheDocument();
  });

  it('should redirect to home page when clicking on logo', () => {
   const { getByRole } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
  
    const logoLink = getByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');
   
    userEvent.click(logoLink)
    expect(window.location.pathname).toEqual('/');
  });
})

describe('Nav Component', () => {
  it('renders Nav component with 3 items', () => {
    const { getAllByRole } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
    );
    const navItems = getAllByRole('link');
    expect(navItems.length).toBe(3);
  });
});



describe('SearchBar Component', () => {
  test('renders SearchBar component with search input', () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const searchInput = getByPlaceholderText('Busca');
    expect(searchInput).toBeInTheDocument();
  });

  test('should update search value on input change', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onSearch={onSearch} />);
    const searchInput = getByPlaceholderText('Busca');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(onSearch).toHaveBeenCalledWith('test');
  });
});


describe('NavBar Component', () => {
  test('renders NavBar component with Nav and SearchBar components', () => {
    const { getByTestId } = render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
    );
    const nav = getByTestId('nav');
    const searchBar = getByTestId('search-bar');
    expect(nav).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
  });
});



describe('Header Component', () => {
  test('renders Header component with Logo and NavBar components', () => {
    const { getByTestId } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
    );
    const logo = getByTestId('logo');
    const navBar = getByTestId('navbar');
    expect(logo).toBeInTheDocument();
    expect(navBar).toBeInTheDocument();
  });
});


describe('Home Page', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays loading message', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays filtered products', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const input = screen.getByRole('searchbox');
    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'));

    fireEvent.change(input, { target: { value: 'air' } });
    expect(await screen.findByText(/Air/)).toBeInTheDocument();
  });

  it('adds a product to the wishlist', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const favButton = await screen.findAllByRole('addWishlist');
    favButton.map(item => {
      fireEvent.click(item);
    })
    expect(JSON.parse(localStorage.getItem('wishlist'))).toHaveLength(17);
  });


  it('updates the favorite icon after clicking it', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  
    const favButtons = await screen.findAllByRole('addWishlist');

    favButtons.forEach(async (favButton) => {
      fireEvent.click(favButton);
  
      const favIcons = await waitFor(() => {
        screen.queryAllByTestId('fav-icon');
      }) 

      favIcons.forEach((favIcon) => {
        expect(favIcon).toHaveAttribute('fill', 'red');
      });
  
      fireEvent.click(favButton);
  
      favIcons.forEach((favIcon) => {
        expect(favIcon).toHaveAttribute('fill', 'white');
      });
    });

  });

});


describe('WishlistPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );
  });

  it('displays the no wishlist message when there are no items in the wishlist', () => {
    render(
    <MemoryRouter>
      <WishlistPage />
    </MemoryRouter>
    );
    expect(screen.getByText(/Sem itens em sua lista de desejos no momento!/i)).toBeInTheDocument();
  });

  it('displays wishlist items when there are items in the wishlist', () => {
    const mockWishlist = [
      {
        id: 1,
        title: 'Test Product 1',
        image: 'test-image-1.jpg',
        price: 10.99
      },
      {
        id: 2,
        title: 'Test Product 2',
        image: 'test-image-2.jpg',
        price: 20.99
      }
    ];
    localStorage.setItem('wishlist', JSON.stringify(mockWishlist));
    render(
    <MemoryRouter>
      <WishlistPage />
    </MemoryRouter>
    );
    expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Product 2/i)).toBeInTheDocument();
  });

  it('removes an item from the wishlist when delete button is clicked', () => {
    const mockWishlist = [
      {
        id: 1,
        title: 'Test Product 1',
        image: 'test-image-1.jpg',
        price: 10.99
      },
      {
        id: 2,
        title: 'Test Product 2',
        image: 'test-image-2.jpg',
        price: 20.99
      }
    ];
    localStorage.setItem('wishlist', JSON.stringify(mockWishlist));
    render(
    <MemoryRouter>
      <WishlistPage />
    </MemoryRouter>
    );
    const deleteButton = screen.getAllByTestId('delete-button')[0];
    fireEvent.click(deleteButton);
    expect(screen.queryByText(/Test Product 1/i)).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('wishlist'))).toEqual([
      {
        id: 2,
        title: 'Test Product 2',
        image: 'test-image-2.jpg',
        price: 20.99
      }
    ]);
  });

  test('should filter favorites by search term', () => {
    
    const favorites = [
      { id: 1, title: 'Product 1', price: 9.99, image: 'image1.jpg' },
      { id: 2, title: 'Product 2', price: 19.99, image: 'image2.jpg' },
      { id: 3, title: 'Product 3', price: 29.99, image: 'image3.jpg' },
    ];
    localStorage.setItem('wishlist', JSON.stringify(favorites));
    render(
    <MemoryRouter>
      <WishlistPage />
    </MemoryRouter>
    );
  
    const searchInput = screen.getByPlaceholderText('Busca');
    fireEvent.change(searchInput, { target: { value: 'duct 2' } });
  
    const productTitles = screen.getAllByTestId('product-title');
    expect(productTitles.length).toBe(1);
    expect(productTitles[0]).toHaveTextContent('Product 2');
  });


});





