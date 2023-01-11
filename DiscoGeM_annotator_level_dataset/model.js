const tf = require('@tensorflow/tfjs');
const fetch = require('node-fetch');
const stream = require('stream');
const util = require('util');
const pipeline = util.promisify(stream.pipeline);
const fs = require('fs');

// Load the modified CSV dataset
const dataset = tf.data.csv('modified-dataset.csv', {
  columnConfigs: {
    0: {
      isLabel: true
    }
  }
});

// Convert string labels to numeric indices
const labelEncoder = tf.data.TextLineDataset.createLabelEncoder(
  'label',
  ["A", "D", "N"]
);

const encodedDataset = dataset.map(example => {
  return {
    xs: example.xs,
    label: labelEncoder.encode(example.label)
  }
});

// Prepare the dataset for training
const preparedDataset = encodedDataset
  .shuffle(1000)
  .batch(32)
  .map(batch => ({ xs: batch.xs, ys: batch.label }));

// Load the BERT model
const BERT_URL = 'https://huggingface.co/google/bert_uncased_L-12_H-768_A-12';
const model = await tf.loadLayersModel(BERT_URL);

// Freeze the layers to reuse the pre-trained weights
model.layers.forEach(layer => layer.trainable = false);

// Add a new output layer
const output = model.output.apply(tf.layers.dense({ units: 3 }));
const newModel = tf.model({ inputs: model.inputs, outputs: output });

// Compile the model
newModel.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });
  
  // Train the model
  const history = await newModel.fit(preparedDataset, {
    epochs: 10,
    validationSplit: 0.2
  });
  
  console.log('Training complete!');
  
  // Save the model
  const saveResults = await newModel.save('file://./model');
  console.log(`model has been saved at ${saveResults.filepath}`);
  