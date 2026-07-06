import { useState } from 'react';
import { OrderCard, OrderCardProps } from './OrderCard';
import { AutoCareModals, AutoCareModalType } from './AutoCareModals';

export function AutoCareOrderCard(props: OrderCardProps) {
  const [openModal, setOpenModal] = useState<AutoCareModalType>(null);

  const cardWithHandlers: OrderCardProps = {
    ...props,
    actions: props.actions?.map(a => {
      if (a.label === 'Check in')    return { ...a, onClick: () => setOpenModal('checkIn') };
      if (a.label === 'Reschedule')  return { ...a, onClick: () => setOpenModal('reschedule') };
      if (a.label === 'View details') return { ...a, onClick: () => setOpenModal('viewDetails') };
      return a;
    }),
  };

  return (
    <>
      <OrderCard {...cardWithHandlers} />
      <AutoCareModals
        openModal={openModal}
        onClose={() => setOpenModal(null)}
        onSwitchToCheckIn={() => setOpenModal('checkIn')}
        onSwitchToReschedule={() => setOpenModal('reschedule')}
        serviceDetails={props.serviceDetails}
        location={props.location}
        statusHeading={props.statusHeading}
        orderTotal={props.orderTotal}
        appointmentDate={new Date(2026, 2, 7)}
      />
    </>
  );
}
