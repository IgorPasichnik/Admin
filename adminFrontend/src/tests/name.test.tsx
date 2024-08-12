import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { NameInput } from "../components/custom-name-input/custom-name-input";
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

describe("NameInput", () => {
  test("Отображает поле ввода имени", () => {
    const { getByPlaceholderText } = render(
      <Router>
        <Form>
          <NameInput name="name" placeholder="Enter name" />
        </Form>
      </Router>
    );
    const nameInput = getByPlaceholderText(/Enter name/i);
    expect(nameInput).toBeInTheDocument();
  });

  test("Проверка ввода для пустого поля имени", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Form>
          <NameInput name="name" placeholder="Enter name" />
          <button>Submit</button>
        </Form>
      </Router>
    );
    fireEvent.click(getByText("Submit"));
    await waitFor(() => {
      expect(getByText("Обязательное поле")).toBeInTheDocument();
    });
  });

  test("Проверка ввода правильного имени", async () => {
    const { getByPlaceholderText, queryByText } = render(
      <Router>
        <Form>
          <NameInput name="name" placeholder="Enter name" />
        </Form>
      </Router>
    );
    const nameInput = getByPlaceholderText(/Enter name/i);
    fireEvent.change(nameInput, { target: { value: "John" } });
    await waitFor(() => {
      expect(queryByText("Обязательное поле")).toBeNull();
    });
  });

  test("Проверка ввода неправильного имени", async () => {
    const { getByPlaceholderText, getByText } = render(
      <Router>
        <Form>
          <NameInput name="name" placeholder="Enter name" />
        </Form>
      </Router>
    );
    const nameInput = getByPlaceholderText(/Enter name/i);
    fireEvent.change(nameInput, { target: { value: "123" } });
    await waitFor(() => {
      expect(
        getByText("Имя может содержать только английские буквы")
      ).toBeInTheDocument();
    });
  });
});
