import './style.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Table } from '../../components/Table';
import { useGetAllUsersQuery, useUpgradeUserMutation } from '../../api/userApi';

import { CircleImage } from './CircleImage';

// import Dataa from './data.json';
import { useDispatch } from 'react-redux';
import { toggleBlockUserModal } from '../../state/slices/blockuser';
import { BlockModal } from '../../components/BlockModal';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const Users = () => {
    const navigate = useNavigate();
    const { loggedUser } = useSelector((state: RootState) => state.auth);

    if (!loggedUser) {
        navigate('/login');
    }

    const { data: getAllUsersResponse } = useGetAllUsersQuery(undefined);
    const [upgrade] = useUpgradeUserMutation();

    const [rowDropdown, setRowDropdown] = useState({
        id: '',
        state: false,
    });
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();

    // console.log({ rowDropdown });
    const [data, setData] = useState<
        {
            id: string;
            name: string;
            role: string;
            date_joined: string;
            last_active: string;
            status: string;
            image: string;
            userID: string;
            username: string;
        }[]
        //@ts-ignore
    >([{}]);

    useEffect(() => {
        if (getAllUsersResponse?.data) {
            setData(
                getAllUsersResponse.data.users.map((user) => ({
                    id: user.id,
                    name: user.firstName + ' ' + user.lastName,
                    role: user.role.name,
                    //@ts-ignore
                    date_joined: user.settings.joinDate,
                    is_blocked: user.settings.isBlocked,
                    //@ts-ignore
                    last_active: user.settings.lastLogin ?? 'N/A',
                    status: 'active',
                    image:
                        user.displayImage ??
                        'https://cdn.blkat.io/assets/image/vendor-profile.png',
                    userID: user.id,
                    username: user.username,
                })),
            );
        }
    }, [getAllUsersResponse?.data]);

    const userColumns = [
        {
            header: '',
            accessorKey: 'image',
            cell: (data: any) => (
                <div
                    onClick={() => {
                        navigate('/user_details', {
                            state: {
                                userData: data.row.original,
                            },
                        });
                    }}
                    className="flex items-stretch self-center m-0"
                >
                    <CircleImage src={data.row.original.image} />
                </div>
            ),
        },
        {
            header: 'Name',
            accessorKey: 'name',
            cell: (data: any) => (
                <div>
                    <p>{data.row.original.name}</p>
                    <p className="subtext text-xs">
                        @{data.row.original.username}
                    </p>
                </div>
            ),
        },
        {
            header: 'Role',
            accessorKey: 'role',
        },
        {
            header: 'Date joined',
            accessorKey: 'date_joined',
            cell: (data: any) => {
                // Check if last_active is null or undefined
                if (data.row.original.date_joined === 'N/A') {
                    return <div>N/A</div>;
                } else {
                    const date_joinedDate = new Date(
                        data.row.original.date_joined,
                    );
                    const formattedDate = date_joinedDate.toLocaleDateString(
                        undefined,
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        },
                    );
                    return <div>{formattedDate}</div>;
                }
            },
        },
        {
            header: 'Last date active',
            accessorKey: 'last_active',
            cell: (data: any) => {
                // Check if last_active is null or undefined
                if (data.row.original.last_active === 'N/A') {
                    return <div>N/A</div>;
                } else {
                    const lastActiveDate = new Date(
                        data.row.original.last_active,
                    );
                    const formattedDate = lastActiveDate.toLocaleDateString(
                        undefined,
                        {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        },
                    );
                    return <div>{formattedDate}</div>;
                }
            },
        },
        {
            header: 'Status',
            accessorKey: 'status',
        },
        {
            header: 'Action',
            accessorKey: 'action',
            cell: (data: any) => (
                <div style={{ position: 'relative' }}>
                    <div
                        onClick={() => {
                            setDropdown(true);
                            setRowDropdown({
                                id: data.row.original.id,
                                state: true,
                            });
                        }}
                        className="flex flex-row bg-[#EFEFEF] rounded-lg p-2 items-center justify-center"
                        style={{
                            width: 50,
                            cursor: 'pointer',
                        }}
                    >
                        <span style={{ fontSize: 10 }}>&#9679;</span>
                        <span style={{ fontSize: 10 }}>&#9679;</span>
                        <span style={{ fontSize: 10 }}>&#9679;</span>
                    </div>
                    {dropdown && rowDropdown.id == data.row.original.id && (
                        <div
                            className="bg-[#fff] p-4 rounded-lg"
                            style={{
                                position: 'absolute',
                                top: '30px',
                                left: '-30px',
                                border: '1px solid #E6EAEE',
                                width: 170,
                                alignItems: 'center',
                                zIndex: 98,
                            }}
                        >
                            <ul>
                                <li
                                    className="flex flex-row items-center mb-3 cursor-pointer"
                                    onClick={() => {
                                        navigate('/user_details', {
                                            state: {
                                                userData: data.row.original,
                                            },
                                        });
                                    }}
                                >
                                    <img
                                        src={
                                            'https://cdn.blkat.io/assets/image/dashboard/profile.svg'
                                        }
                                        height={20}
                                        width={20}
                                    />
                                    <p className="text-xs pl-2 font-normal text-[#8D9091]">
                                        View details
                                    </p>
                                </li>
                                <li
                                    className="flex flex-row items-center mb-3 cursor-pointer"
                                    onClick={() =>
                                        dispatch(
                                            toggleBlockUserModal({
                                                show: true,
                                            }),
                                        )
                                    }
                                >
                                    <img
                                        src={
                                            'https://cdn.blkat.io/assets/image/pages/lock.svg'
                                        }
                                        height={20}
                                        width={20}
                                    />
                                    <p className="text-xs pl-2 font-normal text-[#8D9091]">
                                        Block account
                                    </p>
                                </li>
                                <li
                                    className="flex flex-row items-center cursor-pointer"
                                    onClick={() =>
                                        upgradeAccount(
                                            data.row.original.id,
                                            data.row.original.role,
                                        )
                                    }
                                >
                                    <img
                                        src={
                                            'https://cdn.blkat.io/assets/image/pages/upgrade.svg'
                                        }
                                        height={20}
                                        width={20}
                                    />
                                    <p className="text-xs pl-2 font-normal text-[#8D9091]">
                                        Upgrade account
                                    </p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const upgradeAccount = (id: string, role: string) => {
        let userRole;
        if (role == 'creative') {
            userRole = 'vendor';
        } else if (role == 'vendor') {
            userRole = 'executive';
        } else {
            userRole = 'executive';
        }

        upgrade({
            userId: id,
            role: userRole,
        })
            .unwrap()
            .then((res) => {
                toast.success(res.message);

                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((err) => {
                toast.error(err.data.message);
            });
    };

    return (
        <div
            className="overflow-x-hidden"
            style={{ height: '100%' }}
            onClick={() => {
                if (dropdown) {
                    setDropdown(false);
                }
            }}
        >
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <Header />

                <h4 className="mb-2 heading">User Details</h4>

                {/* <Table data={Dataa} columns={userColumns} /> */}
                <Table data={data} columns={userColumns} />
            </div>

            <BlockModal userId={rowDropdown.id} />
        </div>
    );
};
