import { useState, useEffect } from "react";
import { useVideoPlayer, VideoView } from "expo-video"; // Import from expo-video
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);
  const [showControls, setShowControls] = useState(true); // Controls visibility of play/pause icon

  // Initialize the video player
  const player = useVideoPlayer(video, (player) => {
    player.loop = false; // Disable looping
  });

  // Automatically play the video when `play` is true
  useEffect(() => {
    if (play) {
      player.play();
      setShowControls(false); // Hide controls when video starts playing
    } else {
      player.pause();
      setShowControls(true); // Show controls when video is paused
    }
  }, [play]);

  // Toggle play/pause when the video is clicked
  const handleVideoPress = () => {
    if (player.playing) {
      player.pause();
      setShowControls(true); // Show controls when video is paused
    } else {
      player.play();
      setShowControls(false); // Hide controls when video starts playing
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", paddingLeft: "1rem", paddingRight: "1rem",  marginBottom:" 3.5rem "}}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}>
          <View style={{ width: 46, height: 46, borderRadius: 50, borderWidth: 1, borderColor: "#ccc", justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{ uri: avatar }}
              style={{ width: "100%", height: "100%", borderRadius: 50, resizeMode: "cover" }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10, justifyContent: "center" }}>
            <Text style={{ fontSize: 14, fontWeight: "bold", color: "white", numberOfLines: 1 }}>{title}</Text>
            <Text style={{ fontSize: 12, color: "#ccc", numberOfLines: 1 }}>{creator}</Text>
          </View>
        </View>

        
        <View style={{ paddingTop: 6 }}>
          <Image source={icons.menu} style={{ width: 25, height: 25, resizeMode: "contain" }} />
        </View>
      </View>

      {play ? (
        <View style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 15, overflow: "hidden" }}>
          <TouchableOpacity
            activeOpacity={1} // Ensure the entire video area is clickable
            onPress={handleVideoPress}
            style={{ width: "100%", height: "100%" }}
          >
            <VideoView
              style={{ width: "100%", height: "100%" }}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
            {showControls && ( // Show play/pause icon only when `showControls` is true
              <Image
                source={player.playing ? icons.pause : icons.play}
                style={{ width: 48, height: 48, position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -24 }, { translateY: -24 }], resizeMode: "contain" }}
              />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 15, position: "relative", justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{ width: "100%", height: "100%", borderRadius: 10, resizeMode: "cover" }}
          />
          <Image source={icons.play} style={{ width: 48, height: 48, position: "absolute", resizeMode: "contain" }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;