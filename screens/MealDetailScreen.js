import React, { useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import ListItem from '../components/ListItem';
import { toggleFavorite } from '../store/actions/mealsActions';


const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const meals = useSelector(state => state.meals.meals);
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
  const currentMealIsInTheFavorites = favoriteMeals.some(x => x.id === mealId);
  const selectedMeal = meals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({
      toggleFav: toggleFavoriteHandler
    });
  }, [toggleFavoriteHandler]);

  useEffect(()=>{
    props.navigation.setParams({isFavorite:currentMealIsInTheFavorites});
  },[currentMealIsInTheFavorites]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details} >
        <DefaultText>{selectedMeal.duration} m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()} </DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()} </DefaultText>

      </View>
      <Text style={styles.title}>Ingredients</Text>
      {
        selectedMeal.ingredients.map(ing => <ListItem key={ing}>{ing}</ListItem>)
      }
      <Text style={styles.title}>Steps</Text>
      {
        selectedMeal.steps.map(stp => <ListItem key={stp}>{stp}</ListItem>)
      }
      <View style={styles.screen}>
        <Text>{selectedMeal.title}</Text>
        <Button
          title="Go Back to Categories"
          onPress={() => {
            props.navigation.popToTop()
          }}
        />
      </View>
    </ScrollView>

  );
};

MealDetailScreen.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam('mealId');
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFavorite');
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite?'ios-star':'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  }
});

export default MealDetailScreen;
