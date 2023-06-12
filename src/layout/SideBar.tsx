import React, { ReactNode } from 'react'
import { MdMenu } from 'react-icons/md'
import { TbSettings2, TbLayoutDashboard, TbFileAnalytics } from 'react-icons/tb'
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import { TiMessages } from 'react-icons/ti'
import { CiSaveDown2 } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { Avatar } from 'rsuite'
import { useAppSelector } from '../Store/hooks'
import { ConfigProvider } from 'antd'
import { Anttheme } from '../utils/AntUtils'
import useScreenSize from '../Hooks/useScreenSize'

interface SidebBarProps {
    children: ReactNode
}

export default function SideBar({ children }: SidebBarProps) {
    const menus = [
        { name: 'Dashboard', link: '/dashboard', icon: TbLayoutDashboard, key: 1 },
        { name: 'User', link: '/profile', icon: AiOutlineUser, key: 2 },
        { name: 'Messages', link: '/messages', icon: TiMessages, key: 3 },
        { name: 'Analytics', link: '/analytics', icon: TbFileAnalytics, key: 4, margin: true },
        { name: 'Cart', link: '/cart', icon: AiOutlineShoppingCart, key: 5 },
        { name: 'Saved', link: '/saved', icon: CiSaveDown2, key: 6, margin: true },
        { name: 'Settings', link: '/settings', icon: TbSettings2, key: 7 }
    ]

    const user = useAppSelector((state) => state.user.user)
    const screen = useScreenSize()
    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <section className="flex ">
            <div
                onClick={() => setOpen(!open)}
                className={`flex flex-col bg-[#191C20] min-h-screen  ${
                    open ? 'w-64 lg:w-72 ' : ' w-16 '
                } duration-500  px-4 text-gray-300`}
            >
                <div className="mt-2 py-3 flex justify-end ">
                    <MdMenu className="cursor-pointer" size={20} onClick={() => setOpen(!open)} />
                </div>

                <div className="mt-4 py-3 flex flex-col gap-4 relative">
                    {menus.map((menu) => (
                        <Link
                            to={menu.link}
                            key={menu.key}
                            className={` ${
                                menu.margin && `mt-6`
                            } flex gap-3 items-center font-semibold text-sm p-1.5 rounded-md ${
                                open && 'hover:bg-gray-900'
                            }`}
                        >
                            <div className={` ${!open && 'hover:text-white hover:scale-125 duration-300'} `}>
                                {React.createElement(menu.icon, { size: '20' })}
                            </div>
                            <h2
                                style={{}}
                                className={`font-rubik whitespace-pre duration-500 ${
                                    !open && 'opacity-0 translate-x-28 overflow-hidden'
                                } `}
                            >
                                {menu.name}
                            </h2>
                        </Link>
                    ))}
                </div>

                <div className={` ${open && 'flex'} items-center gap-3.5 mt-40 lg:mt-52`}>
                    <Avatar circle size="md" src={user?.profilePicture} />
                    <div>
                        <p
                            className={`font-geologica whitespace-pre font-bold ${
                                !open && 'opacity-0 overflow-hidden'
                            }`}
                        >
                            {user!.firstName}
                        </p>
                        <p
                            className={`font-rubik whitespace-pre font-extralight text-sm ${
                                !open && 'opacity-0 overflow-hidden'
                            }`}
                        >
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>

            <main className="w-full px-2 lg:px-3 lg:max-w-[1400px] mx-auto py-4 ">
                <ConfigProvider theme={Anttheme} componentSize={screen}>
                    {children}
                </ConfigProvider>
            </main>
        </section>
    )
}
