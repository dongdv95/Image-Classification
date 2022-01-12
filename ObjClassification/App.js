import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Camera, MobileModel} from 'react-native-pytorch-core';

const model = require('./models/resnet18.ptl');
const classes = require('./models/class.json');
const App = () => {
  const [classObj, setClassObj] = useState('');

  async function handleImage(image) {
    const predict = await MobileModel.execute(model, {
      image,
    });

    let topclass = classes[predict.result.maxIdx];
    setClassObj(topclass);
    console.log('predict: ', topclass);
    image.release();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Classification: {classObj}</Text>
      <Camera style={styles.camera} onFrame={handleImage} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffff',
    padding: 20,
    alignItems: 'center',
  },
  label: {
    marginBottom: 10,
  },
  camera: {
    flexGrow: 1,
    width: '100%',
  },
});
