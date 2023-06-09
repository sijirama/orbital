import React, { ReactNode } from 'react'
import { MdMenu } from 'react-icons/md'
import { TbSettings2, TbLayoutDashboard, TbFileAnalytics } from 'react-icons/tb'
import { AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import { TiMessages } from 'react-icons/ti'
import { CiSaveDown2 } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { Avatar } from 'rsuite'

interface SidebBarProps {
    children: ReactNode
}

export default function SideBar({ children }: SidebBarProps) {
    const menus = [
        { name: 'Dashboard', link: '/', icon: TbLayoutDashboard, key: 1 },
        { name: 'User', link: '/profile', icon: AiOutlineUser, key: 2 },
        { name: 'Messages', link: '/messages', icon: TiMessages, key: 3 },
        { name: 'Analytics', link: '/analytics', icon: TbFileAnalytics, key: 4, margin: true },
        { name: 'Cart', link: '/cart', icon: AiOutlineShoppingCart, key: 5 },
        { name: 'Saved', link: '/saved', icon: CiSaveDown2, key: 6, margin: true },
        { name: 'Settings', link: '/settings', icon: TbSettings2, key: 7 }
    ]

    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <section className="flex ">
            <div
                onClick={() => setOpen(!open)}
                className={`flex flex-col bg-[#191C20] min-h-screen  ${
                    open ? 'w-56 lg:w-62 ' : ' w-16 '
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

                <div className={` ${open && 'flex'} items-center gap-3.5 mt-11 lg:mt-40`}>
                    <Avatar
                        circle
                        size="md"
                        src="https://firebasestorage.googleapis.com/v0/b/sandbox-a5bfe.appspot.com/o/e7a081488a533cc656e5f03f382d0d09.jpg?alt=media&token=3b6241cb-31d3-4982-8919-294b2b0751ec&_gl=1*1rcyn42*_ga*MjAyNzk5MTE1Ny4xNjgzNTUyMzQw*_ga_CW55HF8NVT*MTY4NTg4NzkzMy40LjEuMTY4NTg4Nzk5Ny4wLjAuMA.."
                    />
                    <div>
                        <p
                            className={`font-geologica whitespace-pre font-bold ${
                                !open && 'opacity-0 overflow-hidden'
                            }`}
                        >
                            sijirama
                        </p>
                        <p
                            className={`font-rubik whitespace-pre font-extralight text-sm ${
                                !open && 'opacity-0 overflow-hidden'
                            }`}
                        >
                            Software Engineer
                        </p>
                    </div>
                </div>
            </div>

            <main className="w-full px-2 lg:px-3 lg:max-w-[1400px] mx-auto py-4 ">{children}</main>
        </section>
    )
}
