import UserDetails from '../../assets/image/sidebar_icons/profile.svg';
import Dashboard from '../../assets/image/sidebar_icons/sidebar.svg';
import SideBarLogo from '../../assets/image/Sidebar_logo.svg';
import Settings from '../../assets/image/sidebar_icons/settings.svg';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
    const location = useLocation();

    return (
        <>
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-white focus:outline-white:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-[#FBFBFB] dark:focus:ring-[#FBFBFB]"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-5 pl-10 py-4 align-center overflow-y-auto bg-[#FBFBFB] dark:bg-[#FBFBFB]">
                    <img
                        src={SideBarLogo}
                        height={60}
                        width={60}
                        alt=""
                        className="mt-4 mb-5 pb-5 ml-2"
                    />

                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/dashboard"
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-white group text-[#8D9091] active:text-[#0D0D0D] focus:text-[#0D0D0D] ${
                                    location.pathname == '/dashboard' &&
                                    'active_link'
                                }`}
                            >
                                <img
                                    src={Dashboard}
                                    height={20}
                                    width={20}
                                    alt="Dashboard"
                                />
                                <span
                                    className={`flex-1 ms-3 whitespace-nowrap nav-text text-[#8D9091] ${
                                        location.pathname == '/dashboard' &&
                                        'active_text'
                                    }`}
                                >
                                    Dashboard
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/users"
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-white group text-[#8D9091] ${
                                    location.pathname == '/users' &&
                                    'active_link'
                                }`}
                            >
                                <img
                                    src={UserDetails}
                                    height={20}
                                    width={20}
                                    alt="Dashboard"
                                />
                                <span
                                    className={`flex-1 ms-3 whitespace-nowrap nav-text text-[#8D9091] ${
                                        location.pathname == '/users' &&
                                        'active_text'
                                    }`}
                                >
                                    User details
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/settings"
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-white group text-[#8D9091] ${
                                    (location.pathname == '/settings' ||
                                        location.pathname ==
                                            '/change_password') &&
                                    'active_link'
                                }`}
                            >
                                <img
                                    src={Settings}
                                    height={20}
                                    width={20}
                                    alt="Dashboard"
                                />
                                <span
                                    className={`flex-1 ms-3 whitespace-nowrap nav-text text-[#8D9091] ${
                                        (location.pathname == '/settings' ||
                                            location.pathname ==
                                                '/change_password') &&
                                        'active_text'
                                    }`}
                                >
                                    Settings
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};
