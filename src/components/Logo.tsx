import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({size = 'medium'}) => {
  const imageSize = {
    small: 100,
    medium: 150,
    large: 200,
  }[size];

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.jpeg')}
        style={[styles.logo, {width: imageSize, height: imageSize}]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // Removido tintColor para mostrar cores originais da logo
  },
});

export default Logo;
