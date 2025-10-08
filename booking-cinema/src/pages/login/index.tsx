import { Button, Checkbox, Col, Form, Input, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import "./index.less";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { notificationError, notificationSuccess } from "../../components/notification/notification-provider";
import { localStorageKeys, setLocalStorageItem } from "../../utlis/localStorageUtil";

type LoginValues = {
  username: string;
  password: string;
  remember?: boolean;
};

function LoginPage() {
  const [form] = Form.useForm<LoginValues>();
  const navigate = useNavigate();

  const onFinish = async (values: LoginValues) => {
    try {
      // mock authentication - replace with real API call (services/auth)
      if (values.username === "admin" && values.password === "123") {
        notificationSuccess({
          message: "Đăng nhập thành công",
        });
        navigate(ROUTES.BOOKING);
        setLocalStorageItem(localStorageKeys.IS_LOGIN, true);
      } else {
        notificationError({
          message: "Invalid username or password",
        });
      }
    } catch (err) {
      console.error(err);
      message.error("Login failed");
    }
  };

  return (
    <Col className="login-page">
      <Col xxl={24} className="login-card">
        <h2 className="login-title">Sign in</h2>

        <Form<LoginValues>
          form={form}
          name="login"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              className="login-card-form-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              className="login-card-form-input"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="login-card-form-submit"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Col>
  );
}

export default LoginPage;
