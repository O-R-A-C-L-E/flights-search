import Type from '../actions/types'

export const initialState = {
    flights: [],

    filters: {
        isAscendingPrice: false,
        isDescendingPrice: false,
        isTripTime: false,

        transfers: [],

        priceFrom: 0,
        priceTo: 150000,

        airlines: []
    },
    limit: 4,
}

export default function flightsStore(state = initialState, action){
    switch (action.type){
        case Type.SET_FLIGHTS:
            return {
                ...state,
                flights: action.payload.flights,
                bestPrices: action.payload.bestPrices
            }
        case Type.SORT_ASCENDING:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isAscendingPrice: !state.filters.isAscendingPrice,
                    isDescendingPrice: false,
                    isTripTime: false
                },

            }
        case Type.SORT_DESCENDING:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isAscendingPrice: false,
                    isDescendingPrice: !state.filters.isDescendingPrice,
                    isTripTime: false
                },

            }
        case Type.SORT_TRIP_TIME:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isAscendingPrice: false,
                    isDescendingPrice: false,
                    isTripTime: !state.filters.isTripTime
                },
            }
        case Type.FILTER_BY_TRANSFERS:
            let transfer = action.payload;
            let resultTransfers;
            if (state.filters.transfers.includes(transfer)){
                resultTransfers = state.filters.transfers.filter(item => item !== transfer);
            } else {
                resultTransfers = state.filters.transfers.concat(transfer);
            }
            return {
                ...state,
                filters: {
                    ...state.filters,
                    transfers: resultTransfers,
                }
            }
        case Type.SET_PRICE_FROM:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    priceFrom: action.payload
                }
            }
        case Type.SET_PRICE_TO:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    priceTo: action.payload
                },
            }
        case Type.SET_AIRLINES:
            let airline = action.payload;
            let airlinesResult;
            if (state.filters.airlines.includes(airline)){
                airlinesResult = state.filters.airlines.filter(item => {
                    return item !== airline;
                })
            } else {
                airlinesResult = state.filters.airlines.concat(airline);
            }
            return {
                ...state,
                filters: {
                    ...state.filters,
                    airlines:airlinesResult,

                }
            }
        case Type.SET_LIMIT:
            return {
                ...state,
                limit: state.limit + action.payload
            }
        default:
            return state;

    }
}