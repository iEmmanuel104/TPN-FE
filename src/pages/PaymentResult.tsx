import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
// import { useVerifyPaymentMutation } from '../api/paymentApi';

interface PaymentResultProps {
    isSuccess: boolean;
}

const PaymentResult: React.FC<PaymentResultProps> = ({ isSuccess }) => {
    const { id: courseId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    // const location = useLocation();
    // const [verifyPayment] = useVerifyPaymentMutation();

    // useEffect(() => {
    //     if (isSuccess) {
    //         const searchParams = new URLSearchParams(location.search);
    //         const sessionId = searchParams.get('session_id');

    //         if (sessionId && courseId) {
    //             verifyPayment({ sessionId, courseId })
    //                 .unwrap()
    //                 .then((response) => {
    //                     console.log('Payment verified:', response);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Payment verification failed:', error);
    //                 });
    //         }
    //     }
    // }, [isSuccess, location, verifyPayment, courseId]);

    const handleReturnToCourse = () => {
        navigate(`/course/${courseId}`);
    };

    const resultProps = isSuccess
        ? {
              status: 'success' as const,
              title: 'Payment Successful!',
              subTitle: 'Your course enrollment is confirmed. You can now access the course content.',
              icon: <CheckCircleOutlined />,
          }
        : {
              status: 'warning' as const,
              title: 'Payment Cancelled',
              subTitle: 'Your course enrollment was not completed. You can try again if you wish to enroll in the course.',
              icon: <CloseCircleOutlined />,
          };

    return (
        <div className="flex justify-center items-center min-h-screen p-5">
            <Result
                {...resultProps}
                extra={[
                    <Button type="primary" key="console" onClick={handleReturnToCourse}>
                        Return to Course
                    </Button>,
                ]}
            />
        </div>
    );
};

export default PaymentResult;
