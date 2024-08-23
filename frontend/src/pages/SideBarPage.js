import './sidebar-page.css'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
const SideBarPage = () => {
    return (
        <Sidebar >
            <Menu className="side-bar-menu"
                menuItemStyles={{
                    button: {
                        [`&.active`]: {
                            backgroundColor: '#13395e',
                            color: '#b6c8d9',
                        },
                    },
                }}
            >
                <MenuItem component={<Link to="/" />}>Analytics</MenuItem>
            </Menu>
        </Sidebar>
    )
}
export default SideBarPage;
