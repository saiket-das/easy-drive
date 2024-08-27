import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Button>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
