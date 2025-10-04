import { Col, Flex, Input, Typography } from "antd";
import logo from "../../assets/images/logo.png";
import { SearchOutlined } from "@ant-design/icons";
import "./index.less";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogin = () => {
  navigate("login");
  }
  return (
    <Col>
      <Flex justify="space-between" align="center">
        <Col>
          <img src={logo} className="header-logo" />
        </Col>
    

        <Col className="header-search">
          <Input
            suffix={<SearchOutlined />}
            placeholder="Tìm tên phim, diễn viên, đạo diễn,..."
            className="header-search-input"
          />
        </Col>
        <Col className="header-profile">
          <Flex align="center">
            <Typography className="header-profile-text" onClick={handleLogin}>Dong</Typography>
            <Typography className="header-profile-text header-profile-language">VI | EN</Typography>
          </Flex>
        </Col>
      </Flex>
    </Col>
  );
}

export default Header;
