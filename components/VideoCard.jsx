import { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video"; // Import from expo-video
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

  // Initialize the video player
  const player = useVideoPlayer(video, (player) => {
    player.loop = false; // Disable looping
    if (play) {
      player.play(); // Autoplay when `play` is true
    }
  });

  return (
    <View style={{ flex: 1, flexDirection: "column", alignItems: "center", paddingBottom: 22 }}>
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
          <VideoView
            style={{ width: "100%", height: "100%" }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (player.playing) {
                player.pause();
              } else {
                player.play();
              }
            }}
            style={{ position: "absolute", top: "50%", left: "50%", transform: [{ translateX: -24 }, { translateY: -24 }] }}
          >
            <Image source={player.playing ? icons.pause : icons.play} style={{ width: 48, height: 48, resizeMode: "contain" }} />
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