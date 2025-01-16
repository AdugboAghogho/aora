import React, { useState, useCallback } from 'react';
import { FlatList, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
  from: { scale: 0.9 },
  to: { scale: 1 },
};

const zoomOut = {
  from: { scale: 1 },
  to: { scale: 0.9 },
};

interface TrendingItemProps {
  active: boolean;
  item: any;
  onPress: () => void;
}

const TrendingItem: React.FC<TrendingItemProps> = ({ active, item, onPress }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={{ marginRight: 20 }} // Tailwind's mr-5
      animation={active ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          // useNativeDriver // Remove if not strictly required
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          onError={(error) => console.error('Video playback error:', error)}
          style={{
            width: 208, // Tailwind's w-52
            height: 288, // Tailwind's h-72
            borderRadius: 33,
            marginTop: 12, // Tailwind's mt-3
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Tailwind's bg-white/10
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }} // Tailwind's relative flex justify-center items-center
          activeOpacity={0.7}
          onPress={() => onPress()}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
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

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.$id);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id} // Assuming `$id` is unique for each item
      renderItem={({ item }) => (
        <TrendingItem active={activeItem === item.$id} item={item} onPress={() => handleActiveItem(item.$id)} />
      )}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;