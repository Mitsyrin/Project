import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons, AntDesign, MaterialIcons, Fontisto } from '@expo/vector-icons';
import React from 'react';
import { COLORS } from '../constants';
import {  Home, Profile, DataEntryTab, Calculator, Note } from '../assets';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: COLORS.white,
  },
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="book"
                size={24}
                color={
                  focused
                    ? COLORS.primary
                    : COLORS.secondaryBlack
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="DataEntryTab"
        component={DataEntryTab}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="calendar"
                size={24}
                color={
                  focused
                    ? COLORS.primary
                    : COLORS.secondaryBlack
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={Calculator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="calculator"
                size={24}
                color={
                  focused
                    ? COLORS.primary
                    : COLORS.secondaryBlack
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Note"
        component={Note}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="note"
                size={24}
                color={
                  focused
                    ? COLORS.primary
                    : COLORS.secondaryBlack
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="user"
                size={24}
                color={
                  focused
                    ? COLORS.primary
                    : COLORS.secondaryBlack
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;