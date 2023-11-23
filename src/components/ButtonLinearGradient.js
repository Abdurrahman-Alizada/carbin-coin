import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const ButtonLinearGradient = ({children, style}) => {
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
    //   colors={['#4c669f', '#3b5998', '#192f6a']}
      colors={['#00f196', '#00d68d', '#15c186']}
      style={[style, {borderRadius: 40,}]}>
      {children}
    </LinearGradient>
  );
};

export default ButtonLinearGradient;
