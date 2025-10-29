import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  horizontal?: boolean;
}

const Logo: React.FC<LogoProps> = ({size = 'medium', horizontal = false}) => {
  // Tamanhos para logo quadrada (atual)
  const squareSize = {
    small: 100,
    medium: 150,
    large: 200,
  }[size];

  // Tamanhos para logo horizontal (header)
  const horizontalSizes = {
    small: { width: 180, height: 40 },
    medium: { width: 280, height: 60 },
    large: { width: 350, height: 80 },
  }[size];

  // Tenta usar logo horizontal se existir e for solicitado
  let logoSource;
  try {
    logoSource = horizontal
      ? require('../assets/images/logo-horizontal.png')
      : require('../assets/images/logo.jpeg');
  } catch {
    // Fallback para logo quadrada se horizontal não existir
    logoSource = require('../assets/images/logo.jpeg');
  }

  const imageStyle = horizontal
    ? horizontalSizes
    : {width: squareSize, height: squareSize};

  return (
    <View style={styles.container}>
      <Image
        source={logoSource}
        style={[styles.logo, imageStyle]}
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
