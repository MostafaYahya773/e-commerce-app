import { Range } from 'react-range';

const MIN = 0;
const MAX = 6000;

export default function PriceSlider({ values, setValues }) {
  return (
    <div>
      <Range
        step={1}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => {
          const { key, ...rest } = props;
          return (
            <div
              {...rest}
              style={{
                ...props.style,
                height: '6px',
                backgroundColor: '#ccc',
                margin: '1rem 0',
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...rest } = props;
          return (
            <div
              {...rest}
              style={{
                ...props.style,
                height: '15px',
                width: '15px',
                backgroundColor: '#000',
                borderRadius: '50%',
              }}
            />
          );
        }}
      />

      <div className="flex justify-between text-sm text-gray-700 mt-2">
        <span> ${values[0]}</span>
        <span> ${values[1]}</span>
      </div>
    </div>
  );
}
