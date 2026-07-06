import { useState } from 'react';
import { OrderCard, OrderCardProps } from './OrderCard';
import { GetItNowModal } from './GetItNowModal';

export function CurbsideOrderCard(props: OrderCardProps) {
  const [showGetItNow, setShowGetItNow] = useState(false);

  const cardWithHandlers: OrderCardProps = {
    ...props,
    actions: props.actions?.map(a => {
      if (a.label === 'Get it now') return { ...a, onClick: () => setShowGetItNow(true) };
      return a;
    }),
  };

  return (
    <>
      <OrderCard {...cardWithHandlers} />
      <GetItNowModal
        open={showGetItNow}
        onClose={() => setShowGetItNow(false)}
        location={props.location}
        orderTotal={props.orderTotal}
      />
    </>
  );
}
