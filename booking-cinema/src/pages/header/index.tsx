import { Col, Flex, Input, Typography, Dropdown, Menu } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import "./index.less";
import { useNavigate } from "react-router-dom";
import {
  actionRemoveStorage,
  getLocalStorageItem,
  localStorageKeys,
} from "../../utlis/localStorageUtil";
import { ROUTES } from "../../constants/routes";
import { notificationSuccess } from "../../components/notification/notification-provider";

function Header() {
  const navigate = useNavigate();

  const isLogin: boolean =
    getLocalStorageItem(localStorageKeys.IS_LOGIN) || false;

  const handleLogin = () => {
    if (!isLogin) {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "info") {
      console.log("Xem thông tin người dùng");
      // navigate("/profile");
    } else if (key === "logout") {
      console.log("Đăng xuất");
      actionRemoveStorage();
      navigate(ROUTES.LOGIN);
      notificationSuccess({ message: "Đăng xuất thành công" });
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          key: "info",
          label: "Thông tin",
          icon: <UserOutlined />,
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          label: "Đăng xuất",
          icon: <LogoutOutlined />,
        },
      ]}
      style={{
        borderRadius: 8,
        padding: "4px 0",
        background: "#2f2f2f",
        color: "white",
        minWidth: 160,
      }}
    />
  );

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
          <Flex align="center" gap={20}>
            {isLogin ? (
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                trigger={["click"]}
              >
                <Typography.Text
                  className="header-profile-text"
                  style={{ cursor: "pointer" }}
                >
                 Đông
                </Typography.Text>
              </Dropdown>
            ) : (
              <Typography.Text
                className="header-profile-text"
                onClick={handleLogin}
                style={{ cursor: "pointer" }}
              >
                Đăng nhập
              </Typography.Text>
            )}

            <Typography className="header-profile-text header-profile-language">
              VI | EN
            </Typography>
          </Flex>
        </Col>
      </Flex>
    </Col>
  );
}

export default Header;
