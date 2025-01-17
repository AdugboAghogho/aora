import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

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
        <Video
          source={{ uri: video }}
          style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 15 }}
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