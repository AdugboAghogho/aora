import { useCallback, useState, useRef } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { icons } from "../constants";
import React from "react";

const zoomIn = {
  0: {
    scale: 0.8,
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
    scale: 0.8,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={{ marginRight: 20 }} // Tailwind's mr-5
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          //  className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          // style={{
          //   width: 208, // Tailwind's w-52
          //   height: 288, // Tailwind's h-72
          //   borderRadius: 33,
          //   marginTop: 12, // Tailwind's mt-3
          //   backgroundColor: "rgba(255, 255, 255, 0.86)", // Tailwind's bg-white/10
          // }}
          resizeMode="contain"
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
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }} 
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            style={{
              width: 208, // Tailwind's w-52
              height: 288, // Tailwind's h-72
              borderRadius: 33, // Tailwind's rounded-[33px]
              marginVertical: 20, // Tailwind's my-5
              overflow: "hidden",
              shadowColor: "#000000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4, // Tailwind's shadow-lg shadow-black/40
              shadowRadius: 4,
            }}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={{
              width: 48, // Tailwind's w-12
              height: 48, // Tailwind's h-12
              position: "absolute", // Tailwind's absolute
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      
    </Animatable.View>
  );
};

// const Trending = ({ posts }) => {
//   const [activeItem, setActiveItem] = useState(posts[0]);

//   const viewableItemsChanged = useCallback(({ viewableItems }) => {
//     if (viewableItems.length > 0) {
//       setActiveItem(viewableItems[0].key);
//     }
//   }, []);

//   return (
//     <FlatList
//       data={posts}
//       horizontal
//       keyExtractor={(item) => item.$id}
//       renderItem={({ item }) => (
//         <TrendingItem activeItem={activeItem} item={item} />
//       )}
//       onViewableItemsChanged={viewableItemsChanged}
//       viewabilityConfig={{
//         itemVisiblePercentThreshold: 70,
//       }}
//       contentOffset={{ x: 170 }}
//     />
//   );
// };

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);

  // Use useRef to keep the function reference stable
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]?.key);
    }
  }, []);

  const viewabilityConfigCallback = useRef(onViewableItemsChanged);

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewabilityConfigCallback.current} // Use the stable reference
      viewabilityConfig={viewabilityConfig.current} // Use the stable reference
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
