import { useWindowDimensions } from 'react-native';

export enum Orientation {
  portrait = 'portrait',
  landscape = 'landscape',
}

export function useOrientation() {
  const { width, height } = useWindowDimensions();

  if (width > height) {
    return Orientation.landscape;
  }

  return Orientation.portrait;
}
