
import React, {useState} from 'react';
import Session from './components/session';
import Full from './components/full'
import style from './statistics.module.scss';


const Statistics = () => {

    const [isToggled, setToggled] = useState(true)
    const toggleTrueFalse = () => setToggled(!isToggled);

    return (
        <div className={style.statsContainer}>
        <button className={style.statsButton} onClick={toggleTrueFalse}>Session stats / Total stats</button>
        { isToggled ? <Session /> : <Full /> }
        </div>
    )
}

export default Statistics;