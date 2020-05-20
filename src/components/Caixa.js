import React from 'react';
import { View } from 'react-native';

const Caixa = ({cor})=>{
    return (
      <View
      style={{
        width:100,
        height: 100,
        backgroundColor: cor,
        borderWidth: 2,
        borderColor: 'white',
      }}
    />
    )
  }

  export default Caixa;