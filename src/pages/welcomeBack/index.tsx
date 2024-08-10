import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../api/authApi';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
import Spinner from '../../components/Spinner';
import { Circle } from '../../components/Circle';

interface Form {
    identifier: string;
    password: string;
}

const validateEmailOrUsername = (input: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    const isEmail = emailRegex.test(input);
    const isUsername = input.trim().length > 0;
    return isEmail || isUsername;
};

const validatePassword = (passwordToValidate: string) => {
    const isLengthValid = passwordToValidate.length >= 6;
    return isLengthValid;
};

export const WelcomeBack = () => {
    const [formData, setFormData] = useState<Form>({
        identifier: '',
        password: '',
    });
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [login, { isLoading }] = useLoginMutation();
    const [showPasswordError, setShowPasswordError] = useState<boolean>(false);
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const updateFormData = ({
        key,
        value,
    }: {
        key: 'identifier' | 'password';
        value: string;
    }) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const initiateLogin = async () => {
        if (isValidated) {
            const loginData = {
                email: formData.identifier,
                password: formData.password,
            };

            login(loginData)
                .unwrap()
                .then((res) => {
                    console.log({ res: res.data });
                    navigate('/dashboard');
                })
                .catch((error) => {
                    const incorrectPasswordError =
                        error.error === 'Invalid credential combination';
                    if (incorrectPasswordError) setShowPasswordError(true);
                    else toast.error('Error connecting to blkat.io network');
                });
        }
    };

    useEffect(() => {
        setShowPasswordError(false);
    }, [formData.password]);

    useEffect(() => {
        const { identifier, password } = formData;
        if (validateEmailOrUsername(identifier) && validatePassword(password)) {
            setIsValidated(true);
        } else {
            setIsValidated(false);
        }
    }, [formData]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Login with your site account
                </h1>

                <div className="mb-4">
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        type="text"
                        placeholder="Username or email"
                        onChange={(e) => {
                            if (!e.target.value.includes('@')) {
                                updateFormData({
                                    key: 'identifier',
                                    value: e.target.value,
                                });
                            }
                        }}
                    />
                </div>

                <div className="mb-2 relative">
                    <input
                        className={`w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                            showPasswordError
                                ? 'border-red-500'
                                : 'border-gray-300'
                        }`}
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                            updateFormData({
                                key: 'password',
                                value: e.target.value,
                            })
                        }
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') initiateLogin();
                        }}
                    />
                    <button title='icon' className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                        </svg>
                    </button>
                </div>

                {showPasswordError && (
                    <div className="flex items-center text-red-500 text-xs mb-4">
                        <Circle
                            bg="transparent"
                            img={'https://cdn.blkat.io/assets/image/red_x.svg'}
                            pd={1}
                            width={15}
                            noMg
                            height={15}
                            noBorder
                        />
                        <p className="ml-2">
                            You've entered the wrong password
                        </p>
                    </div>
                )}

                <div className="flex justify-between items-center mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-purple-600"
                        />
                        <span className="ml-2 text-sm">Remember Me</span>
                    </label>
                    <a
                        href="#"
                        className="text-sm text-purple-600 hover:underline"
                    >
                        Lost your password?
                    </a>
                </div>

                <button
                    className={`w-full py-2 rounded-md font-semibold transition duration-300 ${
                        isValidated
                            ? 'bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={initiateLogin}
                    disabled={!isValidated}
                >
                    {isLoading ? (
                        <Spinner height="20px" width="20px" />
                    ) : (
                        'LOGIN'
                    )}
                </button>
            </div>
        </div>
    );
};
