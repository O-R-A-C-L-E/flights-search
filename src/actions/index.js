import Type from './types'

export const setFlights = (data) => ({type:Type.SET_FLIGHTS, payload:data})

export const sortAscending = () => ({type:Type.SORT_ASCENDING});
export const sortDescending = () => ({type:Type.SORT_DESCENDING})
export const sortTripTime = () => ({type:Type.SORT_TRIP_TIME});

export const setFilterOneChange = () => ({type:Type.FILTER_ONE_CHANGE});
export const setFilterNoneChanges = () => ({type:Type.FILTER_NONE_CHANGES});


export const setPriceFrom = (price) => ({type:Type.SET_PRICE_FROM, payload:price});
export const setPriceTo = (price) => ({type:Type.SET_PRICE_TO, payload:price});

export const setAirlines = () => ({type:Type.SET_AIRLINES});

export const setLimit = (number) => ({type: Type.SET_LIMIT, payload:number})

