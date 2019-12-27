import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import COLORS from '../constants/Colors';
import DefaultText from './DefaultText';
const MealItem = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={[styles.mealRowm, styles.mealHeader]}>
                        <ImageBackground source={{ uri: props.image }} style={styles.bgImage}>
                            <View style={styles.titleContainer}>
                                <Text numberOfLines={1} style={styles.title}>
                                    {props.title.toUpperCase()}
                                </Text>
                            </View>

                        </ImageBackground>
                    </View>
                    <View style={[styles.mealRow, styles.mealDetail]}>
                       <DefaultText>{props.duration} m</DefaultText>
                       <DefaultText>{props.complexity.toUpperCase()} </DefaultText>
                       <DefaultText>{props.affordability.toUpperCase()} </DefaultText>
                        
                    </View>
                </View>
            </TouchableOpacity>
        </View>


    );

};

const styles = StyleSheet.create({
    mealItem: {
        height: 200,
        backgroundColor: '#f5f5f5',
        overflow:'hidden',
        alignContent:'center',
        borderRadius:10,
        overflow:'hidden',
        margin:10
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '85%'
    },
    mealDetail: {
        height: '15%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems:'center'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: COLORS.primaryColor,
        paddingHorizontal: 12,
        paddingVertical: 5,
        opacity: 0.8
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        color: 'white',
        textAlign: "center"

    }
});
export default MealItem;

