import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home'
import WishlistPage from "./pages/WishlistPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist-page" element={<WishlistPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
