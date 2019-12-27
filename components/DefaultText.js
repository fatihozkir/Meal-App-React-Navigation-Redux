import React from 'react';
import { Text,StyleSheet } from 'react-native';
import TextColors from '../constants/TextColors';

const DefaultText = props=>{
    return <Text style={[styles.text,props.style]}>{props.children}</Text>
};

const styles= StyleSheet.create({
    text:{
        fontFamily:'open-sans',
        color:TextColors.accentColor
    }
});

export default DefaultText;