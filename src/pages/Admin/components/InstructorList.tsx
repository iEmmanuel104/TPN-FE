import React from 'react';
import { Avatar } from 'antd';
import { useGetInstructorStatsQuery } from '../../../api/adminApi';

const InstructorsList: React.FC = () => {
    const {
        data: instructorStats,
        isLoading,
        error,
    } = useGetInstructorStatsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading instructor stats</div>;

    const topInstructors = instructorStats?.data?.topInstructors || [];

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="font-bold text-xl mb-4">Top Instructors</h2>
            <div className="space-y-4">
                {topInstructors.slice(0, 4).map((instructor, index) => (
                    <div
                        key={instructor.id}
                        className="flex items-center space-x-3"
                    >
                        <Avatar
                            size={48}
                            src={`https://randomuser.me/api/portraits/thumb/men/${index + 1}.jpg`}
                        />
                        <div>
                            <div className="font-semibold">
                                {instructor.name}{' '}
                                <span className="text-sm font-normal text-gray-500">
                                    (Courses: {instructor.courseCount})
                                </span>
                            </div>
                            <div className="text-sm text-yellow-500">
                                Rating: {instructor.averageRating.toFixed(1)}
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
