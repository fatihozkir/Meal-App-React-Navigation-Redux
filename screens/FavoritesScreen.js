import React  from 'react';
import MealList from '../components/MealList';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';
import { View, StyleSheet } from 'react-native';


const FavoritesScreen = props=>{
    const favoriteMeals = useSelector(state=> state.meals.favoriteMeals);
   if (favoriteMeals.length>0) {
    return (
        <MealList listData={favoriteMeals} navigation={props.navigation}/>
    );
   }else{
       return (<View style={styles.content}>
        <DefaultText style={styles.text}>No Favorite Meals Found!</DefaultText>
    </View>);
       
   }
    
};
const styles= StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontWeight:'bold',
        textDecorationLine:'underline'
    }
});
FavoritesScreen.navigationOptions=(navigationData)=>{
    return {
        headerTitle:'Your Favorites',
        headerLeft:(
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={
                    ()=>{
                        navigationData.navigation.toggleDrawer();
                    }
                }/>
            </HeaderButtons>
        )
    };
};
export default FavoritesScreen;

