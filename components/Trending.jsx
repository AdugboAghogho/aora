import { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video"; // Import from expo-video
import * as Animatable from "react-native-animatable";
import { FlatList, Image, ImageBackground, TouchableOpacity, View, StyleSheet } from "react-native";

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
      style={{ marginRight: 20 }} // Replaced className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View style={styles.videoContainer}> {/* Replaced className="w-52 h-72 rounded-[33px] mt-3 bg-white/10 overflow-hidden" */}
          <VideoView
            style={styles.video} // Replaced className="w-full h-full"
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          <TouchableOpacity
            style={styles.playPauseButton} // Replaced className="absolute top-1/2 left-1/2"
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
              style={styles.playPauseIcon} // Replaced className="w-12 h-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.thumbnailContainer} // Replaced className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            style={styles.thumbnail} // Replaced className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={styles.playIcon} // Replaced className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]?.$id);

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
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      // onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;

// Inline styles
const styles = StyleSheet.create({
  videoContainer: {
    width: 208, // w-52 (52 * 4 = 208)
    height: 288, // h-72 (72 * 4 = 288)
    borderRadius: 33,
    marginTop: 12, // mt-3 (3 * 4 = 12)
    backgroundColor: "rgba(255, 255, 255, 0.1)", // bg-white/10
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
});