import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Action from '../actions'

const OptionsMenu = () => {
    const dispatch = useDispatch();

    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, stPriceTo] = useState(150000);
    const filters = useSelector(state => state.reducer.filters);

    const handlePriceDispatch = () => {
            dispatch(Action.setPriceFrom(priceFrom));
            dispatch(Action.setPriceTo(priceTo));
    }

    const onChangeInput = (e) => {
        const num = /^[0-9\b]+$/;
        let input = e.target;
        if (input.value === "" || num.test(input.value)) {
            switch (true) {
                case input.name === "priceFrom":
                    setPriceFrom(parseInt(input.value));
                    break;
                case input.name === "priceTo":
                    stPriceTo(parseInt(input.value));
                    break;
                default:
                    return;
            }
        }

        switch (true) {
            case input.id === "ascending":
                dispatch(Action.sortAscending());
                break;
            case input.id === "descending":
                dispatch(Action.sortDescending());
                break;
            case input.id === "trip-time":
                dispatch(Action.sortTripTime());
                break;
            case input.name === "airlines":
                dispatch(Action.setAirlines(input.id));
                break;
            case input.name === "transfers":
                dispatch(Action.setFilterTransfer(parseInt(input.id)));
                break;
            default:
                return;
        }
    }


    const flights = useSelector(state => state.reducer.flights);

    const filterAirlines =
        flights.map(item => {

            return item.flight.legs.map(leg => {

                return leg.segments.map(seg => {

                    return seg.airline.caption;
                });

            });

        });

    let uniqueAirlinesSet = new Set();
    const getUniqueValuesFromArray = (arr, result) => {
        if (arr && Array.isArray(arr)) {
            arr.map(item => getUniqueValuesFromArray(item, result));
        } else {
            return result.add(arr);
        }
    };
    getUniqueValuesFromArray(filterAirlines, uniqueAirlinesSet);
    const uniqueAirlines = [...uniqueAirlinesSet];


    const filterTransfers = flights.map(item => {
        return item.flight.legs.map(leg => {
            return leg.segments.length - 1;
        })
    })
    let uniqueTransfersSet = new Set();
    getUniqueValuesFromArray(filterTransfers, uniqueTransfersSet);
    const allTransfers = [...uniqueTransfersSet];


    return (
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


                    {allTransfers.map(item => {
                        let itemLiteral = item === 0 ? `без пересадок` : item > 1 ? `${item} пересадки` : `${item} пересадка`;
                        return (
                            <label key={item}>
                                <input
                                    id={item}
                                    type="checkbox"
                                    name="transfers"
                                    onChange={(e) => onChangeInput(e)}
                                /> - {itemLiteral}
                            </label>
                        )
                    })}
                </div>

                <div className="options__price">
                    <h4>Цена</h4>
                    <label>
                        От <input
                        className="price-input"
                        required pattern={/[0-9]/}
                        type="number"
                        name="priceFrom"
                        value={priceFrom}
                        onBlur={e => handlePriceDispatch(e)}
                        onChange={e => onChangeInput(e)}
                    />
                    </label>
                    <label>
                        До <input
                        className="price-input"
                        required pattern={/[0-9]/}
                        type="number"
                        name="priceTo"
                        value={priceTo}
                        onBlur={e => handlePriceDispatch(e)}
                        onChange={e => onChangeInput(e)}
                    />
                    </label>
                </div>

                <div className="options__airlines">
                    <h4>Авиакомпании</h4>

                    <label className="airline-filter">
                        <input
                            id="all"
                            type="checkbox"
                            checked={filters.airlines.length === 0}
                            disabled
                            name='airlines'
                            onChange={(e) => onChangeInput(e)}
                        /> - All airlines
                    </label>
                    {uniqueAirlines.map(item => {
                        return (
                            <label key={item} className="airline-filter">
                                <input
                                    id={item}
                                    type="checkbox"
                                    name='airlines'
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
