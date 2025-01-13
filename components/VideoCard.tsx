import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);

  return (
    <View style={{ flexDirection: "column", alignItems: "center", paddingHorizontal: 16, marginBottom: 56 }}>
      {/* Header Section */}
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {/* Avatar */}
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#8F8FDF", // Secondary color
              justifyContent: "center",
              alignItems: "center",
              padding: 1,
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
              }}
              resizeMode="cover"
            />
          </View>

          {/* Title and Creator */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                fontSize: 14,
                color: "#FFFFFF",
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 12,
                color: "#A1A1AA", // Gray text
              }}
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        {/* Menu Icon */}
        <View style={{ paddingTop: 8 }}>
          <Image source={icons.menu} style={{ width: 20, height: 20 }} resizeMode="contain" />
        </View>
      </View>

      {/* Video/Thumbnail Section */}
      {play ? (
        <Video
          source={{ uri: video }}
          style={{
            width: "100%",
            height: 240, // Tailwind's h-60
            borderRadius: 16, // Tailwind's rounded-xl
            marginTop: 12, // Tailwind's mt-3
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={{
            width: "100%",
            height: 240, // Tailwind's h-60
            borderRadius: 16, // Tailwind's rounded-xl
            marginTop: 12, // Tailwind's mt-3
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 16,
            }}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={{
              width: 48, // Tailwind's w-12
              height: 48, // Tailwind's h-12
              position: "absolute",
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
