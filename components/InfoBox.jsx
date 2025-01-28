import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View style={[ 
      { 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 16, 
        borderRadius: 10, 
        backgroundColor: '#161622' 
      }, 
      containerStyles 
    ]}> 
      <Text style={[ 
        { color: 'white', fontWeight: 'bold', textAlign: 'center' }, 
        titleStyles 
      ]}>
        {title}
      </Text>
      <Text style={{ color: '#A1A1AA', fontSize: 12, textAlign: 'center', fontWeight: 'normal' }}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;