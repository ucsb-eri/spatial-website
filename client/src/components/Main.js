import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Header from './Header';
import About from '../pages/About';
import NavPages from './NavPages';
import Footer from './Footer';
import People from '../pages/People';
import Research from '../pages/Research';


function Main(props) {
  const [currentPage, setCurrentPage] = useState('About');
  
    // depending on what value currentPage has, render a different page
  const renderPage = () => {
    
    if (currentPage === 'About') {
      return <About />;
    }

    if (currentPage === 'Research') {
      return <Research />;
    }

    if (currentPage === 'Groups') {
      return <About />;
    }

    if (currentPage === 'People') {
      return <People />;
    }

    // if (currentPage === 'History') {
    //   return <About />;
    // }

  };
  
  const handlePageChange = (page) => setCurrentPage(page);
  const sections = [
      { title: 'About', url: '#', value: 'one' },
      { title: 'People', url: '#', value: 'two' },
      { title: 'Research', url: '#', value: 'three' },
      { title: 'History', url: '#', value: 'four' },
      { title: 'Recharge Center', url: '#', value: 'five' },
  ]
  return (
  
    <Container sx={{display: 'flex', flexDirection:'column', minHeight: '100vh', justifyContent: 'space-between'}}>
      <Container maxWidth={100}>
        <Header title={"Center for Spatial Studies and Data Science"} />
        <NavPages sections = {sections} handlePageChange={handlePageChange} />
      </Container>
      
      {renderPage()}
      <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />

    </Container>

      
      

  );
}

// Main.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.string).isRequired,
//   title: PropTypes.string.isRequired,
// };

export default Main;