import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in"); // Navigate to sign-in screen
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#161622" }}> {/* Full height, background color */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 16, paddingTop: 24 }}> {/* Padding */}
            <TouchableOpacity onPress={handleLogout} style={{ position: "absolute", top: 16, right: 16 }}> {/* Logout button position */}
              <Image source={icons.logout} resizeMode="contain" style={{ width: 24, height: 24 }} />
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: 32 }}> {/* Center profile image */}
              <Image
                source={{ uri: user?.avatar }}
                style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: "#fff" }} // Rounded profile image
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles={{ marginTop: 16 }} // Margin for username
              titleStyles={{ fontSize: 20, fontWeight: "bold" }} // Username styles
              subtitle={undefined}            />

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}> {/* InfoBoxes layout */}
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles={{ fontSize: 24, fontWeight: "bold" }} // Posts count styles
                containerStyles={{ marginRight: 16 }} // Margin for posts InfoBox
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles={{ fontSize: 24, fontWeight: "bold" }} // Followers count styles
                containerStyles={undefined}              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;