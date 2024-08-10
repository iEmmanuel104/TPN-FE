import { useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { SettingRow } from '../../components/SettingRow';
import { Sidebar } from '../../components/Sidebar';
import './style.scss';
import { RootState } from '../../state/store';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const { loggedUser } = useSelector((state: RootState) => state.auth);

    if (!loggedUser) {
        navigate('/login');
    }

    return (
        <div style={{ height: '100%' }} className="overflow-x-hidden">
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <Header />

                <div className="w-100 settings-container p-6 pb-10">
                    <h3 className="font-semibold mb-5">User settings</h3>

                    <SettingRow
                        title="Full Name"
                        subtitle={user?.firstName + ' ' + user?.lastName}
                        actionBtn=""
                    />
                    <SettingRow
                        title="Email Address"
                        subtitle={user?.email}
                        actionBtn=""
                    />
                    <SettingRow
                        title="Password"
                        subtitle="Password must be atleast 8 characters long"
                        actionBtn="Change"
                        onPress={() => navigate('/change_password')}
                    />

                    {/* <h3 className="font-semibold mt-10 mb-5">Security</h3>
                    <SettingRow
                        title="Security Question"
                        subtitle="By creating a security question, you will add an additional layer of protection for your revenue withdrawals and for changing your password."
                        actionBtn="Edit"
                    />
                    <SettingRow
                        title="Use two-factor authentication"
                        subtitle="To help keep your account secure, we'll ask you to submit a code when using a new device to log in. We'll send the code via SMS or email."
                        actionBtn={
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                />
                                <div className="relative w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black-300 dark:peer-focus:ring-black-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-[#000]"></div>
                            </label>
                        }
                    /> */}

                    {/* <div className="my-5 w-full md:w-1/2">
                        <hr />
                    </div> */}

                    {/* <p className="text-xs text-[#FF0000]">Deactivate account</p> */}
                </div>
            </div>
        </div>
    );
};
