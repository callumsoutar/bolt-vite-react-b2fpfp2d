import React, { useEffect, useState } from 'react';
import { useResourceStore } from '../../store/useResourceStore';
import { useBookingStore } from '../../store/useBookingStore';
import { useMemberStore } from '../../store/useMemberStore';
import BookingModal from '../Booking/BookingModal';
import ViewBookingModal from '../Booking/ViewBookingModal';
import BookingHoverModal from './BookingHoverModal';
import type { ResourceType, Booking } from '../../types';
import { formatHour } from '../../utils/dateUtils';

const ScheduleGrid = () => {
  const { staff, aircraft, fetchResources } = useResourceStore();
  const { bookings, fetchBookings, selectedDate, updateBooking } = useBookingStore();
  const { members, fetchMembers } = useMemberStore();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [hoverBooking, setHoverBooking] = useState<Booking | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    resourceId: string;
    resourceType: ResourceType;
  } | null>(null);

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  useEffect(() => {
    fetchResources();
    fetchBookings();
    fetchMembers();
  }, [fetchResources, fetchBookings, fetchMembers, selectedDate]);

  const getBookingsForResource = (resourceId: string): Booking[] => {
    return bookings.filter(booking => 
      booking.instructorId === resourceId || booking.aircraftId === resourceId
    );
  };

  const getMemberName = (memberId?: string) => {
    if (!memberId) return '';
    const member = members.find(m => m.id === memberId);
    return member ? member.name : '';
  };

  const getBookingColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500';
      case 'complete':
        return 'bg-green-500';
      case 'unconfirmed':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSlotClick = (hour: number, resourceId: string, resourceType: ResourceType) => {
    const startTime = new Date(selectedDate);
    startTime.setHours(hour, 0, 0, 0);
    
    setSelectedSlot({
      startTime: startTime.toISOString(),
      resourceId,
      resourceType,
    });
    setIsModalOpen(true);
  };

  const handleBookingClick = (e: React.MouseEvent, booking: Booking) => {
    e.stopPropagation();
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleStatusChange = async (status: 'confirmed' | 'complete' | 'canceled') => {
    if (!selectedBooking) return;
    
    try {
      await updateBooking(selectedBooking.id, {
        ...selectedBooking,
        status,
      });
      setIsViewModalOpen(false);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const handleBookingHover = (e: React.MouseEvent, booking: Booking) => {
    setHoverBooking(booking);
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  const handleBookingHoverEnd = () => {
    setHoverBooking(null);
    setHoverPosition(null);
  };

  const renderBooking = (booking: Booking) => {
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    const startHour = startDate.getHours() + (startDate.getMinutes() / 60);
    const endHour = endDate.getHours() + (endDate.getMinutes() / 60);
    
    const left = ((startHour - 8) / 12) * 100;
    const width = ((endHour - startHour) / 12) * 100;

    return (
      <div
        key={booking.id}
        onClick={(e) => handleBookingClick(e, booking)}
        onMouseEnter={(e) => handleBookingHover(e, booking)}
        onMouseLeave={handleBookingHoverEnd}
        className={`absolute inset-y-1 rounded-md overflow-hidden text-white text-xs p-1.5 cursor-pointer ${getBookingColor(booking.status)}`}
        style={{
          left: `${left}%`,
          width: `${width}%`,
          zIndex: 10,
        }}
      >
        <div className="font-medium truncate">
          {getMemberName(booking.memberId)}
        </div>
        {booking.status !== 'confirmed' && (
          <div className="text-xs opacity-75 truncate">
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Time header */}
      <div className="grid grid-cols-[150px_repeat(12,1fr)] border-b">
        <div className="p-3 font-semibold text-gray-600 border-r">Resource</div>
        {hours.map((hour) => (
          <div key={hour} className="p-3 font-semibold text-gray-600 text-center border-r">
            {formatHour(hour)}
          </div>
        ))}
      </div>

      {/* Staff Section */}
      {staff.length > 0 && (
        <>
          <div className="border-b bg-gray-100">
            <div className="p-2 font-semibold text-gray-700 pl-4">Staff</div>
          </div>
          {staff.map((member) => (
            <div key={member.id} className="grid grid-cols-[150px_1fr] border-b">
              <div className="p-3 font-medium text-gray-700 border-r bg-gray-50">
                {member.name}
              </div>
              <div className="relative grid grid-cols-12">
                {getBookingsForResource(member.id).map(renderBooking)}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    onClick={() => handleSlotClick(hour, member.id, 'staff')}
                    className="border-r h-full hover:bg-blue-50 cursor-pointer transition-colors"
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Aircraft Section */}
      {aircraft.length > 0 && (
        <>
          <div className="border-b bg-gray-100">
            <div className="p-2 font-semibold text-gray-700 pl-4">Aircraft</div>
          </div>
          {aircraft.map((plane) => (
            <div key={plane.id} className="grid grid-cols-[150px_1fr] border-b">
              <div className="p-3 font-medium text-gray-700 border-r bg-gray-50">
                {`${plane.type} - ${plane.registration}`}
              </div>
              <div className="relative grid grid-cols-12">
                {getBookingsForResource(plane.id).map(renderBooking)}
                {hours.map((hour) => (
                  <div
                    key={hour}
                    onClick={() => handleSlotClick(hour, plane.id, 'aircraft')}
                    className="border-r h-full hover:bg-blue-50 cursor-pointer transition-colors"
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSlot(null);
        }}
        initialData={selectedSlot}
      />

      {selectedBooking && (
        <ViewBookingModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedBooking(null);
          }}
          booking={selectedBooking}
          onEdit={() => {
            setIsViewModalOpen(false);
            // Handle edit logic
          }}
          onStatusChange={handleStatusChange}
        />
      )}

      {hoverBooking && hoverPosition && (
        <BookingHoverModal
          booking={hoverBooking}
          position={hoverPosition}
          onMouseEnter={() => setHoverBooking(hoverBooking)}
          onMouseLeave={() => setHoverBooking(null)}
        />
      )}
    </div>
  );
};

export default ScheduleGrid;