import './App.css';
import API from './API/API';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import SelectCategories from './pages/SelectCategories';
import Settings from './pages/Settings';
import Filters from './pages/Filters';
import BottomBar from './components/BottomBar';
import NavBar from './components/NavBar';
import Event from './pages/Event';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import About from './pages/About';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/SearchBar';
import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/* To uncomment if you want to use the shuffle() and generateKeyStream() functions

const CryptoJS = require("crypto-js");
const seedrandom = require("random-seed");
*/

function App() {
  return (
    <Router>
      <App2 />
    </Router>
  );
}

function App2() {
  const [value, setValue] = useState(0)
  //const [randomKey] = useState(Math.floor(Math.random() * 1000001));
  const [userCategories, setUserCategories] = useState([]);
  const [userSubCategories, setUserSubCategories] = useState([]);
  const [eventsReload, setEventsReload] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [dirtyLiked, setDirtyLiked] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dirtyInterests, setDirtyInterests] = useState(false);
  const [alertInterests, setAlertInterests] = useState({ state: false, to: null });
  const [infoAlert, setInfoAlert] = useState(false);
  const [success, setSuccess] = useState({ state: false, message: "" });
  const [error, setError] = useState({ state: false, message: "" });
  const [idToScroll, setIdToScroll] = useState({ id: null, behavior: null });
  const [fetchCount, setFetchCount] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  function titleFunction() {

    switch (location.pathname) {
      case '/settings':
        return <>Settings</>;
      case '/':
        return <>Home</>;
      case '/filters':
        return <>Filters</>;
      case '/settings/about':
        return <>About</>;
      case '/categories':
        return <>Select your interests</>
      default:
        return <></>;
    }
  }

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  }

  const handlePageChange = () => {
    setValue(alertInterests.to);

    switch (alertInterests.to) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/filters")
        break;
      case 2:
        navigate("/settings")
        break;
      default:
        break;
    }

    setAlertInterests({ state: false, to: null });
    setDirtyInterests(false);
  }

  const searchedEvents = filteredArticles.filter((el) => {
    return el.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const [filters, setFilters] = useState({
    categoryName: [],
    price: [0, 100],
    liked: false,
    valueFrom: null,
    timeFrom: null,
    valueTo: null,
    timeTo: null,
  });

  function filterArticles(newArticles = null) {

    let filteredArticles = []

    if(newArticles === null){
      filteredArticles = articles;
    } else {
      filteredArticles = newArticles
    }

    if (filters.categoryName.length > 0) {
      filteredArticles = filteredArticles.filter((article) => filters.categoryName.includes(article.category));
    }
    if (filters.price[0] > 0 || filters.price[1] < 100) {
      filteredArticles = filteredArticles.filter((article) => article.price >= filters.price[0] && article.price <= filters.price[1]);
    }
    if (filters.liked) {
      filteredArticles = filteredArticles.filter((article) => article.liked);
    }
    if (filters.valueFrom && filters.valueTo) {
      filteredArticles = filteredArticles.filter((article) => dayjs(article.date).isBetween(dayjs(filters.valueFrom), dayjs(filters.valueTo), null, '[]'));
    }
    if (filters.timeFrom && filters.timeTo) {
      filteredArticles = filteredArticles.filter((article) => {

        let actualTime = dayjs(article.time, 'HH:mm A');
        let timeFrom = dayjs(filters.timeFrom, 'HH:mm A');
        let timeTo = dayjs(filters.timeTo, 'HH:mm A');

        if (actualTime >= timeFrom && actualTime <= timeTo) {
          return true;
        }
        return false;
      });
    }

    setFilteredArticles(filteredArticles);
  };

  /* To uncomment if you want to have shuffled events without order criteria

  //This function shuffles the order of the events into the articles' array
  const shuffle = (array) => {

    const arrayLength = array.length;
    const key = randomKey % arrayLength;
    const keyStream = generateKeyStream(arrayLength);

    let changeIndex = 1;
    let firstCell = changeIndex % arrayLength;

    for (let i = 0; i < key * 2; i++) {
      for (let j = 0; j < key; j++) {

        let swapCell = (firstCell + changeIndex) % arrayLength;

        //Swapping cells
        const temporaryVar = array[firstCell];

        array[firstCell] = array[swapCell];
        array[swapCell] = temporaryVar;

        /* 
          Here I'm changing the number of positions for which the 
          current array's cell must be swapped
        
        changeIndex += keyStream[(changeIndex % arrayLength)];
        firstCell = (firstCell + 1) % arrayLength;
      }
    }

    return array;
  }

  //genereting a keystream array
  function generateKeyStream(size) {

    // Hash the key to get a seed
    const seed = CryptoJS.SHA256(randomKey.toString()).toString(CryptoJS.enc.Hex);

    // Use the seed to generate a random number generator
    const random = seedrandom(seed);

    // Generate a list of unique numbers
    const numbers = Array.from({ length: size }, (_, i) => i + 1);
    const result = [];

    while (numbers.length > 0) {
      const randomIndex = Math.floor(random.random() * numbers.length);
      result.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1);
    }

    return result;
  }
  */

  const storePreferences = async (newCategories, newSubcategories) => {
    let success = await API.storeSubcategories(newSubcategories);

    if (success) {
      setUserCategories([...newCategories]);
      setUserSubCategories([...newSubcategories]);

      let modifyAllLiked = await API.modifyAllLiked();

      if (modifyAllLiked) {
        setFilters({
          categoryName: [],
          price: [0, 100],
          liked: false,
          valueFrom: null,
          timeFrom: null,
          valueTo: null,
          timeTo: null,
        });
      }
      else {
        setError({ state: true, message: "Error while clearing all likes!" });
      }

      setSuccess({ state: true, message: "Interests correctly stored!" });
    } else {
      setError({ state: true, message: "Error while saving interests!" });
    }

    setEventsReload(true);
  };

  useEffect(() => {
    if (eventsReload === true && dirtyLiked === false) {
      setLoading(true);
      API.getEvents()
        .then((articles) => {

          const format = 'h:mm A';

          const sortedArticles = articles.sort((a, b) => {
            if (dayjs(a.date).isBefore(b.date) || (dayjs(a.date).isSame(b.date) && dayjs(a.time, format).isBefore(dayjs(b.time, format)))) {
              return -1;
            }
            else {
              return 1;
            }
          })

          setArticles(sortedArticles);
          filterArticles(sortedArticles);
          setLoading(false);
          setEventsReload(false);
        })
        .catch((err) => {
          setError({ state: true, message: "Error while retrieving events!" });
        });
    }
    else if (eventsReload === true && dirtyLiked === true) {
      API.getEvents()
        .then((articles) => {

          const format = 'h:mm A';

          const sortedArticles = articles.sort((a, b) => {
            if (dayjs(a.date).isBefore(b.date) || (dayjs(a.date).isSame(b.date) && dayjs(a.time, format).isBefore(dayjs(b.time, format)))) {
              return -1;
            }
            else {
              return 1;
            }
          })

          setArticles(sortedArticles);
          filterArticles(sortedArticles);
          setDirtyLiked(false);
          setEventsReload(false);
        })
        .catch((err) => {
          setError({ state: true, message: "Error while retrieving events!" });
        });
    }
    // eslint-disable-next-line
  }, [eventsReload]);

  useEffect(() => {
    API.getUserCategories()
      .then((categories) => {
        setUserCategories(categories);
        setFetchCount(old => old + 1)
      })
      .catch((err) => {
        setError({ state: true, message: "Error while retrieving user categories!" });
      });
  }, []);

  useEffect(() => {
    API.getUserSubCategories()
      .then((subcategories) => {
        setUserSubCategories(subcategories);
        setFetchCount(old => old + 1)
      })
      .catch((err) => {
        setError({ state: true, message: "Error while retrieving user subcategories!" });
      });
  }, [])

  useEffect(() => {
    API.getCategoriesAndSubcategories()
      .then((result) => { setCategories(result.categories); setSubCategories(result.subcategories); setFetchCount(old => old + 1) })
      .catch((err) => {
        setError({ state: true, message: "Error while retrieving categories and subcategories!" });
      });
  }, []);

  //Use effect to manage the success toast
  useEffect(() => {
    if (success.state === true) {
      toast.success(success.message, { position: "top-center" });
      setSuccess({ state: false, message: "" });
    }
    // eslint-disable-next-line
  }, [success.state]);

  //Use effect to manage the error toast
  useEffect(() => {
    if (error.state === true) {
      toast.error(error.message, { position: "top-center" });
      setError({ state: false, message: "" });
    }
    // eslint-disable-next-line
  }, [error.state]);

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/filters':
        setValue(1);
        break;
      case '/settings':
        setValue(2);
        break;
      case '/categories':
        setValue(2);
        break;
      default:
        setValue(0);
        break;
    }
  }, []);

  return (

    <>
      <ToastContainer theme='colored' pauseOnHover closeOnClick hideProgressBar={false} newestOnTop={false} />

      <Dialog
        open={alertInterests.state}
        onClose={() => setAlertInterests({ state: false, to: null })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          Are you sure you want to change page?
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            If you click 'Confirm' all the new interests set will be lose
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button sx={{ marginRight: 2 }} onClick={() => setAlertInterests({ state: false, to: null })}>Back</Button>
          <Button onClick={() => handlePageChange()} autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>

      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

        <NavBar />

        <h1 className='page-title'> {titleFunction()}{location.pathname === "/categories" ? <InfoIcon sx={{ marginLeft: 1, marginTop: 0.9, position: "absolute" }} onClick={() => setInfoAlert(true)} /> : null}</h1>

        {window.location.pathname === "/" && !loading ?
          <div className='SearchBarContainer'>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} />
          </div> : ""}

        <div className='App'>
          <Routes>
            <Route path="/" element={<Home articles={searchedEvents} setEventsReload={setEventsReload} setDirtyLiked={setDirtyLiked} loading={loading} idToScroll={idToScroll} setIdToScroll={setIdToScroll} setError={setError} />} />
            <Route path="settings" element={<Settings />}></Route>
            <Route path="settings/about" element={<About />} />
            <Route path="filters" element={<Filters choices={userCategories} filters={filters} setFilters={setFilters} setValue={setValue} updateFilteredArticles={filterArticles} />} />
            <Route path="event/:id" element={<Event articles={articles} setEventsReload={setEventsReload} setDirtyLiked={setDirtyLiked} setError={setError} setIdToScroll={setIdToScroll} />} />
            <Route path="categories" element={<SelectCategories
              categories={categories}
              userCategories={userCategories}
              subCategories={subCategories}
              userSubCategories={userSubCategories}
              setValue={setValue}
              storePreferences={storePreferences}
              dirtyInterests={dirtyInterests}
              setDirtyInterests={setDirtyInterests}
              setAlertInterests={setAlertInterests}
              infoAlert={infoAlert}
              setInfoAlert={setInfoAlert}
              setError={setError}
              fetchCount={fetchCount} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <BottomBar className='bottom-bar' setValue={setValue} value={value} dirtyInterests={dirtyInterests} setAlertInterests={setAlertInterests} setIdToScroll={setIdToScroll} firstEventId={searchedEvents[0]?.id} />
      </div>
    </>
  );

}

export default App;