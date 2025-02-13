import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, VideoCard } from "../../components";
import React from "react";

const Bookmark = () => {
  const { query } = useLocalSearchParams(); 
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  console.log(query, posts)
  useEffect(() => {
    refetch(); // Refetch data on query change
  }, [query]); // Dependency array includes query

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", flex: 1 }}> {/* Inline styles for background color and full height */}
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
        ListHeaderComponent={() => (
          <>``
            <View style={{ flex: 1, paddingHorizontal: 16, marginBottom: 16 }}> 
              <Text style={{ fontSize: 16, color: "#fff", fontWeight: "500", marginBottom: 8 }}> 
                Saved Videos
              </Text>
              <Text style={{ fontSize: 24, color: "#fff", fontWeight: "700" }}> 
                {query}
              </Text>

              <SearchInput initialQuery={query}  /> 
              {/* <SearchInput initialQuery={query} refetch={refetch} /> */}
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
