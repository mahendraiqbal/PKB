import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import QueueScreen from './screens/QueueScreen';
import HistoryScreen from './screens/HistoryScreen';
import InfoScreen from './screens/InfoScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OTPScreen from './screens/OTPScreen';
import RegistrationQueueScreen from './screens/QueueScreen/RegistrationQueue';
import PrintQueue from './screens/QueueScreen/PrintQueue';
import TestingQueue from './screens/QueueScreen/TestingQueue';
import NewsDetailScreen from './screens/InfoScreen/DetailNewsScreen';
import NewsPortalScreen from './screens/InfoScreen/NewsPortalScreen';
import InfoQuotaScreen from './screens/InfoScreen/InfoQuotaScreen';
import RuleInfoScreen from './screens/InfoScreen/RuleInfoScreen';
import RelatedInfoScreen from './screens/InfoScreen/InfoRelatedScreen';
import UjiPertamaScreen from './screens/HomeScreen/UjiPertamaScreen';
import FormUjiPertamaScreen from './screens/HomeScreen/FormUjiPertamaScreen';
import DetailScreenHome from './screens/HomeScreen/DetailScreenHome';
import UjiBerkalaScreen from './screens/HomeScreen/UjiBerkalaScreen';
import FormUjiBerkala from './screens/HomeScreen/FormUjiBerkalaScreen';
import FormPermohonanNuMasuk from './screens/HomeScreen/FormPermohonanNuMasuk';
import FormPermohonanNuKeluar from './screens/HomeScreen/FormPermohonanNuKeluar';
import PermohonanNuMasuk from './screens/HomeScreen/PermohonanNuMasuk';
import PermohonanNuKeluar from './screens/HomeScreen/PermohonanNuKeluar';
import PermohonanMutasiMasuk from './screens/HomeScreen/PermohonanMutasiMasuk';
import PermohonanMutasiKeluar from './screens/HomeScreen/PermohonanMutasiKeluar';
import FormPermohonanMutasiMasuk from './screens/HomeScreen/FormPermohonanMutasiMasuk';
import FormPermohonanMutasiKeluar from './screens/HomeScreen/FormPermohonanMutasiKeluar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#191D88',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
            },
        }}>
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/home.png')}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused && '#ffffff',
                            }}
                        />
                    </View>
                ),
                tabBarLabel: "Home",
                tabBarActiveBackgroundColor: '#191D88',
            }}
            name="Home"
            component={HomeScreen}
        />
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/queue.png')}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused && '#ffffff',
                            }}
                        />
                    </View>
                ),
                tabBarLabel: "Antrian",
                tabBarActiveBackgroundColor: '#191D88',
            }}
            name="Antrian"
            component={QueueScreen}
        />
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/file.png')}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused && '#ffffff',
                            }}
                        />
                    </View>
                ),
                tabBarLabel: "Riwayat",
                tabBarActiveBackgroundColor: '#191D88',
            }}
            name="Riwayat"
            component={HistoryScreen}
        />
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/info.png')}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused && '#ffffff',
                            }}
                        />
                    </View>
                ),
                tabBarLabel: "Informasi",
                tabBarActiveBackgroundColor: '#191D88',
            }}
            name="Info"
            component={InfoScreen}
        />
        <Tab.Screen
            options={{
                tabBarIcon: ({ focused }) => (
                    <View>
                        <Image
                            source={require('../assets/profile-user.png')}
                            resizeMode="cover"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused && '#ffffff',
                            }}
                        />
                    </View>
                ),
                tabBarLabel: "Profile",
                tabBarActiveBackgroundColor: '#191D88',
            }}
            name="Profile"
            component={ProfileScreen}
        />
    </Tab.Navigator>
);

const Router = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="OTPScreen" component={OTPScreen} />
                <Stack.Screen name="BotTab" component={BottomTab} />
                <Stack.Screen name="RegistrationQueue" component={RegistrationQueueScreen} />
                <Stack.Screen name="PrintQueue" component={PrintQueue} />
                <Stack.Screen name="TestingQueue" component={TestingQueue} />
                <Stack.Screen name="RelatedInfo" component={RelatedInfoScreen} />
                <Stack.Screen name="RuleInfo" component={RuleInfoScreen} />
                <Stack.Screen name="InfoQuota" component={InfoQuotaScreen} />
                <Stack.Screen name="NewsPortal" component={NewsPortalScreen} />
                <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
                <Stack.Screen name="UjiPertama" component={UjiPertamaScreen} />
                <Stack.Screen name="UjiBerkala" component={UjiBerkalaScreen} />
                <Stack.Screen name="PermohonanNuMasuk" component={PermohonanNuMasuk} />
                <Stack.Screen name="PermohonanNuKeluar" component={PermohonanNuKeluar} />
                <Stack.Screen name="PermohonanMutasiMasuk" component={PermohonanMutasiMasuk} />
                <Stack.Screen name="PermohonanMutasiKeluar" component={PermohonanMutasiKeluar} />
                <Stack.Screen name="FormUjiPertama" component={FormUjiPertamaScreen} />
                <Stack.Screen name="FormUjiBerkala" component={FormUjiBerkala} />
                <Stack.Screen name="NumpangUjiMasuk" component={FormPermohonanNuMasuk} />
                <Stack.Screen name="SuratRekomNuKeluar" component={FormPermohonanNuKeluar} />
                <Stack.Screen name="MutasiMasuk" component={FormPermohonanMutasiMasuk} />
                <Stack.Screen name="SuratRekomMutasiKeluar" component={FormPermohonanMutasiKeluar} />
                <Stack.Screen name="DetailScreenHome" component={DetailScreenHome} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Router;