import React from 'react';
import { Avatar } from 'antd';

const Instructors = [
    { name: 'Theodore Handle', degree: 'B.Com', available: true },
    { name: 'Bess Willis', degree: 'M.Com', available: false },
    { name: 'James Jones', degree: 'M.Tach', available: true },
    { name: 'Smith Watson', degree: 'B.Tach', available: false },
];

const InstructorsList: React.FC = () => {
    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="font-bold text-xl mb-4">Instructors List</h2>
            <div className="space-y-4">
                {Instructors.slice(0, 4).map((Instructor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <Avatar
                            size={48}
                            src={`https://randomuser.me/api/portraits/thumb/men/${index + 1}.jpg`}
                        />
                        <div>
                            <div className="font-semibold">
                                {Instructor.name}{' '}
                                <span className="text-sm font-normal text-gray-500">
                                    ({Instructor.degree})
                                </span>
                            </div>
                            <div
                                className={`text-sm ${
                                    Instructor.available
                                        ? 'text-blue-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {Instructor.available
                                    ? 'Available'
                                    : 'Not Available'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium">
                View All
            </button>
        </div>
    );
};

export default InstructorsList;
