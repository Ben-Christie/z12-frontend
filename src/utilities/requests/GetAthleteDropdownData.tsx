import axios from 'axios';
import { Option } from '../../components/formFields/FormMultiSelectDropdown';

export const getRowingClubNames = async () => {
  try {
    const clubNamesArray = await axios.get('https://z12-backend-production.up.railway.app/get-data/club-names/')
    
    const clubNames: Option[] = [];

    for(let i = 0; i < clubNamesArray.data.length; i++) {
      const name = clubNamesArray.data[i]
      const option: Option = {value: `${name.toLowerCase()}`, label: `${name}`};
      clubNames.push(option);
    }

    return clubNames;
  } catch (error) {
    console.error(error);
  }
}

export const getRaceCategories = async () => {
  try {
    const raceCategoriesArray = await axios.get('https://z12-backend-production.up.railway.app/get-data/race-categories/')

    const raceCategories: Option[] = [];

    for(let i = 0; i < raceCategoriesArray.data.length; i++) {
      const category = raceCategoriesArray.data[i]
      const option: Option = {value: `${category.toLowerCase()}`, label: `${category}`};
      raceCategories.push(option);
    }

    return raceCategories; 
  } catch (error) {
    console.error(error);
  }
}

export const getRowingCoaches = async () => {
  try {
    const coachNamesArray = await axios.get('https://z12-backend-production.up.railway.app/get-data/coach-names/')
    const coachNames: Option[] = [];

    for(let i = 0; i < coachNamesArray.data.length; i++) {
      const name = coachNamesArray.data[i]
      const option: Option = {value: `${name.toLowerCase()}`, label: `${name}`};
      coachNames.push(option);
    }

    return coachNames;
  } catch (error) {
    console.error(error);
  }
}