import {
  LoginOutlined,
  GlobalOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Styles from "./Header.module.css";
import { Layout, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { CustomButton } from "../custom-button/custom-button";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

export const Header = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header className={Styles.header}>
      <Space className={Styles.headerContainer}>
        <GlobalOutlined className={Styles.adminIcon} />
        <Link to={Paths.home}>
          <Typography.Title level={2} className={Styles.title}>
            admin-panel
          </Typography.Title>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="text"
          icon={<LogoutOutlined />}
          onClick={onLogoutClick}
        >
          Выйти
        </CustomButton>
      ) : (
        <Space className={Styles.headerContainer}>
          <Link to={Paths.register}>
            <CustomButton type="text" icon={<UserOutlined />}>
              Зарегистрироваться
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton type="text" icon={<LoginOutlined />}>
              Войти
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
