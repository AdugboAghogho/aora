import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", flex: 1 }}>
      <FlatList
        // data={posts}
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.id.toString()}
        // keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          // <VideoCard
          //   title={item.title}
          //   thumbnail={item.thumbnail}
          //   video={item.video}
          //   creator={item.creator.username}
          //   avatar={item.creator.avatar}
          // />
          <Text style={{ fontSize: 24, color: '#FFF' }}>{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              marginVertical: 24, // Tailwind's my-6
              paddingHorizontal: 16, // Tailwind's px-4
              gap: 24, // Tailwind's space-y-6
            }}
          >
            <View
              style={{
                flexDirection: "row", // Tailwind's flex-row
                justifyContent: "space-between", // Tailwind's justify-between
                alignItems: "flex-start", // Tailwind's items-start
                marginBottom: 24, // Tailwind's mb-6
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins-Medium", // Tailwind's font-pmedium
                    fontSize: 14, // Tailwind's text-sm
                    color: "#CBD5E0", // Tailwind's text-gray-100
                  }}
                >
                  Welcome Back
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins-SemiBold", // Tailwind's font-psemibold
                    fontSize: 24, // Tailwind's text-2xl
                    color: "#FFFFFF", // Tailwind's text-white
                  }}
                >
                  JSMastery
                </Text>
              </View>

              <View style={{ marginTop: 6 }}>
                {/* Tailwind's mt-1.5 */}
                <Image
                  source={images.logoSmall}
                  style={{
                    width: 36, // Tailwind's w-9
                    height: 40, // Tailwind's h-10
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput initialQuery={undefined} />
            {/* <SearchInput /> */}

            <View
              style={{
                width: "100%", // Tailwind's w-full
                paddingTop: 20, // Tailwind's pt-5
                paddingBottom: 32, // Tailwind's pb-8
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular", // Tailwind's font-pregular
                  fontSize: 18, // Tailwind's text-lg
                  color: "#CBD5E0", // Tailwind's text-gray-100
                  marginBottom: 12, // Tailwind's mb-3
                }}
              >
                Latest Videos
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
              {/* <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} /> */}
              {/* <Trending posts={latestPosts ?? []} /> */}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )} 
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  );
};

export default Home;
