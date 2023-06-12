import SideBar from '../layout/SideBar'
import { Tabs } from 'antd'
import { useAppSelector } from '../Store/hooks'

export default function Profile() {
    const user = useAppSelector((state) => state.user.user)

    const { TabPane } = Tabs
    return (
        <SideBar>
            <section className="my-8  md:my-14">
                <h1 className="text-lg md:text-xl lg:text-2xl font-semibold font-geologica">
                    Welcome to your Profile, <span className="text-mydarkred font-bold">{user?.firstName}</span>.
                </h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="My Profile" key="1"></TabPane>
                    <TabPane tab="Password" key="2"></TabPane>
                </Tabs>
            </section>
        </SideBar>
    )
}
