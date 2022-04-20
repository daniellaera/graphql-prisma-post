import { EditOutlined, FileAddOutlined, LoginOutlined, LogoutOutlined, MessageOutlined } from "@ant-design/icons";
import { Menu, Popover, Spin } from "antd";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";

const Navbar: React.FC = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    if (loading) {
        return <Spin></Spin>
    }

    return (
        <Menu mode='horizontal'>
            <Menu.Item key='mail' icon={<MessageOutlined />}>
                <Link passHref href='/'>
                    Posts
                </Link>
            </Menu.Item>
            <Menu.Item key='app' icon={<EditOutlined />}>
                <Link passHref href='/drafts'>
                    Drafts
                </Link>
            </Menu.Item>
            <Menu.Item key='alipay' disabled={!session} icon={<FileAddOutlined />} style={{ marginLeft: 'auto' }}>
                {session ? <Link passHref href='/create'>Create Post</Link> : <Popover content='You must be logged in to create a post'>Create Post</Popover>}
            </Menu.Item>
            {session ? (
                <Menu.Item key='signin' icon={<LogoutOutlined style={{ color: 'red' }} />} onClick={() => signOut()}>
                    Logout
                </Menu.Item>
            ) : (
                <Menu.Item key='signin' icon={<LoginOutlined style={{ color: 'green' }} />}>
                    <Link passHref href='/api/auth/signin'>
                        Login
                    </Link>
                </Menu.Item>
            )}
        </Menu>
    )
}

export default Navbar