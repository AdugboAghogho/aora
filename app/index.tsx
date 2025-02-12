import React from "react";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import './output.css'; 
import './globals.css'; 

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", flex: 1 }}>
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <Image
            source={images.logo}
            style={{ width: 130, height: 84 }}
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            style={{ maxWidth: 380, width: "100%", height: 298 }}
            resizeMode="contain"
          />

          <View
            style={{
              position: "relative",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#ffffff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text style={{ color: "#FFD700" /* secondary color */ }}>
                Aora
              </Text>
            </Text>

            <Image
              source={images.path}
              style={{
                width: 136,
                height: 15,
                position: "absolute",
                bottom: -8,
                right: -32,
              }}
              resizeMode="contain"
            />
          </View>

          <Text
            style={{
              fontSize: 14,
              fontFamily: "sans-serif",
              color: "#dcdcdc",
              marginTop: 28,
              textAlign: "center",
            }}
          >
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles={{ width: "100%", marginTop: 28 }} 
            isLoading={undefined}         
          />

        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
