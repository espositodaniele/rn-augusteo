import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function HomeScreen({navigation}) {
    

    return (
        <View className="flex-1 bg-primary-50 px-5">
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{ height: "100%" }} >
                    <View className="flex justify-center items-center">
                        <Text className="text-white font-bold text-4xl">Detail Screen</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
   );
}