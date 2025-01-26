import { useState, useCallback } from "react";
import { useVideoPlayer, VideoView } from "expo-video"; // Import from expo-video
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
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

  // Initialize the video player
  const player = useVideoPlayer(item.video, (player) => {
    player.loop = false; // Disable looping
    if (play) {
      player.play(); // Autoplay when `play` is true
    }
  });

  return (
    <Animatable.View
      style={{ marginRight: 25, ...(activeItem === item.$id ? zoomIn : zoomOut) }}
      animation="zoomIn"
      duration={500}
    >
      {play ? (
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          <TouchableOpacity
            style={styles.playPauseButton}
            activeOpacity={0.7}
            onPress={() => {
              if (player.playing) {
                player.pause();
              } else {
                player.play();
              }
            }}
          >
            <Image
              source={player.playing ? icons.pause : icons.play}
              style={styles.playPauseIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.thumbnailContainer}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={styles.playIcon}
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
      setActiveItem(viewableItems[0].key);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={handleViewableItemsChanged} // Use the memoized callback
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;

// Inline styles
const styles = {
  videoContainer: {
    width: 208, // Adjusted to match your design (52 * 4)
    height: 288, // Adjusted to match your design (72 * 4)
    borderRadius: 33,
    marginTop: 12, // Adjusted to match your design (3 * 4)
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Fixed invalid CSS value
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  playPauseButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }], // Centering the button
  },
  playPauseIcon: {
    width: 48, // w-12 (12 * 4 = 48)
    height: 48, // h-12 (12 * 4 = 48)
  },
  thumbnailContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: 208, // w-52 (52 * 4 = 208)
    height: 288, // h-72 (72 * 4 = 288)
    borderRadius: 33,
    marginVertical: 20, // my-5 (5 * 4 = 20)
    overflow: "hidden",
    shadowColor: "#000", // shadow-black/40
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  playIcon: {
    width: 48, // w-12 (12 * 4 = 48)
    height: 48, // h-12 (12 * 4 = 48)
    position: "absolute",
  },
};