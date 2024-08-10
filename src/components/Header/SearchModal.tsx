import { useDispatch } from 'react-redux';
import { toggleSearchModal } from '../../state/slices/searchSlice';
import { useEffect, useState } from 'react';
import {
    UserInfoFromApiWithProfileId,
    useGetAllUsersQuery,
    useSearchForUsersWithQueryMutation,
} from '../../api/userApi';
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toggleSettingsModal } from '../../state/slices/settingsSlice';

interface SearchResultParams {
    name: string;
    userType: 'creative' | 'executive' | 'vendor';
    position: string;
    location: string;
    profileImage?: string;
    id: string;
    userName: string;
}

const SearchResult = (props: SearchResultParams) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let bio = props?.position ?? '';
    // Limit bio to 50 characters
    if (bio.length > 100) {
        bio = bio.substring(0, 60) + '...';
    }

    const showProfile = () => {
        dispatch(toggleSearchModal({ show: false, searchText: '' }));
        navigate('/user_details', {
            state: {
                userData: props,
            },
        });
    };

    return (
        <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0 ">
            <div
                className="flex items-center"
                onClick={() => {
                    dispatch(
                        toggleSearchModal({ show: false, searchText: '' }),
                    );
                    dispatch(toggleSettingsModal({ show: false }));
                    showProfile();
                }}
            >
                <img
                    src={
                        props.profileImage ??
                        'https://cdn.blkat.io/assets/image/profile-hd.png'
                    }
                    alt={props.name}
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <div className="flex items-center">
                        <h3 className="font-semibold text-sm mr-2">
                            {props.name}
                        </h3>
                        <span
                            className={`px-2 py-0.5 text-xs font-medium text-white uppercase rounded ${
                                props.userType === 'creative'
                                    ? 'bg-black'
                                    : props.userType === 'executive'
                                      ? 'bg-gray-700'
                                      : 'bg-gray-500'
                            }`}
                        >
                            {props.userType}
                        </span>
                    </div>
                    <p className="text-xs mt-1">{bio}</p>
                    <p className="text-xs text-gray-600 mt-1">
                        {props.position}
                    </p>
                    <p className="text-xs text-gray-400 uppercase mt-0.5">
                        {props.location}
                    </p>
                </div>
            </div>
            <button
                onClick={showProfile}
                className="bg-black text-white text-xs font-semibold py-2 px-4 rounded"
            >
                View Profile
            </button>
        </div>
    );
};

export const SearchModal = ({ inputValue }: { inputValue: string }) => {
    const dispatch = useDispatch();
    const [searchUser, { isLoading, error }] =
        useSearchForUsersWithQueryMutation();

    const [users, setUsers] = useState<UserInfoFromApiWithProfileId[]>([]);
    const { data: getUserData } = useGetAllUsersQuery({ q: inputValue });

    const [viewAll, setViewAll] = useState(false);

    useEffect(() => {
        if (inputValue && inputValue !== '') {
            if (getUserData)
                setUsers(
                    getUserData.data
                        .users as unknown as UserInfoFromApiWithProfileId[],
                );
        }

        if (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toast.error((error as any).message ?? (error as any).data?.message);
        }
    }, [inputValue, searchUser, error]);

    const usersToShow: UserInfoFromApiWithProfileId[] = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.profile) {
            usersToShow.push(user);
        }
    }

    return (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg z-500">
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <p className="text-sm font-medium">
                        Search Results - You searched for{' '}
                        <span className="font-bold italic">{inputValue}</span> -{' '}
                        {users.length} Results
                    </p>
                    <button
                        className="bg-transparent border-0"
                        onClick={() => {
                            dispatch(
                                toggleSearchModal({
                                    show: false,
                                    searchText: '',
                                }),
                            );
                        }}
                    >
                        <img
                            src="https://cdn.blkat.io/assets/image/close-circle.svg"
                            alt="Close"
                            className="h-6 w-6"
                        />
                    </button>
                </div>

                <div className="px-4">
                    {(!viewAll ? usersToShow.slice(0, 5) : usersToShow).map(
                        (result) => (
                            <SearchResult
                                key={result.id}
                                name={`${result.firstName} ${result.lastName}`}
                                userType={
                                    result.role.name as
                                        | 'creative'
                                        | 'executive'
                                        | 'vendor'
                                }
                                position={result.profile?.bio ?? ''}
                                location={result.profile?.location}
                                profileImage={result.displayImage}
                                id={result.profile.id}
                                userName={result.username}
                            />
                        ),
                    )}

                    {isLoading && <Spinner />}

                    {users.length === 0 && (
                        <div className="flex items-center justify-center py-8">
                            <p className="font-medium text-gray-500">
                                No results found for your search.
                            </p>
                        </div>
                    )}
                </div>

                {users.length > 5 && (
                    <div className="p-4 border-t border-gray-200 flex justify-center">
                        <button
                            className="text-blue-600 font-medium text-sm flex items-center"
                            onClick={() => setViewAll(!viewAll)}
                        >
                            {viewAll ? 'Show less' : 'See all results'}
                            {!viewAll && (
                                <img
                                    src="https://cdn.blkat.io/assets/image/blue-right.png"
                                    alt="See all"
                                    className="h-4 w-4 ml-1"
                                />
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
