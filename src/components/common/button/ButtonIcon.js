import React from 'react';
import { Button, Icon } from 'native-base';

const IconButton = props => {
  const { iconName, onPress, ...restProps } = props;

  return (
    <Button onPress={onPress} style={styles.button} {...restProps}>
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
