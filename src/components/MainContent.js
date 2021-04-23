import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as Action from '../actions'
import Flight from "./Flight";


const MainContent = () => {

    const [isLoading, setLoading] = useState(false);
    const flights = useSelector(state => state.reducer.flights);
    const filters = useSelector(state => state.reducer.filters);
    const limit = useSelector(state => state.reducer.limit);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
            fetch("./assets/flights.json")
                .then(res => res.json())
                .then(data => {
                    dispatch(Action.setFlights(data.result));
                    setLoading(false);
                })
                .catch(err => alert("An error occurred " + err));
    }, [dispatch]);


    return (
        <div className="main-content">
            {isLoading ? <h1>Loading</h1> : applySort(applyFilters(flights, filters)).slice(0, limit).map(flight => {
                return (<Flight
                        key={flight.flightToken}
                        data={flight}
                    />
                )
            })}
            <button onClick={() => dispatch(Action.setLimit(50))}>Показать ещё</button>
        </div>
    )


};

function applySort([data, filters]) {
    var result = data;
    if (filters.isAscendingPrice) {
        result = result.sort((a, b) => {
            return a.flight.price.total.amount - b.flight.price.total.amount;
        });
    }
    if (filters.isDescendingPrice) {
        result = result.sort((a, b) => {
            return b.flight.price.total.amount - a.flight.price.total.amount;
        });
    }
    if (filters.isTripTime) {
        result = result.sort((a, b) => {
            let A_LEGS_DURATION_SUM = a.flight.legs[0].duration + a.flight.legs[a.flight.legs.length - 1].duration;
            let B_LEGS_DURATION_SUM = b.flight.legs[0].duration + b.flight.legs[b.flight.legs.length - 1].duration;
            return A_LEGS_DURATION_SUM - B_LEGS_DURATION_SUM;
        });
    }
    return result;
}

function  applyFilters(data, filters) {
    var result = data;
    if (filters.priceFrom) {
        result = result.filter(item => {
            if (item.flight.price.total.amount >= filters.priceFrom) {
                return item;
            }
        });
    }

    if (filters.priceTo) {
        result = result.filter(item => {
            if (item.flight.price.total.amount <= filters.priceTo) {
                return item;
            }
        });
    }
    if (filters.airlines.length) {
        result = result.filter(item => {
            if (filters.airlines.includes(item.flight.carrier.caption)) {
                return item;
            }
        });
    }
    if (filters.transfers.length) {
        result = result.filter(item => {
            let legs = item.flight.legs;
            if (filters.transfers.includes(getTransfersCount(legs[0])) && filters.transfers.includes(getTransfersCount(legs[1]))) {
                return item;
            }
        });
    }

    return [result, filters];
}

function getTransfersCount(leg) {
    return leg.segments.length - 1;
}


export default MainContent;