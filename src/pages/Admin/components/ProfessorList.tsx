import React from 'react';
import { Avatar } from 'antd';

const professors = [
    { name: 'Theodore Handle', degree: 'B.Com', available: true },
    { name: 'Bess Willis', degree: 'M.Com', available: false },
    { name: 'James Jones', degree: 'M.Tech', available: true },
    { name: 'Smith Watson', degree: 'B.Tech', available: false },
];

const ProfessorsList: React.FC = () => {
    return (
        <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl mb-4">Professors List</h2>
            <div>
                {professors.map((professor, index) => (
                    <div
                        key={index}
                        className="flex items-center space-x-3 mb-3"
                    >
                        <Avatar
                            src={`https://randomuser.me/api/portraits/thumb/men/${index}.jpg`}
                        />
                        <div className="flex-grow">
                            <div className="font-semibold">
                                {professor.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {professor.degree}
                            </div>
                        </div>
                        <div
                            className={`text-sm ${professor.available ? 'text-green-500' : 'text-red-500'}`}
                        >
                            {professor.available
                                ? 'Available'
                                : 'Not Available'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfessorsList;
