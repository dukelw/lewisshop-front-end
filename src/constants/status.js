const { SpinnerIcon, CancelIcon, TruckIcon, CheckIcon, ClipboardCheckIcon } = require('~/components/Icons');

const STATUS = {
  pending: {
    icon: <SpinnerIcon />,
    text: 'Pending',
  },
  canceled: {
    icon: <CancelIcon />,
    text: 'Canceled',
  },
  delivering: {
    icon: <TruckIcon />,
    text: 'Delivering',
  },
  confirming: {
    icon: <ClipboardCheckIcon />,
    text: 'Confirmed',
  },
  shipped: {
    icon: <CheckIcon />,
    text: 'Completed',
  },
};

export default STATUS;
