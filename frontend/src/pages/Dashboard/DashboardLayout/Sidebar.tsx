import { Flex, Layout, Menu } from "antd";

import useAuth from "../../../hooks/useAuth";
import { SidebarItemProps } from "../../../types";
import { ROLE } from "../../../constants/roles";
import { sidebarItemsGenerator } from "../../../utils/sidebarGenerator";
import { adminPaths } from "../../../routes/admin.routes";
import { userPaths } from "../../../routes/user.routes";
import { Link } from "react-router-dom";
import ROUTES from "../../../constants/routes";
import { ApppAssets } from "../../../utils/AppAssets";

const { Sider } = Layout;

const Sidebar = () => {
  const { user } = useAuth();

  let sidebarItems: SidebarItemProps[] | undefined;
  switch (user?.role) {
    case ROLE.user:
      sidebarItems = sidebarItemsGenerator(userPaths, ROLE.user);
      break;
    case ROLE.admin:
      sidebarItems = sidebarItemsGenerator(adminPaths, ROLE.admin);
      break;
    default:
      sidebarItems = [];
      break;
  }

  return (
    <Sider
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex align="center" gap={10}>
          <Link to={ROUTES.HOME} className="-m-1.5 p-1.5">
            <img alt="logo" src={ApppAssets.LOGO} className="h-12 w-auto" />
          </Link>
        </Flex>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        // color="blue"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
