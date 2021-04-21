import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as Action from '../actions'

const OptionsMenu = () => {

    const dispatch = useDispatch()
    const filters = useSelector(state => state.reducer.filters);


    const onChangeInput = (e) =>{
        const num = /^[0-9\b]+$/;
        let input = e.target;
        if (e.target.type === "text" && (e.target.value === "" || num.test(e.target.value))){
            // allow only numbers in "text" inputs
            switch (true){
                case input.name === "priceFrom":
                    dispatch(Action.setPriceFrom(e.target.value));
                    break;
                case input.name === "priceTo":
                    dispatch(Action.setPriceTo(e.target.value));
                    break;
                default:
                    return;
            }
        }
        switch (true){
            case input.id === "ascending":
                dispatch(Action.sortAscending());
                break;
            case input.id === "descending":
                dispatch(Action.sortDescending());
                break;
            case input.id === "trip-time":
                dispatch(Action.sortTripTime());
                break;
            case input.id === "one-change":
                dispatch(Action.setFilterOneChange());
                break;
            case input.id === "none-change":
                dispatch(Action.setFilterNoneChanges());
                break;
            case input.id === "lot-polish-air":
                dispatch(Action.setAirlines("lot-polish-air"));
                break;
            case input.id === "rus-air-fleet":
                dispatch(Action.setAirlines("rus-air-fleet"));
                break;
            default:
                return;
        }
    }


    const flights = useSelector(state => state.reducer.flights)

    const filterAirlines =
        flights.map(item => {
            return item.flight.legs.map(leg => {
                return leg.segments.map(seg => {
                    return  seg.airline.caption
                })
            })
        })



    let result = new Set();
    const getAllUniqueAirlines = (arr) =>{
        if (arr && Array.isArray(arr)){
            arr.map(item => getAllUniqueAirlines(item));
        } else {
            return result.add(arr);
        }
    }
    getAllUniqueAirlines(filterAirlines)
    const uniqueAirlines = [...result];



    return(
        <div className="options">
            <div className="container">

                <div className="options__sort">
                    <h4>Сортировать</h4>

                    <label>
                        <input
                            onChange={(e) => onChangeInput(e)}
                            id="ascending"
                            type="radio"
                            checked={filters.isAscendingPrice}
                            name="sort"
                            value="ascending"
                        /> - по возрастанию цены
                    </label>
                    <label>
                        <input
                            onChange={(e) => onChangeInput(e)}
                            id="descending"
                            type="radio"
                            name="sort"
                            value="descending"
                        /> - по убыванию цены
                    </label>
                    <label>
                        <input
                            onChange={(e) => onChangeInput(e)}
                            id="trip-time"
                            type="radio"
                            name="sort"
                            value="trip-time"
                        /> - по времени в пути
                    </label>
                </div>

                <div className="options__filters">
                    <h4>Фильтровать</h4>



                    <label>
                        <input
                            onChange={(e) => onChangeInput(e)}
                            id="one-change"
                            type="checkbox"
                        /> - 1 пересадка
                    </label>
                    <label>
                        <input
                            onChange={(e) => onChangeInput(e)}
                            id="none-change"
                            type="checkbox"
                        /> - без пересадок
                    </label>
                </div>

                <div className="options__price">
                    <h4>Цена</h4>

                    <label>
                        От <input
                        type="text"
                        name="priceFrom"
                        value={filters.priceFrom}
                        onChange={(e) => onChangeInput(e)}
                    />
                    </label>
                    <label>
                        До <input
                        type="text"
                        name="priceTo"
                        value={filters.priceTo}
                        onChange={(e) => onChangeInput(e)}
                    />
                    </label>
                </div>

                <div className="options__airlines">
                    <h4>Авиакомпании</h4>

                    {uniqueAirlines.map(item => {
                        return(
                            <label key={item} className="airline-filter">
                                <input
                                    id={item}
                                    type="checkbox"
                                    onChange={(e) => onChangeInput(e)}
                                /> - {item}
                            </label>
                        )
                    })}
                </div>
            </div>
        </div>
    )


};


export default OptionsMenu;
