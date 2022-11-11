import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../utils/store';

type TProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export const CurrencySelect: React.FC<TProps> = ({
  label,
  value,
  onChange,
}) => {
  const { currencies } = useAppSelector((state) => state.slice);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          label={label}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e: SelectChangeEvent) => onChange(e.target.value)}
        >
          {Object.keys(currencies).map((key) => (
            <MenuItem key={key} value={key}>
              {key}: {currencies[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
