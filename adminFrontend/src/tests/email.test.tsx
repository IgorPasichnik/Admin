import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { EmailInput } from "../components/custom-email-input/custom-email-input";
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

describe("EmailInput", () => {
  test("Отображает поле ввода для электронной почты", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Form>
          <EmailInput name="email" placeholder="Enter email" />
        </Form>
      </Router>
    );
    const emailInput = getByPlaceholderText(/Enter email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("Проверка ввода для пустого поля электронной почты", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Form>
          <EmailInput name="email" placeholder="Enter email" />
          <button>Submit</button>
        </Form>
      </Router>
    );
    fireEvent.click(getByText("Submit"));
    await waitFor(() => {
      expect(getByText("Обязательное поле")).toBeInTheDocument();
    });
  });

  test("Проверка ввода правильного адреса электронной почты", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <Router>
        <Form>
          <EmailInput name="email" placeholder="Enter email" />
        </Form>
      </Router>
    );
    const emailInput = getByPlaceholderText(/Enter email/i);
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    await waitFor(() => {
      expect(queryByText("Обязательное поле")).toBeNull();
    });
  });

  test("Проверка ввода неправильного адреса электронной почты", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Form>
          <EmailInput name="email" placeholder="Enter email" />
        </Form>
      </Router>
    );
    const emailInput = getByPlaceholderText(/Enter email/i);
    fireEvent.change(emailInput, { target: { value: "notanemail" } });
    await waitFor(() => {
      expect(getByText("Некорректный email")).toBeInTheDocument();
    });
  });
});
