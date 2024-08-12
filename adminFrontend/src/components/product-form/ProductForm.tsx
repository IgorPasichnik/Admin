import { Product } from "@prisma/client";
import { Card, Form, Space } from "antd";
import { CustomInput } from "../custom-input/custom-input";
import { ErrorMessage } from "../error-message/error-message";
import { CustomButton } from "../custom-button/custom-button";

type Props<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  product?: T;
};

export const ProductForm = ({
  onFinish,
  title,
  btnText,
  error,
  product,
}: Props<Product>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="product-form" onFinish={onFinish} initialValues={product}>
        <CustomInput type="text" name="name" placeholder="Название" />
        <CustomInput type="number" name="vendorCode" placeholder="Артикул" />
        <CustomInput type="text" name="type" placeholder="Тип товара" />
        <CustomInput type="text" name="description" placeholder="Описание" />
        <CustomInput type="number" name="price" placeholder="Цена" />
        <Space direction="vertical" size="large">
          <ErrorMessage message={error} />
          <CustomButton htmlType="submit">{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
