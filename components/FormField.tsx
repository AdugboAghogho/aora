import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder = "",
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[{ marginBottom: 10 }, otherStyles]}>
      <Text style={{ fontSize: 16, color: "#D1D5DB", fontFamily: "Poppins-Medium" }}>
        {title}
      </Text>

      <View
        style={{
          width: "100%",
          height: 64,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1F1F1F", // Adjust based on your theme
          borderRadius: 16,
          paddingHorizontal: 16,
          borderWidth: 2,
          borderColor: "#3E3E3E", // Adjust based on your theme
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: "#FFFFFF",
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#3E3E3E"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
