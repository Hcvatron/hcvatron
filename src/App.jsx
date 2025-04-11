import React from 'react';
import Container from './container/Container';
import './assets/style.css'
import { LocalProvider } from './context/LocalContext';
import { ProductProvider } from './context/ProductContext';
import { MetadataProvider } from './context/Metadatacontext';
import { AdminProvider } from './context/AdminContext';
import { UserProvider } from './context/UserContext';


// const RedirectComponent = () => {
//   useEffect(() => {
//     document.body.style.display = 'none';
//     window.location.href = 'https://tastefusion.life/'; 
//   }, []);

//   return null; 
// };


function App() {
  return (
    <div>
      {/* <RedirectComponent /> */}
      <AdminProvider >
      <MetadataProvider >
      <LocalProvider >
      <ProductProvider >
        <UserProvider >
      <Container />
      </UserProvider>
      </ProductProvider>
      </LocalProvider>
      </MetadataProvider>
      </AdminProvider>
    </div>
  );
}

export default App;
