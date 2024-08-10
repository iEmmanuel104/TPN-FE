import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useLogoutMutation } from '../../api/authApi';
import { logOutUser } from '../../state/slices/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import { SearchModal } from './SearchModal';
import { toggleSearchModal } from '../../state/slices/searchSlice';

type Props = {
    showSearch?: boolean;
    showBreadCrumb?: boolean;
    userId?: string;
};

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const Header: React.FC<Props> = ({
    showSearch,
    showBreadCrumb,
    userId,
}) => {
    const [dropdown, setDropdown] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const { show: showSearchResultModal } = useSelector(
        (state: RootState) => state.searchResult,
    );
    const [searchText, setSearchText] = useState('');

    const [logout, { isLoading: logoutIsLoading }] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-row justify-between pt-3 mb-10 relative">
            {showSearch ? (
                <div className="w-1/2 bg-[#fbfbfb] rounded-full border border-[#efefef] flex items-center pl-5">
                    <img
                        src="https://cdn.blkat.io/assets/image/search-normal.png"
                        className="h-4 w-4"
                        alt="Search"
                    />
                    <input
                        className="bg-transparent w-4/5 border-none outline-none pl-4 text-sm"
                        type="text"
                        placeholder="Search for people, events"
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            dispatch(
                                toggleSearchModal({
                                    show: true,
                                    searchText: e.target.value,
                                }),
                            );
                        }}
                        onMouseDown={() => {
                            if (searchText.length > 0) {
                                dispatch(
                                    toggleSearchModal({
                                        show: true,
                                        searchText,
                                    }),
                                );
                            }
                        }}
                    />
                </div>
            ) : showBreadCrumb ? (
                <div className="flex flex-row items-center">
                    <p className="mx-3 text-[#8d9091] text-sm font-normal">
                        User details
                    </p>
                    <img
                        src="https://cdn.blkat.io/assets/image/dashboard/chevron.svg"
                        className="h-2.5 w-2.5"
                        alt="Chevron"
                    />
                    <p className="mx-3 text-sm">
                        User details for #{userId?.substring(0, 8)}...
                    </p>
                    <img
                        src="https://cdn.blkat.io/assets/image/dashboard/chevron.svg"
                        className="h-2.5 w-2.5"
                        alt="Chevron"
                    />
                </div>
            ) : (
                <div></div>
            )}

            <div
                className="flex flex-row items-center justify-self-end relative cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
            >
                <img
                    src="https://cdn.blkat.io/assets/image/profile2.png"
                    className="h-12 w-12"
                    alt="Profile"
                />

                <div className="px-3">
                    <h4 className="text-sm">
                        {user?.firstName + ' ' + user?.lastName}
                    </h4>
                    <p className="text-[#a1a1a1] text-xs font-normal">
                        {capitalizeFirstLetter(user?.role?.name ?? '')}
                    </p>
                </div>

                <div className="mr-2">
                    <img
                        src="https://cdn.blkat.io/assets/image/dashboard/notification.svg"
                        className="h-6 w-6"
                        alt="Notification"
                    />
                </div>

                <button className="dropdown-button">
                    <img
                        src="https://cdn.blkat.io/assets/image/arrow-down.png"
                        alt="Arrow down"
                        className="h-4 w-4"
                    />
                </button>

                {dropdown && (
                    <div className="absolute top-14 left-0 bg-white py-5 px-6 rounded-lg border border-[#E6EAEE] w-full z-50">
                        <div className="flex flex-row justify-end mb-4">
                            <img
                                src="https://cdn.blkat.io/assets/image/close.svg"
                                className="h-3 w-3 cursor-pointer"
                                onClick={() => setDropdown(false)}
                                alt="Close"
                            />
                        </div>

                        <div className="flex flex-row items-center pb-4 border-b border-[#e0e0e0]">
                            <img
                                src="https://cdn.blkat.io/assets/image/profile2.png"
                                className="h-8 w-8"
                                alt="Profile"
                            />

                            <div className="px-3">
                                <p className="text-xs font-semibold">
                                    {user?.firstName + ' ' + user?.lastName}
                                </p>
                                <p className="text-xs font-normal text-[#8D9091]">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <div
                            className="flex flex-row items-center justify-center mt-5 cursor-pointer"
                            onClick={() => {
                                logout()
                                    .unwrap()
                                    .finally(() => {
                                        toast.success('Logout successful');
                                        dispatch(logOutUser());
                                        navigate('/login');
                                    });
                            }}
                        >
                            <img
                                src="https://cdn.blkat.io/assets/image/logout.svg"
                                className="h-5 w-5"
                                alt="Logout"
                            />
                            {logoutIsLoading ? (
                                <Spinner width="20px" height="20px" />
                            ) : (
                                <p className="text-sm pl-2 font-semibold text-[#8D9091]">
                                    Logout
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {showSearchResultModal && <SearchModal inputValue={searchText} />}
        </div>
    );
};
