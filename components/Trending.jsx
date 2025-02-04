import { useState, useCallback } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "../constants";
import React from "react";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={{ marginRight: 20 }} // Tailwind's mr-5
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      useNativeDriver={false} // Disable useNativeDriver for React Native Web
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 208, // Tailwind's w-52 (52 * 4 = 208)
            height: 288, // Tailwind's h-72 (72 * 4 = 288)
            borderRadius: 33, // Tailwind's rounded-[33px]
            marginTop: 12, // Tailwind's mt-3 (3 * 4 = 12)
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Tailwind's bg-white/10
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }} // Tailwind's relative flex justify-center items-center
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            style={{
              width: 208, // Tailwind's w-52 (52 * 4 = 208)
              height: 288, // Tailwind's h-72 (72 * 4 = 288)
              borderRadius: 33, // Tailwind's rounded-[33px]
              marginVertical: 20, // Tailwind's my-5 (5 * 4 = 20)
              overflow: "hidden",
              shadowColor: "#000", // Tailwind's shadow-black/40
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 4,
              elevation: 5, // For Android shadow
            }}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={{
              width: 48, // Tailwind's w-12 (12 * 4 = 48)
              height: 48, // Tailwind's h-12 (12 * 4 = 48)
              position: "absolute", // Tailwind's absolute
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);

  // Memoize the callback to avoid redefining it on every render
  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      // Access the `item` property from the first viewable item
      setActiveItem(viewableItems[0].item.$id);
    }
  }, []);

  // Define a stable viewabilityConfig object
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 70,
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={handleViewableItemsChanged} // Use the memoized callback
      viewabilityConfig={viewabilityConfig} // Use the stable viewabilityConfig
      contentOffset={{ x: 170 }}
      windowSize={5} // Increase the window size to render more items off-screen
    />
  );
};

export default Trending;