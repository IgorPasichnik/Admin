import { Form, Input } from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

export const NameInput = ({ name, placeholder, type = "text" }: Props) => {
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
          pattern: /^[A-Za-z]+$/,
          message: "Имя может содержать только английские буквы",
        },
      ]}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};
