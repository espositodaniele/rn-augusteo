import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EllipsisHorizontal } from "../assets/icons/EllipsisHorizontal";
import { ChevronLeft } from "../assets/icons/ChevronLeft";
import { StatusBar } from "expo-status-bar";
import axiosConfig from '../helpers/axiosConfig';


const formatter = Intl.NumberFormat('it-IT');
const posterSize = Dimensions.get('screen').height / 3;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const headerTop = 44 - 16;

export default function DetailScreen({route, navigation}) {
    const [spettacolo, setSpettacolo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSpettacolo();
    }, []);

    function getSpettacolo() {
        axiosConfig.defaults.headers.common[
            'Authorization'
        ] = `Bearer 2|Itz50uinmIn9Hc8pKHUh9xJpLrudUDnvZ8Ykngb2`;

        axiosConfig.get(`/spettacolo/${route.params.spettacoloId}`)
            .then(response => {
                setSpettacolo(response.data.data);
                console.log(response.data)
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }

    const sv = useSharedValue(0);
    const inset = useSafeAreaInsets();
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
        'worklet';
        sv.value = event.contentOffset.y;
        },
    });

    const initialTranslateValue = posterSize;

    const animatedScrollStyle = useAnimatedStyle(() => {
        return {
          paddingTop: initialTranslateValue,
        };
    });
    
    const layoutY = useSharedValue(0);

    const stickyElement = useAnimatedStyle(() => {
        return {
            backgroundColor: '',
            transform: [
                {
                    translateY: interpolate(
                        sv.value,
                        [
                            layoutY.value - (headerTop + inset.top) - 1,
                            layoutY.value - (headerTop + inset.top),
                            layoutY.value - (headerTop + inset.top) + 1,
                        ],
                        [0, 0, 1],
                    ),
                },
            ],
        };
    });


    const Playlist = () => {
        return (
            <View className="px-5">
                {playlist.map((song, index) => {
                    return (
                        <View className="flex flex-row items-center justify-between py-2 mr-5" key={JSON.stringify(song.name + index)}>
                            <View className="flex flex-row items-center">
                                
                                <View class="ml-10">
                                    <Text className="text-base font-medium text-white">
                                        {song.name}
                                    </Text>
                                    <Text className="text-sm text-white opacity-60">
                                        {formatter.format(song.plays)}
                                    </Text>
                                </View>
                            </View>
                            <EllipsisHorizontal />
                        </View>
                    );
                })}
            </View>
        );
    };

    const PosterImage = ({sv}) => {
        const inset = useSafeAreaInsets();
        const layoutY = useSharedValue(0);
        const opacityAnim = useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    sv.value,
                    [0, posterSize - (headerTop + inset.top) / 0.9],
                    [1, 0],
                    Extrapolation.CLAMP,
                ),
          };
        });
        const textAnim = useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                    sv.value,
                    [-posterSize / 8, 0, posterSize - (headerTop + inset.top) / 0.8],
                    [0, 1, 0],
                    Extrapolation.CLAMP,
                ),
                transform: [
                    {
                        scale: interpolate(
                            sv.value,
                            [-posterSize / 8, 0, (posterSize - (headerTop + inset.top)) / 2],
                            [1.1, 1, 0.95],
                            'clamp',
                        ),
                    },
                    {
                        translateY: interpolate(
                            sv.value,
                            [layoutY.value - 1, layoutY.value, layoutY.value + 1],
                            [0, 0, -1],
                            ),
                    },
                ],
            };
        });
        const scaleAnim = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        scale: interpolate(sv.value, [-50, 0], [1.3, 1], {
                        extrapolateLeft: 'extend',
                        extrapolateRight: 'clamp',
                        }),
                    },
                ],
             };
        });
        return (
            <Animated.View style={[styles.imageContainer, opacityAnim]}>
                <Animated.Image
                    style={[styles.imageStyle, scaleAnim]}
                    source={{uri: `${spettacolo.cover}`}}
                />
                <Animated.View
                    onLayout={(event) => {
                        'worklet';
                        layoutY.value = event.nativeEvent.layout.y;
                    }}
                    className="absolute bottom-0 top-0 left-0 right-0 justify-end items-start z-10 px-5"
                    style={[textAnim]}>
                        <Image
                            style={styles.qrcode}
                            source={require('../assets/qr-code.jpeg')}
                        />
                        <View className="px-8 bg-red-600 py-2 mt-4 rounded-xl">
                            <Text className="text-white font-bold text-lg uppercase">Scan per acquistare</Text>
                        </View>
                        <Animated.Text numberOfLines={2} className="text-6xl font-bold text-white text-center mt-4">
                            Natale in casa cupiello
                        </Animated.Text>
                    </Animated.View>
                <AnimatedLinearGradient className="absolute inset-0"
                    style={[scaleAnim]}
                    colors={[
                        `rgba(27,35,50,${0})`,
                        `rgba(27,35,50,${0.1})`,
                        `rgba(27,35,50,${0.3})`,
                        `rgba(27,35,50,${0.5})`,
                        `rgba(27,35,50,${0.8})`,
                        `rgba(27,35,50,${1})`,
                    ]}
                />
            </Animated.View>
        );
    };

    const ScreenHeader = ({sv}) => {
        const inset = useSafeAreaInsets();
        const opacityAnim = useAnimatedStyle(() => {
            return {
                opacity: interpolate(
                sv.value,
                [
                    ((posterSize - (headerTop + inset.top)) / 4) * 3,
                    posterSize - (headerTop + inset.top) + 1,
                ],
                [0, 1],
                ),
                transform: [
                {
                    scale: interpolate(
                    sv.value,
                    [
                        ((posterSize - (headerTop + inset.top)) / 4) * 3,
                        posterSize - (headerTop + inset.top) + 1,
                    ],
                    [0.98, 1],
                    Extrapolation.CLAMP,
                    ),
                },
                {
                    translateY: interpolate(
                    sv.value,
                    [
                        ((posterSize - (headerTop + inset.top)) / 4) * 3,
                        posterSize - (headerTop + inset.top) + 1,
                    ],
                    [-10, 0],
                    Extrapolation.CLAMP,
                    ),
                },
                ],
                paddingTop: inset.top === 0 ? 8 : inset.top,
            };
        });
        return (
            <Animated.View className="absolute w-full px-4 pt-10 flex flex-row items-center h-28 justify-between z-10 bg-primary-50" style={[opacityAnim]}>
                <ChevronLeft />
                <Text className="text-white font-bold"> CIAO</Text>
            </Animated.View>
        );
      };

    return (
        
        <Animated.View className="flex-1 bg-primary-50">
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 8 }} className="flex justify-center items-center flex-1" size="large" color="gray" />
            ) : (
                <>
                    <ScreenHeader sv={sv} />
                    <PosterImage sv={sv} />
                    <Animated.View className="flex-1">
                        <Animated.ScrollView className="flex-1" onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                            <Animated.View style={[animatedScrollStyle]} className="pb-10 mt-5">
                                 
                                <Playlist />
                            </Animated.View>
                        </Animated.ScrollView>
                    </Animated.View>    
                    <StatusBar style="light" />
                </>
            )}
        </Animated.View>
           
   );
}


const playlist = [
    {
      name: 'Oasis',
      plays: 39672083,
      cover: 'https://chillhop.com/wp-content/uploads/2020/11/f78c39b4bb6313ddd0354bef896c591bfb490ff8-1024x1024.jpg',
      artist: 'Makzo',
    },
    {
      name: 'Beaver Creek',
      plays: 17185846,
      cover: 'https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg',
      artist: 'Aso, Middle School, Aviino',
    },
    {
      name: 'Daylight',
      plays: 89740943,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg',
      artist: 'Aiguille',
    },
    {
      name: 'Keep Going',
      plays: 97153065,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg',
      artist: 'Swørn',
    },
    {
      name: 'Going Back',
      plays: 70181177,
      cover: 'https://chillhop.com/wp-content/uploads/2020/10/737bb830d34592344eb4a2a1d2c006cdbfc811d9-1024x1024.jpg',
      artist: 'Swørn',
    },
    {
      name: 'Bliss',
      plays: 59009520,
      cover: 'https://chillhop.com/wp-content/uploads/2020/09/5bff1a6f1bd0e2168d29b4c841b811598135e457-1024x1024.jpg',
      artist: 'Misha, Jussi Halme',
    },
    {
      name: 'Growing Apart',
      plays: 89181139,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg',
      artist: 'Swørn',
    },
    {
      name: 'Sails',
      plays: 89606858,
      cover: 'https://chillhop.com/wp-content/uploads/2020/06/49f6e32ca521fbad46a1b281e3893cf6254bf11d-1024x1024.jpg',
      artist: 'Strehlow, Aylior',
    },
    {
      name: "Cruisin'",
      plays: 4523646,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/8404541e3b694d16fd79433b142ed910f36764dd-1024x1024.jpg',
      artist: 'Cloudchord, G Mills',
    },
    {
      name: 'Maple Leaf Pt.2',
      plays: 23571103,
      cover: 'https://chillhop.com/wp-content/uploads/2020/09/2899f7cc22ab12e17d0119819aac3ca9dbab46e6-1024x1024.jpg',
      artist: 'Philanthrope',
    },
    {
      name: 'Nightfall',
      plays: 26951507,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg',
      artist: 'Aiguille',
    },
    {
      name: 'Reflection',
      plays: 89000818,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg',
      artist: 'Swørn',
    },
    {
      name: 'Leaving For Good',
      plays: 14346252,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/7a84488fd87082302cb69c05262f2f3f87e93018-1024x1024.jpg',
      artist: 'Hanz',
    },
    {
      name: 'Eastway',
      plays: 36507029,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/c572841e8431cebc120dffed4f92119f723dd954-1024x1024.jpg',
      artist: 'Dontcry, Nokiaa',
    },
    {
      name: 'Wake up',
      plays: 4804932,
      cover: 'https://chillhop.com/wp-content/uploads/2020/07/2c3bd458bfb0713c89f991d1ce469523e95e3b53-1024x1024.jpg',
      artist: 'Evil Needle',
    },
    {
      name: 'Under the City Stars',
      plays: 9269308,
      cover: 'https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg',
      artist: 'Aso, Middle School, Aviino',
    },
    {
      name: 'Velocities',
      plays: 16726713,
      cover: 'https://i.scdn.co/image/ab67616d0000b2734fb6a52430e65dbc6c593faf',
      artist: 'Sleepy Fish',
    },
    {
      name: 'Deeper',
      plays: 61664067,
      cover: 'https://chillhop.com/wp-content/uploads/2020/10/23fdd99adc3e16abcb67b004ea3e748ebf433a49-1024x1024.jpg',
      artist: 'Aviino',
    },
];

const styles = StyleSheet.create({
    imageContainer: {
        height: Dimensions.get('screen').height / 3,
        width: Dimensions.get('screen').width,
        position: 'absolute',
    },
    imageStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    qrcode: {
        width: 150,
        height: 150,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'white',
    },
});