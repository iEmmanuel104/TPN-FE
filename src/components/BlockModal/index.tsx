import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { toggleBlockUserModal } from '../../state/slices/blockuser';

import { useBlockUnBlockUserMutation } from '../../api/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import { useState } from 'react';

export const BlockModal: React.FC<{ userId: string }> = ({ userId }) => {
    const { show } = useSelector((state: RootState) => state.blockuser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reason, setReason] = useState('');

    const [blockUnblock, { isLoading }] = useBlockUnBlockUserMutation();

    const blockUnblockUser = () => {
        if (!reason) {
            return toast.error('Please indicate a reason');
        }

        blockUnblock({
            userId: userId,
            action: 'block',
            reason: reason,
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message);

                setTimeout(() => {
                    navigate('/users');
                }, 2000);
            })
            .catch((err) => {
                toast.error(err.data.message);
            });
    };

    return (
        <>
            {show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
                    <div
                        className="w-4/5 md:w-2/5 rounded-lg bg-white p-5 flex flex-col justify-center"
                        style={{ alignSelf: 'center' }}
                    >
                        <img
                            title=""
                            alt="close"
                            onClick={() => {
                                dispatch(toggleBlockUserModal({ show: false }));
                            }}
                            src={
                                'https://cdn.blkat.io/assets/image/alt_icons/Close.svg'
                            }
                            height={30}
                            width={30}
                            className="self-end cursor-pointer"
                        />

                        <h3 className="font-semibold text-2xl text-center mt-6 mb-5">
                            Block account
                        </h3>
                        <p className="text-sm text-gray-600 text-center font-normal">
                            Are you sure you want to block this account?
                        </p>
                        <p className="text-sm text-gray-600 text-center font-normal">
                            Blocking this account will prevent them from
                            performing any action on the platform.
                        </p>

                        <div className="self-center w-4/5 md:w-3/5">
                            <textarea
                                className="w-full mt-5 mb-4 text-sm p-2 border border-gray-300 rounded-lg"
                                rows={4}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="State the reason here"
                            ></textarea>

                            <button
                                onClick={() => blockUnblockUser()}
                                className="bg-red-600 text-white rounded-full px-8 py-2 float-right"
                            >
                                {isLoading ? (
                                    <Spinner width="17px" height="17px" />
                                ) : (
                                    'Block'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
