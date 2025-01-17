declare module 'expo-video' {
    import { ComponentType } from 'react';
    import { ViewProps } from 'react-native';
  
    export interface VideoProps extends ViewProps {
      source: { uri: string };
      resizeMode?: 'contain' | 'cover' | 'stretch';
      useNativeControls?: boolean;
      shouldPlay?: boolean;
      onPlaybackStatusUpdate?: (status: { didJustFinish: boolean }) => void;
    }
  
    const Video: ComponentType<VideoProps>;
    export default Video;
}