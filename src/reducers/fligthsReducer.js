import Type from '../actions/types'

const initialState = {
    flights: [],

    filters: {
        isAscendingPrice: true,
        isDescendingPrice: false,
        isTripTime: false,

        isOneChange: false,
        isNoneChanges: false,

        priceFrom: "0",
        priceTo: "10000",

        airlines: ["all"]
    },
    limit: 2
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
                }
            }
        case Type.SORT_DESCENDING:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isAscendingPrice: false,
                    isDescendingPrice: !state.filters.isDescendingPrice,
                    isTripTime: false
                }
            }
        case Type.SORT_TRIP_TIME:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isAscendingPrice: false,
                    isDescendingPrice: false,
                    isTripTime: !state.filters.isTripTime
                }
            }
        case Type.FILTER_ONE_CHANGE:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isOneChange: !state.filters.isOneChange
                }
            }
        case Type.FILTER_NONE_CHANGES:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    isNoneChanges: !state.filters.isNoneChanges
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
                }
            }
        case Type.SET_AIRLINES:
            return {
                ...state,
                filters: {
                    ...state.filters,
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