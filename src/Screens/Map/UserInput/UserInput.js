import React, {useCallback, useState} from "react";
import './UserInput.css';

export default (props) => {

    const [lat, setLat] = useState();
    const [lng, setLng] = useState();

    const handleLatChange = useCallback((e) => {
        setLat(e.target.value);
    }, [setLat]);

    const handleLngChange = useCallback((e) => {
        setLng(e.target.value);
    }, [setLng]);

    const onSelect = () => {
        props.onSelect({lat,lng});
    };

    return (
        <div className={'input-container'}>
            <input value={lat} type={'text'} onChange={handleLatChange} placeholder={'Lat'}/>
            <input value={lng} type={'text'} onChange={handleLngChange} placeholder={'Lng'}/>
            <button onClick={onSelect}> Mark</button>
            <button onClick={props.onClear}> Clear all</button>
        </div>
    )
}
