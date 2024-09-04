import Instructor from '../assets/man.jpg';
import CourseImage from '../assets/hero2.jpg';

export const courseData = {
    title: 'Prenatal Yoga',
    description: 'Build and deploy a few Nodejs, MongoDB & Expressjs apps while watching to lectures by the author of 9 books on JS/Node.',
    instructor: {
        name: 'Keny White',
        avatar: Instructor,
        role: 'Professor',
        bio: 'Lorem ipsum dolor sit amet, Qui incidunt dolores non similique ducimus et debitis mollitiae. Et autem quia eum reprehenderit voluptates est reprehenderi illo est enim perferendis est neque sunt. Nam amet sunt aut vero.',
    },
    categories: ['Health & Fitness', 'Language'],
    rating: 0,
    price: 'Free',
    features: {
        lectures: 0,
        quizzes: 0,
        duration: '33 hours',
        skillLevel: 'All levels',
        language: 'English',
        students: 79,
        assessments: 'Yes',
    },
    image: CourseImage,
    outcomes: [
        'Over 37 lectures and 55.5 hours of content!',
        'LIVE PROJECT End to End Software Testing Training included.',
        'Learn Software Testing and Automation basics from a professional trainer from your own desk.',
        'Information packed practical training starting from basics to advanced testing techniques.',
        'Best suitable for beginners to advanced level users and who learn faster when demonstrated.',
        'Course content designed by considering current software testing technology and the job market.',
        'Practical assignments at the end of every session.',
        'Practical learning experience with live project work and examples.',
    ],
    relatedCourses: [
        {
            title: 'Introduction LearnPress – LMS Plugin',
            instructor: { name: 'Keny White', avatar: Instructor },
            lessons: 6,
            students: 412,
            image: CourseImage,
            price: 'Free',
        },
        {
            title: 'Introduction LearnPress – LMS Plugin',
            instructor: { name: 'Keny White', avatar: Instructor },
            lessons: 6,
            students: 412,
            image: CourseImage,
            price: 'Free',
        },
        {
            title: 'Introduction LearnPress – LMS Plugin',
            instructor: { name: 'Keny White', avatar: Instructor },
            lessons: 6,
            students: 412,
            image: CourseImage,
            price: 'Free',
        },
    ],
};

export const courses = [
    {
        title: 'Introduction LearnPress – LMS Plugin',
        instructor: { name: 'Keny White', avatar: Instructor },
        lessons: 6,
        students: 412,
        image: CourseImage,
        price: 'Free',
    },
    {
        title: 'Introduction LearnPress – LMS Plugin',
        instructor: { name: 'Keny White', avatar: Instructor },
        lessons: 6,
        students: 412,
        image: CourseImage,
        price: 'Free',
    },
    {
        title: 'Introduction LearnPress – LMS Plugin',
        instructor: { name: 'Keny White', avatar: Instructor },
        lessons: 6,
        students: 412,
        image: CourseImage,
        price: 'Free',
    },
    {
        title: 'Introduction LearnPress – LMS Plugin',
        instructor: { name: 'Keny White', avatar: Instructor },
        lessons: 6,
        students: 412,
        image: CourseImage,
        price: 'Free',
    },
    // Add more course objects here...
];