import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/mealsActions';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(x=>x.id===action.mealId);
            if (existingIndex>=0) {
                const updatedFavoriteMeals = [...state.favoriteMeals];
                updatedFavoriteMeals.splice(existingIndex,1);
                return {...state,favoriteMeals:updatedFavoriteMeals};
            } else {
                const newFavoriteMeal = state.meals.find(x=>x.id===action.mealId);
                const newFavorites=state.favoriteMeals.concat(newFavoriteMeal);
                return {...state, favoriteMeals:newFavorites};
            }
            break;
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal=>{
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.isVegan && !meal.isVegan) {
                    return false;
                }
                if (appliedFilters.isVegeterian && !meal.isVegetarian) {
                    return false;
                }
                return true;
            });
            return {...state,filteredMeals: updatedFilteredMeals};
            break;
        default:
            return state;
    }
    
};

export default mealsReducer;