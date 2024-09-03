import React from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';
import CustomFooter from './Footer';

const { Content } = Layout;

interface PublicLayoutProps {
    children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <Layout className="min-h-screen flex flex-col">
            <Navbar />
            <Content className="flex-grow">
                    {children}
            <CustomFooter />
            </Content>
        </Layout>
    );
};

export default PublicLayout;
