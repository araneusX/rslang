import React, {useContext} from 'react';
import style from './stats.module.scss';
import { BackendContext } from '../../../backend/backendProvider';


const Full = () => {
    const {getAllDayStatistics} = useContext(BackendContext);

    return (
        <div className={style.graph}>Graph</div>
    )
}


export default Full;

