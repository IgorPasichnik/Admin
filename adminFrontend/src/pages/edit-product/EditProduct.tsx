import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useGetProductQuery,
} from "../../app/services/products";
import { Row } from "antd";
import { ProductForm } from "../../components/product-form/ProductForm";
import { Product } from "@prisma/client";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import Layout from "antd/es/layout/layout";

export const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const { data, isLoading } = useGetProductQuery(params.id || "");
  const [editProduct] = useEditProductMutation();

  if (isLoading) {
    return <span>Загрузка</span>;
  }

  const handleEditUser = async (product: Product) => {
    try {
      const editedProduct = {
        ...data,
        ...product,
      };

      await editProduct(editedProduct).unwrap;

      navigate(`${Paths.status}/updated`);
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
          title="Редактировать сотрудника"
          btnText="Редактировать"
          error={error}
          product={data}
          onFinish={handleEditUser}
        />
      </Row>
    </Layout>
  );
};
