import { Col } from "antd";
import "./App.css";
import Header from "./pages/header";
// import BookingPage from './pages/booking'
// import ChooseCornPage from './pages/Choose-Corn'
import LoginPage from "./pages/login";
import TwoLevelMenu from "./components/Menu";

function App() {
  return (
    <>
      <Header />
      <Col style={{ flex: 1 }}>
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
      </Col>
      <LoginPage />
    </>
  );
}

export default App;
