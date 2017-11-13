import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import '../App.css';
import Labels from '../Labels';
import AddLabel from '../AddLabel';
import { UntaggedItem } from '../UntaggedItem';

const fewLabels = ['Thatch', 'Richard', 'Heather', 'Langos'];

storiesOf('Labels', module)
  .add('with default', () => {
    return <Labels
      labels={fewLabels}
      onSelect={action('select')}
    />;
  })
  .add('with List Group', () => {
    return <Labels
      labels={fewLabels}
      onSelect={action('select')}
      type="ListGroup"
    />;
  })
  .add('with Buttons', () => {
    return <Labels
      labels={fewLabels}
      onSelect={action('select')}
      type="Buttons"
    />;
  });

storiesOf('Add Label', module)
  .add('with default', () => {
    return <AddLabel onAdd={action('add')} />;
  });

const normalUntaggedProps = {
  filename: 'car_1510581598146_423_639_105_507.png',
  labels: fewLabels,
  onTag: action('tag'),
  onLabel: action('label'),
  onNegative: action('negative'),
  onCancel: action('cancel'),
  onAddLabel: action('addLabel'),
  onRecognize: action('recognize'),
};

storiesOf('Untagged Item', module)
  .add('with default', () => <UntaggedItem {...normalUntaggedProps} />)
  .add('with processing', () => <UntaggedItem {...normalUntaggedProps} processing />)
  .add('with good guess', () => <UntaggedItem {...normalUntaggedProps} guess="Richard" score={0.9} />);

storiesOf('Untagged Items', module)
  .add('with default', () => {
    return <div className="App">
      <UntaggedItem {...normalUntaggedProps} />
      <UntaggedItem {...normalUntaggedProps} />
      <UntaggedItem {...normalUntaggedProps} />
      <UntaggedItem {...normalUntaggedProps} />
    </div>;
  });
