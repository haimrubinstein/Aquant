import React from "react";
import './Map.css';
import UserInput from "./UserInput/UserInput";
import {loadBingApi} from "./MapHelper";

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.mapRef = React.createRef();
    }

    componentDidMount() {
        loadBingApi().then(() => {
            this.initMap();
        });
    }

    onMark = ({lat, lng}) => {
        let {map, points = []} = this.state;

        if(!map) {
            return;
        }

        if(Number( lat) < -90 || Number(lat) > 90 || Number(lng) < -180 || Number(lng) > 180) {
            return;
        }

        points.push( new window.Microsoft.Maps.Location(lat, lng));

        var center = map.getCenter();
        map.entities.clear();


        let polygonPoints = [center, ...points, center];

        //Create a polygon
        var polygon = new window.Microsoft.Maps.Polygon(polygonPoints, {
            fillColor: '#ff000038',
            strokeColor: 'red',
            strokeThickness: 1
        });

        //Add the polygon to map
        map.entities.push(polygon);
        console.log(points)
        this.setState({points});
    };

    initMap() {
        const map = new window.Microsoft.Maps.Map(this.mapRef.current);
        if (this.props.mapOptions) {
            map.setOptions(this.props.mapOptions);
        }

        this.setState({map});
    }

    render() {
        return (
            <div className={'content'}>
                <div className={'user-input-container'}>
                    <UserInput onSelect={this.onMark}/>
                </div>

                <div className={'map-container'}>
                    <div ref={this.mapRef} className="map"/>
                </div>

            </div>);
    }
}
