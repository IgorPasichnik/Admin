import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Row } from "antd";
import { ProductForm } from "../../components/product-form/ProductForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useAddProductMutation } from "../../app/services/products";
import { Product } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const AddProduct = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addProduct] = useAddProductMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleProduct = async (data: Product) => {
    try {
      await addProduct(data).unwrap();

      navigate(`${Paths.status}/created`);
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
        <ProductForm
          title="Добавить товар"
          btnText="Добавить"
          onFinish={handleProduct}
          error={error}
        />
      </Row>
    </Layout>
  );
};
