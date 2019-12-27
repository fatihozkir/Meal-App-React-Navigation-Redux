import React from 'react';
import {useSelector} from 'react-redux';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = props=>{
   

    const categoryId = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state=> state.meals.filteredMeals);
    const displayedMeals = availableMeals.filter(meal=>meal.categoryIds.indexOf(categoryId)>=0);
    if(displayedMeals.length===0){
      return <View style={styles.content}>
        <DefaultText  style={styles.title}>No Meal Found! </DefaultText>
        <DefaultText  style={styles.title}>Please Check Your Filters! </DefaultText>
      </View>
    }
    return (
       <MealList listData={displayedMeals} navigation={props.navigation} />
    );
};
const styles = StyleSheet.create({
  content:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center'
  },
  title:{
    fontWeight:'bold',
    textDecorationLine:'underline'
  }
})
CategoryMealsScreen.navigationOptions=(navigationData)=>{
  const categoryId= navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(x=>x.id===categoryId);
  return {
    headerTitle:selectedCategory.title
  };
   
};



export default CategoryMealsScreen;

