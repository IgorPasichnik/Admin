import React, { useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { CustomButton } from "../../components/custom-button/custom-button";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useGetAllProductsQuery } from "../../app/services/products";
import type { ColumnsType } from "antd/es/table";
import { Product } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";

const columns: ColumnsType<Product> = [
  { title: "Название", dataIndex: "name", key: "name" },
  { title: "Артикул", dataIndex: "vendorCode", key: "vendorCode" },
  { title: "Тип товара", dataIndex: "type", key: "type" },
  { title: "Описане", dataIndex: "description", key: "description" },
  { title: "Цена", dataIndex: "price", key: "price" },
];

export const Products = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllProductsQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const goToAddProduct = () => navigate(Paths.productAdd);

  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={goToAddProduct}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </CustomButton>
      <Table
        style={{ marginTop: "20px" }}
        loading={isLoading}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.product}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
