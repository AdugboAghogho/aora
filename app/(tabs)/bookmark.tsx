import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts, getBookmarks } from "../../lib/appwrite"; // Import bookmark fetch function
import { EmptyState, SearchInput, VideoCard } from "../../components";
import React from "react";

const Bookmark = () => {
  const { query } = useLocalSearchParams();
  const [bookmarks, setBookmarks] = useState([]);
  const [searchMode, setSearchMode] = useState(false); // Check if search is active

  // Fetch bookmarks by default
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const savedBookmarks = await getBookmarks(); // Fetch user's saved bookmarks
        setBookmarks(savedBookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    if (!query) {
      fetchBookmarks();
    }
  }, [query]);

  // Fetch search results when query changes
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    if (query) {
      refetch();
      setSearchMode(true); // User is searching
    } else {
      setSearchMode(false); // Show bookmarks when no query
    }
  }, [query]);

  const displayedVideos = searchMode ? posts : bookmarks; // Show search results if searching

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", flex: 1 }}>
      <FlatList
        data={displayedVideos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator?.username || "Unknown"}
            avatar={item.creator?.avatar || ""}
            post={undefined}          />
        )}
        ListHeaderComponent={() => (
          <View style={{ flex: 1, paddingHorizontal: 16, marginBottom: 16 }}>
            <Text style={{ fontSize: 16, color: "#fff", fontWeight: "500", marginBottom: 8, marginTop: 20, }}>
              {searchMode ? "Search Results" : "Saved Videos"}
            </Text>
            <SearchInput initialQuery={query} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={searchMode ? "No Videos Found" : "No Bookmarks Yet"}
            subtitle={searchMode ? "Try a different search query" : "You haven’t saved any videos yet"}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
