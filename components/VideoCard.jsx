import { useState, useEffect } from 'react';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { databases, ID } from 'appwrite'; 

import { icons } from '../constants';
import { appwriteConfig } from '../lib/appwrite'; 

const VideoCard = ({ title, creator, avatar, thumbnail, video, post }) => {
  const [play, setPlay] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const player = useVideoPlayer(video, (player) => {
    player.loop = false; 
  });

  useEffect(() => {
    if (play) {
      player.play();
      setShowControls(false);
    } else {
      player.pause();
      setShowControls(true);
    }
  }, [play, player]);

  const handleVideoPress = () => {
    if (player.playing) {
      player.pause();
      setShowControls(true); 
    } else {
      player.play();
      setShowControls(false); 
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleBookmark = async () => {
    try {
      if (!appwriteConfig.bookmarkCollectionId) {
        throw new Error('Bookmark collection ID is missing from config.');
      }
      if (!post || !post.userId) {
        throw new Error('Invalid post data: userId is missing.');
      }

      const newBookmark = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.bookmarkCollectionId, 
        ID.unique(),
        {
          userId: post.userId,
          title: post.title,
          thumbnail: post.thumbnail,
          video: post.video,
          prompt: post.prompt,
        }
      );

      console.log('Bookmark saved:', newBookmark);
      setBookmarked(true);
    } catch (error) {
      console.error('Error saving bookmark:', error.message);
      Alert.alert('Error', 'Failed to save bookmark. Please try again later.'); 
    }
  };

  return (
    <View style={{ 
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        paddingLeft: '1rem', 
        paddingRight: '1rem', 
        marginBottom: '3.5rem' 
      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
          <View style={{ 
              width: 46, 
              height: 46, 
              borderRadius: 50, 
              borderWidth: 1, 
              borderColor: '#ccc', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
            <Image
              source={{ uri: avatar }}
              style={{ width: '100%', height: '100%', borderRadius: 50, resizeMode: 'cover' }}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>{title}</Text>
            <Text style={{ fontSize: 12, color: '#ccc' }}>{creator}</Text>
          </View>
        </View>

        <View style={{ position: 'relative', paddingTop: 6 }}>
          <TouchableOpacity onPress={toggleDropdown}>
            <Image source={icons.menu} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={{
              position: 'absolute',
              top: 30,
              right: 0,
              backgroundColor: 'white',
              padding: 10,
              borderRadius: 8,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5,
            }}>
              <TouchableOpacity onPress={handleBookmark} disabled={bookmarked}>
                <Image 
                  source={icons.bookmark} 
                  style={{ 
                    width: 25, 
                    height: 25, 
                    resizeMode: 'contain', 
                    opacity: bookmarked ? 0.5 : 1 
                  }} 
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {play ? (
        <View style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 15, overflow: 'hidden' }}>
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={handleVideoPress} 
            style={{ width: '100%', height: '100%' }}
          >
            <VideoView
              style={{ width: '100%', height: '100%' }}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
            {showControls && (
              <Image
                source={player.playing ? icons.pause : icons.play}
                style={{ 
                  width: 48, 
                  height: 48, 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: [{ translateX: -24 }, { translateY: -24 }], 
                  resizeMode: 'contain' 
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={{ 
            width: '100%', 
            height: 200, 
            borderRadius: 10, 
            marginTop: 15, 
            position: 'relative', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{ width: '100%', height: '100%', borderRadius: 10, resizeMode: 'cover' }}
          />
          <Image source={icons.play} style={{ width: 48, height: 48, position: 'absolute', resizeMode: 'contain' }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;