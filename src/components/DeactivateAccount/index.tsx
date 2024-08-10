import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Circle } from '../Circle';
import { toggleDeactivateAccountModal } from '../../state/slices/settingsSlice';

const ConfirmPassword = ({ next }: { next: () => void }) => {
    return (
        <div className="w-full bg-black bg-opacity-70 absolute top-0 left-0 h-full min-h-screen z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg max-w-fit mx-8 p-4 relative h-96 min-w-[350px]">
                <div className="flex flex-col items-center mb-10 p-8">
                    <Circle
                        bg="transparent"
                        img={
                            'https://cdn.blkat.io/assets/image/deactivate-icon.svg'
                        }
                        pd={10}
                        width={90}
                        height={90}
                        noBorder
                    />
                    <h2 className="font-semibold text-lg">
                        Delete your account
                    </h2>
                    <p className="text-sm font-light text-center mt-2 max-w-xs">
                        We are sad you’re leaving, going forward with this
                        deletes all your user data from our platform such as
                        email and cached files.
                    </p>
                </div>

                <div className="border-t border-gray-300 pt-10">
                    <div className="min_form">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium"
                        >
                            Confirm your password to delete
                        </label>
                        <div className="flex items-center mt-1">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                                className="ml-4 p-2 rounded bg-red-600 text-white"
                                onClick={next}
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GoodBye = ({ resetState }: { resetState: () => void }) => {
    const dispatch = useDispatch();

    return (
        <div className="w-full bg-black bg-opacity-70 absolute top-0 left-0 h-full min-h-screen z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg max-w-fit mx-8 p-4 relative h-full flex flex-col justify-center items-center">
                <Circle
                    bg="transparent"
                    img={'https://cdn.blkat.io/assets/image/goodbye.svg'}
                    pd={10}
                    width={90}
                    height={90}
                    noBorder
                    noMg
                />

                <h3 className="font-semibold text-lg mt-6">
                    Goodbye! We're going to miss you
                </h3>

                <button
                    onClick={() => {
                        dispatch(toggleDeactivateAccountModal({ show: false }));
                        resetState();
                    }}
                    className="mt-8 p-2 rounded-full bg-black text-white"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export const DeactivateAccount = () => {
    const [pane, setPane] = useState<'confirm' | 'goodbye'>('confirm');
    const { show } = useSelector((state: RootState) => state.deactivateAccount);
    const dispatch = useDispatch();

    return (
        <>
            {show && (
                <div className="w-full bg-black bg-opacity-70 absolute top-0 left-0 h-full min-h-screen z-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg max-w-fit mx-8 p-4 relative h-96 min-w-[350px] flex flex-col items-center">
                        {pane === 'confirm' ? (
                            <ConfirmPassword next={() => setPane('goodbye')} />
                        ) : (
                            <GoodBye resetState={() => setPane('confirm')} />
                        )}
                        {pane === 'confirm' && (
                            <div
                                className="absolute top-4 right-4 cursor-pointer"
                                onClick={() =>
                                    dispatch(
                                        toggleDeactivateAccountModal({
                                            show: false,
                                        }),
                                    )
                                }
                            >
                                <Circle
                                    bg="black"
                                    img={
                                        'https://cdn.blkat.io/assets/image/main-close.svg'
                                    }
                                    pd={3}
                                    width={12}
                                    height={12}
                                    noBorder
                                    noMg
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
