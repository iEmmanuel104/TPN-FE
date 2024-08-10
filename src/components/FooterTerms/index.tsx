import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const FooterTerms = ({
    type,
}: {
    type: 'terms_only' | 'terms_with_copyright';
}) => {
    const navigate = useNavigate();

    return (
        <div className="my-5 w-full max-w-[1200px]">
            <div
                className={`flex items-center ${type === 'terms_with_copyright' ? 'justify-between' : 'justify-start'}`}
            >
                {type === 'terms_with_copyright' ? (
                    <>
                        <p className="text-black font-medium text-xs">
                            Copyright BlackAt 2024
                        </p>
                        <Link
                            to="/terms"
                            onClick={() => navigate('/terms')}
                            className="no-underline"
                        >
                            <p className="text-black font-medium text-xs">
                                Terms of Use
                            </p>
                        </Link>
                    </>
                ) : (
                    <Link
                        to="/terms"
                        onClick={() => navigate('/terms')}
                        className="no-underline"
                    >
                        <p className="text-black font-medium text-xs">
                            Terms of Use
                        </p>
                    </Link>
                )}
            </div>
        </div>
    );
};

export const Terms = () => {
    useEffect(() => {}, []);

    return <></>;
};
