import { Routes, Route } from 'react-router-dom';
import Home from 'pages/home/Home';
import Favorites from 'pages/favorite/Favorites';
import Navbar from 'components/layout/Navbar';
import OutfitDetails from 'pages/outfits/OutfitDetails';
import AddOutfit from 'pages/outfits/AddOutfit';
import ShowCase from 'pages/showcase/ShowCase';
import EditOutfit from 'pages/outfits/EditOutfit';
import Login from 'pages/auth/Login';
import PrivateRoute from 'components/common/ProtectedRoute';
import Register from 'pages/auth/Register';

function App() {
  return (
    <>
      {/* Navbar sadece public veya private sayfalar için */}
      <Routes>
        {/* Full-page login, navbar yok */}
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register/>}  />

        {/* Public ana sayfa */}
        <Route path="/" element={<><Navbar /><Home /></>} />

        {/* Private sayfalar */}
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Favorites />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/outfit/:id"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <OutfitDetails />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/add"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <AddOutfit />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/showcase"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <ShowCase />
              </>
            </PrivateRoute>
          }
        />

        <Route
          path="/outfit/:id/edit"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <EditOutfit />
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;