import { useLocation } from 'react-router-dom';
// import { Link, useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import './style.scss';

import { toggleBlockUserModal } from '../../state/slices/blockuser';
import { BlockModal } from '../../components/BlockModal';
import { useDispatch } from 'react-redux';
import {
    useBlockUnBlockUserMutation,
    useGetAllUsersQuery,
    // useBlockUnBlockUserMutation,
    useUpgradeUserMutation,
} from '../../api/userApi';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { useNavigate } from 'react-router-dom';

export const UserDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { loggedUser } = useSelector((state: RootState) => state.auth);

    if (!loggedUser) {
        navigate('/login');
    }

    const userdata = location.state.userData;
    const [upgrade, { isLoading }] = useUpgradeUserMutation();

    const { data: getUserData } = useGetAllUsersQuery({ q: userdata.name });
    const [userdetails, setuserdetails] = useState({
        id: '',
        fullName: '',
        email: '',
        profile: {
            location: '',
        },
        role: {
            name: '',
        },
        settings: {
            lastLogin: '',
            is_blocked: '',
        },
        createdAt: '',
    });

    useEffect(() => {
        //@ts-ignore
        setuserdetails(getUserData?.data.users[0]);
    }, [getUserData?.data]);

    const [unblock] = useBlockUnBlockUserMutation();

    const date_joinedDate = userdetails?.createdAt
        ? new Date(userdetails.createdAt)
        : new Date();
    const formattedDate = date_joinedDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const lastactiveDate = userdetails?.settings?.lastLogin
        ? new Date(userdetails.settings.lastLogin)
        : new Date();
    const lastformattedDate = lastactiveDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const upgradeAccount = () => {
        let role;
        if (userdetails.role.name == 'creative') {
            role = 'vendor';
        } else if (userdetails.role.name == 'vendor') {
            role = 'executive';
        } else {
            role = 'executive';
        }

        upgrade({
            userId: userdetails.id,
            role: role,
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message);

                window.location.reload();
            })
            .catch((err) => {
                toast.error(err.data.message);
            });
    };

    const unBlock = () => {
        unblock({
            userId: userdata.id,
            action: 'unblock',
            reason: 'Account okay',
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message);

                window.location.reload();
            })
            .catch((err) => {
                toast.error(err.data.message);
            });
    };

    return (
        <>
            <div className="overflow-x-hidden" style={{ height: '100%' }}>
                <Sidebar />
                <div className="p-4 sm:ml-64">
                    <Header showBreadCrumb userId={userdata.id} />

                    <h3 className="mb-2 font-semibold">
                        User details for #{userdata.id}
                    </h3>

                    <div className="py-3 px-3 flex flex-col md:flex-row info_section rounded-lg">
                        <div className=" w-full md:w-1/2 mb-5 md:mb-0 gap-y-2">
                            <p
                                className="info-text"
                                style={{ marginBottom: 10 }}
                            >
                                User information
                            </p>
                            <div className="flex gap-4">
                                <div>
                                    <p className="info-text">Name</p>
                                    <p className="info-text">Email</p>
                                    <p className="info-text">UserID</p>
                                </div>
                                <div>
                                    <p
                                        className="info-text"
                                        style={{ color: 'black' }}
                                    >
                                        {userdetails?.fullName
                                            ? userdetails.fullName
                                            : 'N/A'}
                                    </p>

                                    <p
                                        className="info-text"
                                        style={{ color: 'black' }}
                                    >
                                        {userdetails?.email
                                            ? userdetails.email
                                            : 'N/A'}
                                    </p>
                                    <p
                                        className="info-text"
                                        style={{ color: 'black' }}
                                    >
                                        #
                                        {userdetails?.id
                                            ? userdetails.id
                                            : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 gap-y-2 w-full md:w-1/2 mb-5 md:mb-0">
                            <div>
                                <p className="info-text">Location</p>
                                <p className="info-text">Role</p>
                                <p className="info-text">Date joined</p>
                                <p className="info-text">
                                    Last date active
                                </p>{' '}
                            </div>
                            <div>
                                <p className="info-text">
                                    {userdetails?.profile?.location
                                        ? userdetails.profile.location
                                        : 'N/A'}
                                </p>
                                <p className="info-text">
                                    {userdetails?.role?.name
                                        ? userdetails.role.name
                                        : 'N/A'}
                                </p>
                                <p className="info-text">
                                    {formattedDate ?? 'Not set'}
                                </p>
                                <p className="info-text">
                                    {lastformattedDate ?? 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row flex flex-row flex-wrap justify-between mt-10">
                        {/* <div className="row grid grid-cols-1 md:grid-cols-2 mt-6"> */}
                        <div className="mb-4 box-container">
                            <h4 className="mb-2 heading">
                                Upgrade account to{' '}
                                {userdetails?.role?.name == 'creative'
                                    ? 'Vendor'
                                    : userdetails?.role?.name == 'Vendor'
                                    ? 'Executive'
                                    : 'Executive'}
                            </h4>

                            <p className="subtitle mb-3">
                                To upgrade this account to executive the user
                                has to have met all verification needed and
                                proper confirmation must be taken
                            </p>

                            <button
                                className="btn"
                                onClick={() => upgradeAccount()}
                            >
                                {isLoading ? (
                                    <Spinner width="17px" height="17px" />
                                ) : (
                                    'Upgrade'
                                )}
                            </button>
                        </div>

                        <div className="verification_box mb-4">
                            <div className="user-circle mr-4">
                                <img
                                    src={
                                        'https://cdn.blkat.io/assets/image/dashboard/user-tick.svg'
                                    }
                                    height={20}
                                    width={20}
                                />
                            </div>
                            <div>
                                <h5 className="text-white">
                                    Profile verification
                                </h5>
                                <p className="text-white subtext">
                                    This account hasn't completed profile
                                    registration
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row flex flex-row flex-wrap justify-between mt-10">
                        <div className="mb-4 box-container ">
                            <h4 className="mb-2 heading">Block account</h4>

                            <p className="subtitle mb-3">
                                Are you sure you want to block this account?
                                Blocking this account will prevent them from
                                perfoming any action on the platform.
                            </p>

                            {!userdetails?.settings?.is_blocked ? (
                                <button
                                    className="btn-block"
                                    onClick={() =>
                                        dispatch(
                                            toggleBlockUserModal({
                                                show: true,
                                            }),
                                        )
                                    }
                                >
                                    Block
                                </button>
                            ) : (
                                <button
                                    className="btn-block"
                                    onClick={() => unBlock()}
                                >
                                    Unblock
                                </button>
                            )}
                        </div>

                        {/* <div className="complaint_box mb-4">
                            <div className="flex flex-row justify-between">
                                <h5 className="font-bold">Complaint</h5>
                                <Link to={'/'}>
                                    <p className="see_all">See all</p>
                                </Link>
                            </div>
                            <div className="flex flex-row mb-2 mt-3">
                                <div className="flex gap-4 gap-y-2 w-full mb-5 md:mb-0">
                                    <div>
                                        <h5 className="complaint_header mb-3">
                                            From support
                                        </h5>
                                        <h5 className="complaint_header">
                                            Case ID
                                        </h5>
                                    </div>

                                    <div>
                                        <p className="complaint_text mb-3">
                                            I tried a certain action and it
                                            didnt work. Also my account got
                                            blocked.
                                        </p>
                                        <p className="complaint_text">
                                            #12345678
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <BlockModal userId={userdata.id} />
        </>
    );
};
