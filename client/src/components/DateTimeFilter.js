import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';

export default function DateTimeFilter(props) {
  const { title, dateValue, setDateValue, timeValue, setTimeValue, minDateValue, minTimeValue, maxDateValue, maxTimeValue } = props;
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack marginTop={2} spacing={1.5} borderBottom='solid 3px #FFF ' paddingBottom='15px' width='360px' >
        {
          title === "From" ?
            <Typography
              id="date-time-filter"
              gutterBottom
              fontSize='20px'
              fontWeight='bold'
              marginRight='290px'>
              {title}
            </Typography> :
            <Typography
              id="date-time-filter"
              gutterBottom
              fontSize='20px'
              fontWeight='bold'
              marginRight='315px'>
              {title}
            </Typography>
        }

        <MobileDatePicker
          label="Date"
          value={dateValue}
          minDate={minDateValue !== null ? minDateValue : ""}
          maxDate={maxDateValue !== null ? maxDateValue : ""}
          sx={{ color: "black" }}
          onChange={(newValue) => {
            setDateValue(newValue);

            if (title === "From") {
              props.setFilters({
                ...props.filters,
                valueFrom: newValue,
              });
            }
            else if (title === "To") {
              props.setFilters({
                ...props.filters,
                valueTo: newValue,
              });
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        <MobileTimePicker
          label="Time"
          value={timeValue}
          minTime={(title === "To" && dayjs(dateValue).isSame(minDateValue) && minTimeValue !== null) ? minTimeValue : null}
          maxTime={(title === "From" && dayjs(dateValue).isSame(maxDateValue) && maxTimeValue !== null) ? maxTimeValue : null}
          onChange={(newValue) => {
            setTimeValue(newValue);
            if (title === "From") {
              props.setFilters({
                ...props.filters,
                timeFrom: newValue,
              });
            }
            else if (title === "To") {
              props.setFilters({
                ...props.filters,
                timeTo: newValue,
              });
            }
          }}
          renderInput={(params) => <TextField {...params} />}
        />

      </Stack>
    </LocalizationProvider>
  );
}