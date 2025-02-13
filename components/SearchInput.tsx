import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";
import React from "react";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View
      style={{
        flexDirection: "row", // Tailwind's flex flex-row
        alignItems: "center", // Tailwind's items-center
        gap: 16, // Tailwind's space-x-4
        width: "100%", // Tailwind's w-full
        height: 64, // Tailwind's h-16
        paddingHorizontal: 16, // Tailwind's px-4
        backgroundColor: "#1C1C28", // Tailwind's bg-black-100
        borderRadius: 16, // Tailwind's rounded-2xl
        borderWidth: 2, // Tailwind's border-2
        borderColor: "#2A2A3A", // Tailwind's border-black-200
      }}
    >
      <TextInput
        style={{
          fontSize: 16, // Tailwind's text-base
          marginTop: 2, // Tailwind's mt-0.5
          color: "#FFFFFF", // Tailwind's text-white
          flex: 1, // Tailwind's flex-1
          fontFamily: "Poppins-Regular", // Tailwind's font-pregular
        }}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          style={{
            width: 20, // Tailwind's w-5
            height: 20, // Tailwind's h-5
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
