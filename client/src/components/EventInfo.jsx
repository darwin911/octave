import React from 'react';

const EventInfo = ({ event }) => {
  return (
    <>
      <div style={{ fontSize: '0.75em' }}>
        <h4>Info:</h4>
        <p>{event.info}</p>
      </div>
      <br />
      {event.ticketLimit && (
        <div style={{ fontSize: '0.75em' }}>
          <h5>Ticket Limit:</h5>
          <p>{event.ticketLimit.info}</p>
          <br />
        </div>
      )}
      <div style={{ fontSize: '0.75em' }}>
        <h5>Please Note:</h5>
        <p>{event.pleaseNote}</p>
      </div>
      <br />
    </>
  );
};

export default EventInfo;
