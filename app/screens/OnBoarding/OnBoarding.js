import React, { useEffect } from 'react';
import {SafeAreaView, View, StyleSheet, Text, Animated, Image} from 'react-native';
import {images, theme} from '../../constants';

const {Fonts, Sizes, Colors} = theme;

const {onboarding1, onboarding2, onboarding3} = images;

const onboardings = [
    {
        title: "Let's travelling",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        img: onboarding1,
    },
    {
        title: "Navigation",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        img: onboarding2,
    },
    {
        title: "Destination",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        img: onboarding3,
    }
];

const scrollX = new Animated.Value(0);
// render 

const renderContent = () => (
    <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        // decelerationRate={0}
        // scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: scrollX}}},
        ], {useNativeDriver: false})}
    >
        {onboardings.map((item, index) => (
            <View
                key={index}
                style={{width: Sizes.width}}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center' 
                }}>
                    <Image
                        source={item.img}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </View>
                <View style={styles.text}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.des}>{item.description}</Text>
                </View>
            </View>
        ))}
    </Animated.ScrollView>
)

const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, Sizes.width);

    return (
        <View style={styles.containerDots}>
            {onboardings.map((item, index) => {
                const opacity = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                });

                const dotSize = dotPosition.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [Sizes.base, 17, Sizes.base],
                    extrapolate: 'clamp'
                })
                return (
                    <Animated.View
                        key={index}
                        style={[styles.dot, {width: dotSize, height: dotSize}]}
                        opacity={opacity}

                    >

                    </Animated.View>
                )
            })}
        </View>    
    )
}

function OnBoarding(props) {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            <View style={styles.dotRootContainer}>
                {renderDots()}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,

    },
    text: {
        position: 'absolute',
        bottom: '10%',
        left: 40,
        right: 40,
    },
    title: {
        fontSize: Sizes.h1,
        color: Colors.gray,
        textAlign: 'center',
        ...Fonts.h1
    },
    des: {
        ...Fonts.body3,
        textAlign: 'center',
        marginTop: Sizes.base,
        color: Colors.gray,
    },
    dotRootContainer: {
        position: 'absolute',
        bottom: Sizes.height > 700 ? '30%' : '20%',
    },
    containerDots: {
        flexDirection: 'row',
        height: Sizes.padding,
    },
    dot: {
        borderRadius: Sizes.radius,
        backgroundColor: Colors.blue,
        marginHorizontal: Sizes.radius /2,
        width: 20,
        height: 20,
    }
})

export default OnBoarding;