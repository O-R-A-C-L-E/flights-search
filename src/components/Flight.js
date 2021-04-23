import React from 'react';
import '../flight.css'
import FlightDetail from "./FlightDetail";

const Flight = (props) => {

    function createFlightDetail(leg){
        const duration = leg.duration;
        const segmentsCount = leg.segments.length - 1;
        const departureDetails = leg.segments[0];
        let arrivalDetails = leg.segments[leg.segments.length - 1];
        if (arrivalDetails === undefined){
            arrivalDetails = departureDetails;
        }
        return(
            <FlightDetail
                key={departureDetails.flightNumber}
                departure={departureDetails}
                arrival={arrivalDetails}
                segmentsCount={segmentsCount}
                flightDuration={duration}
                airline={departureDetails.airline}
            />
        )
    }

    const flightDetails = props.data.flight.legs.map(leg => {
        return createFlightDetail(leg);
    })

    return (
        <div className="flight">
            <div className='header'>
                <div>{props.data.flight.carrier.caption}</div>
                <div>
                    <span>{Math.round(props.data.flight.price.passengerPrices[0].singlePassengerTotal.amount) + " ₽"}</span>
                    <span style={{fontSize: 12}}>Стоимость для одного взрослого пассажира</span>
                </div>
            </div>
            {flightDetails}

            <button>Выбрать</button>
        </div>
    )

};

export default Flight;

