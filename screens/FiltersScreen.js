import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import FilterSwitch from '../components/FilterSwitch';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/mealsActions';


const FiltersScreen = props => {
    const {navigation} =props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);

    const dispatch=useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegeterian: isVegeterian
        };
   
    dispatch(setFilters(appliedFilters));
    },[isGlutenFree,isLactoseFree,isVegan,isVegeterian,dispatch]);


    useEffect(() => {
       navigation.setParams({ save: saveFilters });
    },[saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restriction </Text>
            <FilterSwitch title='Gluten Free' state={isGlutenFree} onValueChange={(newValue) => { setIsGlutenFree(newValue); }} />
            <FilterSwitch title='Lactose Free' state={isLactoseFree} onValueChange={(newValue) => { setIsLactoseFree(newValue); }} />
            <FilterSwitch title='Vegan Products' state={isVegan} onValueChange={(newValue) => { setIsVegan(newValue); }} />
            <FilterSwitch title='Vegeterian Products' state={isVegeterian} onValueChange={(newValue) => { setIsVegeterian(newValue); }} />

        </View>
    );
};

FiltersScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: 'Filters',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={
                    () => {
                        navigationData.navigation.toggleDrawer();
                    }
                } />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Save" iconName='ios-save' onPress={
                   navigationData.navigation.getParam('save')
                } />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

export default FiltersScreen;

