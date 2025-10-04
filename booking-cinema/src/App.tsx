import "./App.css";
import Header from "./pages/header";
import { Routes, Route } from "react-router-dom";
import BookingPage from "./pages/booking";
import ChooseCornPage from "./pages/Choose-Corn";
import LoginPage from "./pages/login";
import TwoLevelMenu from "./components/Menu";
import MovieCarousel from "./components/Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <>
      <Header />

      <TwoLevelMenu
        items={[
          { key: "schedule", label: "Lịch chiếu" },
          {
            key: "movies",
            label: "Phim",
            children: [
              { key: "now-showing", label: "Phim đang chiếu" },
              { key: "coming-soon", label: "Phim sắp chiếu" },
            ],
          },
          { key: "theaters", label: "Cụm rạp" },
          { key: "promotions", label: "Ưu đãi" },
          { key: "services", label: "Dịch vụ" },
          { key: "members", label: "Thành viên" },
        ]}
        onSelect={(k) => console.log("menu select", k)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <MovieCarousel />
            </>
          }
        />
        <Route path={ROUTES.BOOKING} element={<BookingPage />} />
        <Route path={ROUTES.CHOOSE_CORN} element={<ChooseCornPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
