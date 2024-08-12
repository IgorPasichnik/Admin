import { Form, Input } from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

export const EmailInput = ({ name, placeholder, type = "text" }: Props) => {
  return (
    <Form.Item
      name={name}
      hasFeedback
      rules={[
        {
          required: true,
          message: "Обязательное поле",
        },
        {
          pattern:
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]   \.,;:\s@\"]{2,})$/i,
          message: "Некорректный email",
        },
      ]}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};
