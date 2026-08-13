import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquireModal from './components/EnquireModal';
import CompareDrawer from './components/CompareDrawer';

// Pages
import Home from './pages/Home';
import BikesLanding from './pages/BikesLanding';
import Scooters from './pages/Scooters';
import GearBikes from './pages/GearBikes';
import CarsLanding from './pages/CarsLanding';
import OldModelCars from './pages/OldModelCars';
import TopModelCars from './pages/TopModelCars';
import VehicleDetail from './pages/VehicleDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes({ favoritesList, handleToggleFavorite, handleOpenEnquire, handleToggleCompare, comparedList }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route
            path="/"
            element={
              <Home
                onToggleFavorite={handleToggleFavorite}
                favoritesList={favoritesList}
                onOpenEnquire={handleOpenEnquire}
                onToggleCompare={handleToggleCompare}
                comparedList={comparedList}
              />
            }
          />
          <Route
            path="/bikes"
            element={
              <BikesLanding
                onToggleFavorite={handleToggleFavorite}
                favoritesList={favoritesList}
                onOpenEnquire={handleOpenEnquire}
                onToggleCompare={handleToggleCompare}
                comparedList={comparedList}
              />
            }
          />
          <Route
            path="/bikes/scooters"
            element={
              <Scooters
                onToggleFavorite={handleToggleFavorite}
                favoritesList={favoritesList}
                onOpenEnquire={handleOpenEnquire}
                onToggleCompare={handleToggleCompare}
                comparedList={comparedList}
              />
            }
          />
          <Route
            path="/bikes/gear-bikes"
            element={
              <GearBikes
                onToggleFavorite={handleToggleFavorite}
                favoritesList={favoritesList}
                onOpenEnquire={handleOpenEnquire}
                onToggleCompare={handleToggleCompare}
                comparedList={comparedList}
              />
            }
          />
          <Route
            path="/cars"
            element={
              <CarsLanding
                onToggleFavorite={handleToggleFavorite}
                favoritesList={favoritesList}
                onOpenEnquire={handleOpenEnquire}
                onToggleCompare={handleToggleCompare}
                comparedList={comparedList}
              />
            }
          />
          <Route
            path="/cars/old-models"
            element={
              <OldModelCars
                onToggleFavorite={handleToggleFavorite}
                favoritesList={favoritesList}
                onOpenEnquire={handleOpenEnquire}
                onToggleCompare={handleToggleCompare}
                comparedList={comparedList}
              />
            }
          />
          <Route
            path="/cars/top-models"
            element={
              <TopModelCars
                onToggleFavorite={handleToggleFavorite}
                favoritesList={favoritesList}
                onOpenEnquire={handleOpenEnquire}
                onToggleCompare={handleToggleCompare}
                comparedList={comparedList}
              />
            }
          />
          <Route
            path="/vehicle/:type/:id"
            element={
              <VehicleDetail
                onToggleFavorite={handleToggleFavorite}
                favoritesList={favoritesList}
                onOpenEnquire={handleOpenEnquire}
                onToggleCompare={handleToggleCompare}
                comparedList={comparedList}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [favoritesList, setFavoritesList] = useState([]);
  const [comparedList, setComparedList] = useState([]);
  const [enquireVehicle, setEnquireVehicle] = useState(null);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);

  const handleToggleFavorite = (vehicle) => {
    setFavoritesList((prev) => {
      const exists = prev.some((v) => v.id === vehicle.id);
      if (exists) return prev.filter((v) => v.id !== vehicle.id);
      return [...prev, vehicle];
    });
  };

  const handleToggleCompare = (vehicle) => {
    setComparedList((prev) => {
      const exists = prev.some((v) => v.id === vehicle.id);
      if (exists) return prev.filter((v) => v.id !== vehicle.id);
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 vehicles side-by-side.');
        return prev;
      }
      return [...prev, vehicle];
    });
  };

  const handleRemoveCompare = (id) => {
    setComparedList((prev) => prev.filter((v) => v.id !== id));
  };

  const handleClearCompare = () => {
    setComparedList([]);
  };

  const handleOpenEnquire = (vehicle) => {
    setEnquireVehicle(vehicle);
    setIsEnquireOpen(true);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0a0a0c] text-gray-100 flex flex-col selection:bg-[#ff5500] selection:text-white font-['Plus_Jakarta_Sans'] overflow-x-hidden">
        
        {/* Sticky Header Navbar */}
        <Navbar wishlistCount={favoritesList.length} />

        {/* Animated Main Content */}
        <main className="flex-1">
          <AnimatedRoutes
            favoritesList={favoritesList}
            handleToggleFavorite={handleToggleFavorite}
            handleOpenEnquire={handleOpenEnquire}
            handleToggleCompare={handleToggleCompare}
            comparedList={comparedList}
          />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Enquire / Contact Seller Modal */}
        <EnquireModal
          vehicle={enquireVehicle}
          isOpen={isEnquireOpen}
          onClose={() => setIsEnquireOpen(false)}
        />

        {/* Global Side-by-Side Compare Drawer */}
        <CompareDrawer
          comparedVehicles={comparedList}
          onRemoveCompare={handleRemoveCompare}
          onClearCompare={handleClearCompare}
        />
      </div>
    </Router>
  );
}
