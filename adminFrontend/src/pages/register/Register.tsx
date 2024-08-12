import React, { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Row, Card, Form, Space, Typography } from "antd";
import { PasswordInput } from "../../components/custom-password-input/custom-password-input";
import { CustomButton } from "../../components/custom-button/custom-button";
import { Paths } from "../../paths";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useRegisterMutation } from "../../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { ErrorMessage } from "../../components/error-message/error-message";
import { EmailInput } from "../../components/custom-email-input/custom-email-input";
import { NameInput } from "../../components/custom-name-input/custom-name-input";

type RegisterData = Omit<User, "id"> & { confirmPassword: string };

export const Register = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap();

      navigate("/");
    } catch (e) {
      const maybeError = isErrorWithMessage(e);

      if (maybeError) {
        setError(e.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Зарегистрируйтесь" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <NameInput name="name" placeholder="Имя" />
            <EmailInput name="email" type="email" placeholder="Email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Подтверждение пароля"
            />
            <CustomButton type="primary" htmlType="submit">
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Уже зарегистрированы?
              <Link to={Paths.login}> Вход</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
