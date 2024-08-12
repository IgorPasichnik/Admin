import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductQuery,
  useRemoveProductMutation,
} from "../../app/services/products";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Layout } from "../../components/layout/Layout";
import { Descriptions, Divider, Space, Modal } from "antd";
import { CustomButton } from "../../components/custom-button/custom-button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ErrorMessage } from "../../components/error-message/error-message";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const Product = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetProductQuery(params.id || "");
  const [removeProduct] = useRemoveProductMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Загрузка</span>;
  }

  if (!data) {
    return <Navigate to="/" />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handelDeleteUser = async () => {
    hideModal();

    try {
      await removeProduct(data.id).unwrap();

      navigate(`${Paths.status}/deleted`);
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
      <Descriptions title="Информация о товаре" bordered>
        <Descriptions.Item label="Название" span={3}>
          {`${data.name}`}
        </Descriptions.Item>
        <Descriptions.Item label="Артикул" span={3}>
          {`${data.vendorCode}`}
        </Descriptions.Item>
        <Descriptions.Item label="Тип товара" span={3}>
          {`${data.type}`}
        </Descriptions.Item>
        <Descriptions.Item label="Описание" span={3}>
          {`${data.description}`}
        </Descriptions.Item>
        <Descriptions.Item label="Цена" span={3}>
          {`${data.price}`}
        </Descriptions.Item>
      </Descriptions>

      <>
        <Divider orientation="left">Действия</Divider>
        <Space>
          <Link to={`/product/edit/${data.id}`}>
            <CustomButton shape="round" type="default" icon={<EditOutlined />}>
              Редактировать
            </CustomButton>
          </Link>
          <CustomButton
            shape="round"
            danger
            onClick={showModal}
            icon={<DeleteOutlined />}
          >
            Удалить
          </CustomButton>
        </Space>
      </>

      <ErrorMessage message={error} />
      <Modal
        title="Подтвердите удаление"
        open={isModalOpen}
        onOk={handelDeleteUser}
        onCancel={hideModal}
        okText="Подтвердить"
        cancelText="Отменить"
      >
        {" "}
        Вы действительно хотите удалить товар из таблицы?
      </Modal>
    </Layout>
  );
};
