import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "../../constants";
import tailwind from 'tailwind-rn';
import { CustomButton, FormField } from "../../components";
// import { getCurrentUser, signIn } from "../../lib/appwrite"; // Ensure these are correctly implemented
// import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const router = useRouter();
  // const { setUser, setIsLogged } = useGlobalContext(); // Context hooks
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password); // Sign-in logic
      const user = await getCurrentUser(); // Get user data
      setUser(user); // Set user in global context
      setIsLogged(true); // Mark as logged in

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home"); // Redirect to home
    } catch (error) {
      console.error("Sign-in error:", error); // Log error
      Alert.alert("Error", error?.message || "Something went wrong"); // Show error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(value) => handleChangeText("email", value)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(value) => handleChangeText("password", value)}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            handlePress={submit} // Hook up the submit function
            // containerStyles="mt?-7"
            isLoading={isSubmitting} // Add loading indicator
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
