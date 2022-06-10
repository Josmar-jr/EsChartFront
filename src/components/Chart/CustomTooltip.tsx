import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { TooltipProps } from 'recharts';

interface Line {
  color: string;
  date: string;
  payload: {
    name: string;
    [key: string]: string;
  };
  value: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Line[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length && label) {
    const f = new Date(label).toString();
    const [formattedDate] = payload?.map(item => {
      if (item?.payload?.date) {
        return format(new Date(), "LLL d',' yyyy", {
          locale: enUS
        });
      }
    });

    return (
      <div className="bg-[#04111d] text-gray-500 text-center flex flex-col w-44 p-2 rounded-md shadow-xl">
        <strong className="text-white text-md">{f}</strong>
        <p className="font-medium">{`N° de bolsas: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}
