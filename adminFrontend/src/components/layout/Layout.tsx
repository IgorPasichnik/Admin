import { Layout as AntLayout } from "antd";
import Styles from "./Layout.module.css";
import { Header } from "../header/Header";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={Styles.main}>
      <Header />
      <AntLayout.Content style={{ height: "100%", color: "white" }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};
