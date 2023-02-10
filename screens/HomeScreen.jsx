import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import {
    SafeAreaView
  } from 'react-native-safe-area-context';

const logoImage = require('../assets/images/logo.png');
const screenWidth = Dimensions.get("window").width;
var cardWidth = screenWidth > 2000 ? 450 : (screenWidth / 3) - 40; 
var logoWidth = screenWidth > 2000 ? 800 : (screenWidth / 2) - 100; 

export default function HomeScreen({navigation}) {

    useEffect(() => {
        console.log(logoWidth);
      }, []);

    return (
            <View className="flex-1 bg-primary-50 px-5">
                <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{ height: "100%" }} >
                    <View className="pt-4">
                        <View className="flex flex-row items-center justify-between gap-12">
                            <View className="overflow-hidden" >
                                <Image source={logoImage} style={{width: logoWidth, height: logoWidth / 2}} resizeMode="contain" />
                            </View>
                            <View className="flex">
                                <Text className=" text-5xl uppercase text-left text-white" style={{ fontFamily: 'Archivo-Bold'}}>acquista</Text>
                                <Text className=" text-5xl uppercase text-left text-white" style={{ fontFamily: 'Archivo-Bold'}}>i nostri</Text>
                                <Text className=" text-5xl uppercase text-left text-white" style={{ fontFamily: 'Archivo-Bold'}}>spettacoli</Text>
                            </View>
                        </View>

                        
                        
                        <View className="pt-8">
                            <Text className="text-4xl text-white" style={{ fontFamily: 'Archivo-Bold'}}>Spettacoli in evidenza</Text>
                            <ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
                                {
                                    spettacoli.map((card, index) => (
                                        <TouchableOpacity key={index} onPress={() => {
                                                console.log('ciao');
                                            }}>
                                            <View className="pt-8 mr-5 overflow-hidden w-full" style={{width: cardWidth, height: cardWidth * 2, overflow: 'hidden'}}>
                                                <Image source={card.image} style={{width: cardWidth, height: cardWidth * 2, resizeMode: 'cover', overflow: 'hidden'}} resizeMode="cover"/>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                </ScrollView>
                        </View>

                        <View className="pt-8">
                            <Text className="text-4xl text-white" style={{ fontFamily: 'Archivo-Bold'}}>Prossimi appuntamenti</Text>
                            <ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
                                {
                                    spettacoli.map((card, index) => (
                                        <TouchableOpacity key={index} onPress={() => {
                                                console.log('ciao');
                                            }}>
                                            <View className="pt-8 mr-5 overflow-hidden w-full" style={{width: cardWidth, height: cardWidth * 2, overflow: 'hidden'}}>
                                                <Image source={card.image} style={{width: cardWidth, height: cardWidth * 2, resizeMode: 'cover', overflow: 'hidden'}} resizeMode="cover"/>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                </ScrollView>
                        </View>

                        <View className="pt-8">
                            <Text className="text-4xl text-white" style={{ fontFamily: 'Archivo-Bold'}}>Coming soon</Text>
                            <ScrollView horizontal={true} style={{ paddingBottom: 30 }} showsHorizontalScrollIndicator={false}>
                                {
                                    spettacoli.map((card, index) => (
                                        <TouchableOpacity key={index} onPress={() => {
                                                console.log('ciao');
                                            }}>
                                            <View className="pt-8 mr-5 overflow-hidden w-full" style={{width: cardWidth, height: cardWidth * 2, overflow: 'hidden'}}>
                                                <Image source={card.image} style={{width: cardWidth, height: cardWidth * 2, resizeMode: 'cover', overflow: 'hidden'}} resizeMode="cover"/>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                </ScrollView>
                        </View>
                        
                    </View>
                </ScrollView>
                </SafeAreaView>
            </View>
    );
}

const spettacoli = [
    {
        title: "IL MEDICO DEI PAZZI",
        image: require("../assets/test.jpg")
    },
    {
        title: "Styled Components",
        image: require("../assets/test.jpg")
    },
    {
        title: "Props and Icons",
        image: require("../assets/test.jpg")
    },
    {
        title: "Static Data and Loop",
        image: require("../assets/test.jpg")
    }
];