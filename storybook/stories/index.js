import React from 'react';
// import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Block from 'components/Common/Block';
import ListChatItem from 'components/Common/ListChatItem';
// import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));
storiesOf('Common/Block', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <Block data="No internet connection" />);
storiesOf('Common/ListChatItem', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <ListChatItem
      onClick={action('clicked-emoji')}
      isOnline
      resizeMode="contain"
      title="Aragorn Trymbel"
      time="14:54"
      subtitle="TYPING____"
    />
  ));
