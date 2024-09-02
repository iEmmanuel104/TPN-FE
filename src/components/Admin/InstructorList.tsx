import React from 'react';
import { Avatar, Spin, Button } from 'antd';
import { useGetInstructorStatsQuery } from '../../api/adminApi';
import { Link } from 'react-router-dom';

const InstructorsList: React.FC = () => {
    const { data: instructorStats, isLoading, error } = useGetInstructorStatsQuery();

    if (isLoading) {
        return <Spin size="large" className="flex justify-center items-center h-64" />;
    }
    if (error) return <div>Error loading instructor</div>;

    const topInstructors = instructorStats?.data?.topInstructors || [];

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="font-bold text-xl mb-4">Top Instructors</h2>
            <div className="space-y-4">
                {topInstructors.map((instructor) => (
                    <div key={instructor.id} className="flex items-center space-x-3">
                        <Avatar size={48} src={instructor.instructorImage || 'https://randomuser.me/api/portraits/thumb/men/1.jpg'} />
                        <div>
                            <div className="font-semibold text-sm">
                                {instructor.name} <span className="text-sm font-normal text-gray-500">(Courses: {instructor.courseCount})</span>
                            </div>
                            <div className="text-xs text-yellow-500">Rating: {instructor.averageRating?.toFixed(1) || 'N/A'}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <Link to="/iadmin/instructors">
                    <Button type="primary" className="bg-indigo-600">
                        View All
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default InstructorsList;
