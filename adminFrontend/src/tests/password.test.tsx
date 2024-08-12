import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { PasswordInput } from "../components/custom-password-input/custom-password-input";
import { Form } from "antd";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("PasswordInput", () => {
  test("Отображает поле ввода для пароля", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Form>
          <PasswordInput name="password" placeholder="Enter password" />
        </Form>
      </Router>
    );
    const passwordInput = getByPlaceholderText(/Enter password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("Проверка ввода для пустого поля пароля", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Form>
          <PasswordInput name="password" placeholder="Enter password" />
          <button>Submit</button>
        </Form>
      </Router>
    );
    fireEvent.click(getByText("Submit"));
    await waitFor(() => {
      expect(getByText("Обязательное поле")).toBeInTheDocument();
    });
  });

  test("Проверка ввода правильного пароля", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <Router>
        <Form>
          <PasswordInput name="password" placeholder="Enter password" />
        </Form>
      </Router>
    );
    const passwordInput = getByPlaceholderText(/Enter password/i);
    fireEvent.change(passwordInput, { target: { value: "secure123" } });
    await waitFor(() => {
      expect(queryByText("Обязательное поле")).toBeNull();
    });
  });

  test("Проверка ввода на неверный пароль", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Form>
          <PasswordInput name="password" placeholder="Enter password" />
        </Form>
      </Router>
    );
    const passwordInput = getByPlaceholderText(/Enter password/i);
    fireEvent.change(passwordInput, { target: { value: "123" } });
    await waitFor(() => {
      expect(
        getByText("Пароль должен быть длиньше 6-ти символов")
      ).toBeInTheDocument();
    });
  });

  test("Проверка ввода для совпадения паролей", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <Router>
        <Form>
          <PasswordInput name="password" placeholder="Enter password" />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </Form>
      </Router>
    );
    const passwordInput = getByPlaceholderText(/Enter password/i);
    const confirmPasswordInput = getByPlaceholderText(/Confirm password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    await waitFor(() => {
      expect(queryByText("Пароли должны совпадать")).toBeNull();
    });
  });

  test("Проверка ввода на предмет несовпадения паролей", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Form>
          <PasswordInput name="password" placeholder="Enter password" />
          <PasswordInput
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </Form>
      </Router>
    );
    const passwordInput = getByPlaceholderText(/Enter password/i);
    const confirmPasswordInput = getByPlaceholderText(/Confirm password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    await waitFor(() => {
      expect(getByText("Пароли должны совпадать")).toBeInTheDocument();
    });
  });
});
