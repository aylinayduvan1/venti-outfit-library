import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import OutfitDetails from './pages/OutfitDetails';
import AddOutfit from './pages/AddOutfit';
import ShowCase from './pages/ShowCase';
import EditOutfit from './pages/EditOutfit';
import Login from './pages/Login';
import PrivateRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      {/* Navbar sadece public veya private sayfalar için */}
      <Routes>
        {/* Full-page login, navbar yok */}
        <Route path="/login" element={<Login />} />

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