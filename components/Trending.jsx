import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { icons } from "../constants";

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
    style={{ marginRight: 25 }}
    animation={activeItem === item.$id ? zoomIn : zoomOut}
    duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 52,
            height: 72,
            borderRadius: 33,
            marginTop: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Equivalent to bg-white/10
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay={play}
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
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.7,
          }}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{
              width: 52,
              height: 72,
              borderRadius: 33,
              marginVertical: 5,
              overflow: "hidden",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
            }}
            resizeMode="cover"
          />

          <Image source={icons.play} style={{ width: 12, height: 12, position: "absolute" }} resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts.length > 0 ? posts[0].$id : null);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
    data={posts}
    horizontal
    keyExtractor={(item) => item.$id}
    renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
    // onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
      itemVisiblePercentThreshold: 70,
    }}
    initialScrollIndex={0}
  />
  );
};

export default Trending;