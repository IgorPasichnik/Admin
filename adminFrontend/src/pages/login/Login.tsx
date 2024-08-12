import { useState, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { PasswordInput } from "../../components/custom-password-input/custom-password-input";
import { CustomButton } from "../../components/custom-button/custom-button";
import { Paths } from "../../paths";
import { Link, useNavigate } from "react-router-dom";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message/error-message";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { EmailInput } from "../../components/custom-email-input/custom-email-input";

export const Login = () => {
  const navigate = useNavigate();
  const [loginUser, loginUserResult] = useLoginMutation();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      navigate("/");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Вход" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <EmailInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={loginUserResult.isLoading}
            >
              Войти
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Не зарегистрированы?
              <Link to={Paths.register}>Создать аккаунт</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
