import styles from './index.less';
import { Button } from 'antd'
import { UserStore } from '@/stores'

const Page = () => {

    const handleClick = () => {
        UserStore.getUserInfo();
    }

    return (
        <div>
            <div className={styles.title}>Page index</div>
            <div className={styles.title}>Page index</div>
            <Button onClick={handleClick}>get Info</Button>
        </div>
    );
}

Page.label = 'pushMessage'

export default Page