import { Layout, Menu } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feathers/auth/authSlice";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";

const { Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
    USER: 'user',
}


export const Sidebar = () => {

    const user = useAppSelector(selectCurrentUser)
    let sidebarItem;

    switch (user?.role) {
        case userRole.ADMIN:
            sidebarItem = sidebarItemsGenerator(adminPaths)
            break;
        case userRole.USER:
            sidebarItem = sidebarItemsGenerator(userPaths)
            break;

        default:
            break;
    }
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{height: '100vh', position: 'sticky', top: '0', left: '0'}}
        >
            <div style={{ color: 'white', height: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Ph Uni</h1>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={sidebarItem} />
        </Sider>
    )
}
