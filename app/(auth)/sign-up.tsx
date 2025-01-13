import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
      router.push("/home");
      

    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            paddingHorizontal: 16,
            marginVertical: 24,
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 115, height: 34 }}
          />

          <Text
            style={{
              fontSize: 24,
              fontWeight: "600",
              color: "#FFFFFF",
              marginTop: 40,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles={{ marginTop: 40 }}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginTop: 28 }}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginTop: 28 }}
          />

          <Link href="/home">
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles={{ width: "100%", marginTop: 28 }}
              isLoading={isSubmitting}
            />
          </Link>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#D1D5DB",
                fontFamily: "Poppins-Regular",
              }}
            >
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#FFD700",
                marginLeft: 4,
              }}
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
