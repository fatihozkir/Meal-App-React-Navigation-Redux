import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import React from 'react';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import TextColors from '../constants/TextColors';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? Colors.transparentColor : Colors.primaryColor
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans'
    },
    headerTintColor: Platform.OS === 'ios' ? TextColors.accentColor : TextColors.primaryColor
};
const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,

    },
    CategoryMeals: {
        screen: CategoryMealsScreen

    },
    MealDetail: {
        screen: MealDetailScreen,
    }
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    });

const FavNavigator = createStackNavigator({
    Favorites: { screen: FavoritesScreen },
    MealDetail: {
        screen: MealDetailScreen,
    }
},
    {
        defaultNavigationOptions: defaultStackNavOptions
    });

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name='ios-restaurant'
                    size={25}
                    color={tabInfo.tintColor} />
            }
        },
        tabBarColor: Colors.primaryColor,
        tabBarLabel:Platform.OS==='android'?<Text style={{fontFamily:'open-sans'}}>Meals</Text>:'Meals'
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons
                    name='ios-star'
                    size={25}
                    color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    }
};



const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: TextColors.primaryColor,
    shifting: true,
    barStyle: {
        backgroundColor: Colors.primaryColor
    }
}) : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        labelStyle:{
            fontFamily:'open-sans-bold'
        },
        activeTintColor: Colors.accentColor,
    }
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen

}, 
{
    navigationOptions:{
        drawerLabel:'Filters'
    },
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen:MealsFavTabNavigator, navigationOptions:{
        drawerLabel:'Meals'
    }},
    Filters: FiltersNavigator
},{
    contentOptions:{
        activeTintColor:Colors.accentColor,
        labelStyle:{
            fontFamily:'open-sans-bold'
        }
    }
});
export default createAppContainer(MainNavigator);