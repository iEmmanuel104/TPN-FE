import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';

interface Course {
    title: string;
    instructor: { name: string; avatar: string };
    lessons: number;
    students: number;
    image: string;
    price: string;
}

interface CourseFrameProps {
    courses: Course[];
    columns?: 3 | 4;
}

const CourseFrame: React.FC<CourseFrameProps> = ({ courses, columns = 4 }) => {
    const carouselRef = useRef<CarouselRef>(null);
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleCourseClick = (courseId: string) => {
        console.log(courseId);
        navigate(`/coursedetails/${courseId}`);
    };

    const courseCards = courses.map((course) => (
        <div key={course.title} className="px-2">
            <CourseCard {...course} onClick={() => handleCourseClick(course.title)} />
        </div>
    ));

    const handleSlideChange = (current: number) => {
        setCurrentSlide(current);
    };

    const gridColumns = columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';

    return (
        <>
            <div className={`hidden sm:grid sm:grid-cols-2 md:grid-cols-3 ${gridColumns} gap-6`}>{courseCards}</div>
            <div className="sm:hidden">
                <Carousel ref={carouselRef} afterChange={handleSlideChange}>
                    {courseCards}
                </Carousel>
                <div className="flex justify-center mt-4">
                    {courses.map((_, index) => (
                        <span key={index} className={`h-2 w-2 mx-1 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CourseFrame;
