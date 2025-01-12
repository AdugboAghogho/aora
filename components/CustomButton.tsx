import { ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles = {}, // Default to an empty object
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.container,
        isLoading ? { opacity: 0.5 } : {}, // Ensure valid object returned
        containerStyles, // Allow for external styles to be added
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.loader}
        />
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFA300", // Replace with your secondary color
    borderRadius: 30, // Tailwind's rounded-xl
    minHeight: 62, // Tailwind's min-h-[62px]
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#161622", // Replace with your primary color
    fontFamily: "Poppins-SemiBold", // Replace with your font name
    fontSize: 18, // Tailwind's text-lg
  },
  loader: {
    marginLeft: 8, // Tailwind's ml-2
  },
});

export default CustomButton;
