import styles from './index.less';
import { Button } from 'antd'

export default () => {
   return (
        <div>
            <div className={styles.title}>Page index</div>
            <Button type="primary">Primary Button</Button>
            <div className={styles.f1}>123123123</div>
        </div>
   );
}
