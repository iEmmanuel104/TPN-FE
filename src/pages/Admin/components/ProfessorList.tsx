// src/pages/Admin/components/ProfessorList.tsx

import React from 'react';
import { List, Avatar } from 'antd';

const data = [
    {
        title: 'Theodore Handle',
        description: 'B.Com',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=male',
        status: 'Available',
    },
    {
        title: 'Bess Willis',
        description: 'M.Com',
        avatar: 'https://xsgames.co/randomusers/avatar.php?g=female',
        status: 'Not Available',
    },
    // Add more professor data here
];

const ProfessorList: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Professors List</h2>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={
                                <a href="https://ant.design">{item.title}</a>
                            }
                            description={item.description}
                        />
                        <div
                            className={`${item.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {item.status}
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ProfessorList;
