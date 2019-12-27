import React from 'react';
import { View,Text,Switch,StyleSheet, Platform} from 'react-native';
import Colors from '../constants/Colors';

const FilterSwitch = props=>{

    
    return(
        <View style={styles.filterContainer}>
        <Text style={[props.style,styles.title]}>{props.title}</Text>
        <Switch 
        thumbColor={Platform.OS==='android'? Colors.accentColor:''} 
        trackColor={{ true:Colors.primaryColor}} 
        value={props.state} 
        onValueChange={props.onValueChange}/>

        
    </View>
    );
};

const styles = StyleSheet.create({
    filterContainer:{
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
        width:'80%',
        margin:15
    },
    title:{
        color:Colors.accentColor,
        fontFamily:'open-sans-bold',
        fontSize:18
    }
});

export default FilterSwitch;