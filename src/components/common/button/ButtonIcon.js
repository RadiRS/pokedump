import React from 'react';
import { Button, Icon } from 'native-base';

const IconButton = props => {
  const { iconName, style, onPress, ...restProps } = props;

  return (
    <Button onPress={onPress} style={[styles.button, style]} {...restProps}>
      <Icon style={styles.icon} name={iconName} type="FontAwesome" />
    </Button>
  );
};

const styles = {
  button: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: '#fff'
  }
};

export default IconButton;
