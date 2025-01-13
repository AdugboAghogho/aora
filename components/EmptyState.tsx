import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={images.empty}
        resizeMode="contain"
        style={{
        width: 270, 
        height: 216,
        }}
      />

      <Text
        style={{
        fontSize: 14, // Tailwind's text-sm
        fontFamily: "Poppins-Medium",
        color: "#A1A1AA", // Gray text
        }}
      >
        {title}
      </Text>

       <Text
          style={{
          fontSize: 20, // Tailwind's text-xl
          textAlign: "center",
          fontFamily: "Poppins-SemiBold",
          color: "#FFFFFF", // White text
          marginTop: 8, // Tailwind's mt-2
          }}
        >
          {subtitle}
        </Text>

        <CustomButton
          title="Back to Explore"
          handlePress={() => router.push("/home")}
          containerStyles={{
            width: "100%",
            marginTop: 20, // Tailwind's my-5
          }} 
          isLoading={undefined}      
        />
    </View>
  );
};

export default EmptyState;
