import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategorySelector from "../components/CategorySelector";
import DateTimeFilter from "../components/DateTimeFilter";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { ThemeProvider } from '@mui/material/styles';
import { Row } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import theme from "../Theme";
import CustomDialog from "../components/CustomDialog";

export default function Filters(props) {

  const navigate = useNavigate();

  const { choices, filters, setFilters, setValue, updateFilteredArticles } = props;

  const [categoryName, setCategoryName] = useState(filters.categoryName);
  const [price, setPrice] = useState(filters.price);
  const [liked, setLiked] = useState(filters.liked);
  const [valueFrom, setValueFrom] = useState(filters.valueFrom);
  const [timeFrom, setTimeFrom] = useState(filters.timeFrom);
  const [valueTo, setValueTo] = useState(filters.valueTo);
  const [timeTo, setTimeTo] = useState(filters.timeTo);
  const [isClear, setIsClear] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const areFiltersClear = () => {

    if (filters.categoryName.length !== 0) {
      return false;
    }
    if (filters.price[0] !== 0 || filters.price[1] !== 100) {
      return false;
    }
    if (filters.liked === true) {
      return false;
    }
    if (filters.valueFrom !== null || filters.timeFrom !== null) {
      return false;
    }
    if (filters.valueTo !== null || filters.timeTo !== null) {
      return false;
    }

    return true;
  }

  const handleClear = () => {
    setFilters({
      categoryName: [],
      price: [0, 100],
      liked: false,
      valueFrom: null,
      timeFrom: null,
      valueTo: null,
      timeTo: null,
    });
    setCategoryName([]);
    setPrice([0, 100]);
    setLiked(false);
    setValueFrom(null);
    setTimeFrom(null);
    setValueTo(null);
    setTimeTo(null);
    setIsClear(true);
    setAlertOpen(false);
  }

  useEffect(() => {
    if (isClear === true) {
      setIsClear(false);
      updateFilteredArticles();
      setValue(0);
      navigate("/");
    }
    // eslint-disable-next-line
  }, [filters.categoryName, filters.price, filters.liked, filters.valueFrom, filters.valueTo, filters.timeFrom, filters.timeTo]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CustomDialog title={"Clear filters?"} description={"By clicking 'Confirm' all the selected filters will be discarded"} confirmButton={"Confirm"} alertOpen={alertOpen} setAlertOpen={setAlertOpen} callbackFunction={handleClear} />

        <div className="Filters">

          <CategorySelector choices={choices} categoryName={categoryName} setCategoryName={setCategoryName} setFilters={setFilters} filters={filters}></CategorySelector>

          <Typography
            id="range-slider"
            gutterBottom
            fontSize="20px"
            fontWeight="bold"
            marginRight="290px"
          >
            Price
          </Typography>

          <Stack
            direction="column"
            spacing={3}
            alignItems="center"
            borderBottom="solid 3px #E2E2E2"
            paddingBottom="10px"
            width='360px'
          >

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              borderBottom="solid 3px #E2E2E2"
              paddingBottom="10px"
              width='360px'
            >
              <AttachMoneyIcon fontSize="medium" />

              <Slider
                key={price}
                sx={{ width: 300, color: "var(--clickable-text)" }}
                defaultValue={price}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} $`}
                onChangeCommitted={(event, newValue) => {
                  setPrice(newValue);
                  setFilters({
                    ...filters,
                    price: newValue,
                  });
                }}
              />
            </Stack>

            <DateTimeFilter title={"From"} dateValue={valueFrom} setDateValue={setValueFrom} timeValue={timeFrom} setTimeValue={setTimeFrom} filters={filters} setFilters={setFilters} minDateValue={null} minTimeValue={null} maxDateValue={valueTo} maxTimeValue={timeTo} />
            <DateTimeFilter title={"To"} dateValue={valueTo} setDateValue={setValueTo} timeValue={timeTo} setTimeValue={setTimeTo} filters={filters} setFilters={setFilters} minDateValue={valueFrom} minTimeValue={timeFrom} maxDateValue={null} maxTimeValue={null} />

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              paddingBottom="10px"
              width='360px'
            >

              <Switch
                size="medium"
                color="primary"
                onChange={(event) => {
                  setLiked(event.target.checked);
                  setFilters({
                    ...filters,
                    liked: event.target.checked,
                  });
                }}
                checked={liked}
              />
              <Typography sx={{ fontWeight: 'bold' }}>Liked posts</Typography>

            </Stack>

          </Stack>

          <Row>
            <Button
              sx={{ width: 165, marginRight: 1, marginTop: 3, marginBottom: 2 }}
              startIcon={<TaskAltIcon />}
              color='black'
              variant='outlined'
              onClick={() => { updateFilteredArticles(); setValue(0); navigate('/'); }}
            >
              Apply
            </Button>

            <Button
              sx={{ width: 165, marginTop: 3, marginBottom: 2 }}
              startIcon={<DeleteIcon />}
              color='black'
              variant='outlined'
              disabled={areFiltersClear()}
              onClick={() => {
                if (areFiltersClear() === false) {
                  setAlertOpen(true)
                }
              }}
            >
              Clear
            </Button>
          </Row>

        </div>
      </ThemeProvider>
    </>
  );
}
