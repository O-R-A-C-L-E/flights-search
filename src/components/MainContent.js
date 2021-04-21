import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as Action from '../actions'
import Flight from "./Flight";

const MainContent = () => {

    const dispatch = useDispatch();
    const flights = useSelector(state => state.reducer.flights);
    const limit = useSelector(state => state.reducer.limit)

    useEffect(() => {
        fetch("./assets/flights.json")
            .then(res => res.json())
            .then(data => dispatch(Action.setFlights(data.result)))
            .catch(err => alert("An error occurred " + err))
    }, [dispatch])


    const controlledDisplayFlights = flights.slice(0, limit)
    return (
        <div className="main-content">
            {controlledDisplayFlights.map(flight => {
                return( <Flight
                        key={flight.flightToken}
                        data={flight}
                    />
                )
            })}
            <button onClick={() => dispatch(Action.setLimit(8))}>Показать ещё</button>
        </div>
    )


};


export default MainContent;