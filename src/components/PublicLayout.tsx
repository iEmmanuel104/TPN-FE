import React, { useState } from 'react';
import { Layout } from 'antd';
import Navbar from './Navbar';
import CustomFooter from './Footer';
import { AuthModalType } from '../constants';

const { Content } = Layout;

interface PublicLayoutProps {
    children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalType, setAuthModalType] = useState<AuthModalType>(AuthModalType.LOGIN);

    const handleOpenAuthModal = (type: AuthModalType) => {
        setAuthModalType(type);
        setIsAuthModalOpen(true);
    };

    const handleCloseAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    return (
        <Layout className="min-h-screen flex flex-col" style={{ position: 'relative', background: 'none' }}>
            <Navbar
                onOpenAuthModal={handleOpenAuthModal}
                isAuthModalOpen={isAuthModalOpen}
                authModalType={authModalType}
                onCloseAuthModal={handleCloseAuthModal}
            />
            <Content className={`flex-grow transition-all duration-300 ${isAuthModalOpen ? 'filter blur-sm' : ''}`}>
                <div className="w-full mx-auto">{children}</div>
                <CustomFooter />
            </Content>
        </Layout>
    );
};

export default PublicLayout;
