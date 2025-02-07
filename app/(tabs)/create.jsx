import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { VideoView } from "expo-video";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }


    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  const myStyles = StyleSheet.create({
    extraMargin: {
      marginTop: 20,
    }, 
    extraaMargin: {
      marginTop: 14,
    },
    extraaaMargin: {
      marginTop: 14,
      marginBottom: "30px",
    }
} );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161622" }}> {/* Example */}
      <ScrollView style={{ paddingHorizontal: 16, marginTop: 24 }}> {/* Example */}
        <Text style={{ fontSize: 24, color: "white", fontWeight: "600" }}>
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={myStyles.extraMargin}
        />

        <View style={{ marginTop: 28, gap: 8 }}> {/* Example */}
          <Text 
           style={{
              fontFamily: "Poppins-Regular", // Tailwind's font-pregular
              fontSize: 18, // Tailwind's text-lg
              color: "#CBD5E0", // Tailwind's text-gray-100
              marginBottom: 12, // Tailwind's mb-3
            }}
          >
            Upload Video
          </Text>


          <TouchableOpacity
            onPress={() => openPicker("video")}
            accessibilityLabel="Upload Video"
            accessible={true}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{ width: "100%", height: 256, borderRadius: 8 }} /* Example */
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 160,
                  paddingHorizontal: 16,
                  backgroundColor: "#black-100",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#CBD5E0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#CBD5E0",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    style={{ width: "50%", height: "50%" }}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 28, gap: 8 }}> {/* Example */}
          <Text 
           style={{
              fontFamily: "Poppins-Regular", // Tailwind's font-pregular
              fontSize: 18, // Tailwind's text-lg
              color: "#CBD5E0", // Tailwind's text-gray-100
              marginBottom: 12, // Tailwind's mb-3
            }}
          >
            Thumbnail Image
          </Text>

          <TouchableOpacity
            onPress={() => openPicker("image")}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                style={{ width: "100%", height: 256, borderRadius: 8 }} /* Example */
                resizeMode='cover'
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 160,
                  paddingHorizontal: 16,
                  backgroundColor: "#black-100",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#CBD5E0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  style={{ width: "50%", height: "50%" }}
                />

                <Text 
                  style={{
                    fontFamily: "Poppins-Regular", // Tailwind's font-pregular
                    fontSize: 18, // Tailwind's text-lg
                    color: "#CBD5E0", // Tailwind's text-gray-100
                    marginBottom: 12, // Tailwind's mb-3
                  }}
                >
                  Choose a File
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={myStyles.extraaMargin}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles={myStyles.extraaaMargin}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;