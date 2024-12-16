```tsx
import React from 'react';
import { useBookingStore } from '../../store/useBookingStore';
import FlightHistoryTable from '../FlightHistory/FlightHistoryTable';

interface AircraftFlightHistoryProps {
  aircraftId: string;
}

const AircraftFlightHistory: React.FC<AircraftFlightHistoryProps> = ({ aircraftId }) => {
  const { bookings } = useBookingStore();
  
  // Get completed flights for this aircraft
  const completedFlights = bookings.filter(
    booking => booking.aircraftId === aircraftId && booking.status === 'complete'
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Flight History</h3>
      <FlightHistoryTable bookings={completedFlights} showAircraft={false} />
    </div>
  );
};

export default AircraftFlightHistory;
```