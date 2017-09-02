import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PeopleList from './PeopleList';
import CompanyList from './CompanyList';
import AddPerson from './AddPerson';

const Navigation = TabNavigator({
    PeopleList: {screen: PeopleList },
    AddPerson: { screen: AddPerson },
    CompanyList: { screen: CompanyList },
},{
    tabBarOptions: {
        tabBarVisible: true,
        showIcon: true,
        activeTintColor: '#ffffff',
        inactiveTintColor: '#80cbc4',
        swipeEnabled: true,
        showLabel: false,
        iconStyle: {
            width: 52,
            height: 50
        },
        style: {
            backgroundColor: '#26a69a',
        },
    },
    tabBarPosition: 'bottom',
});



export default Navigation;