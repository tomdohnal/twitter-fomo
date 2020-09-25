/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Wrap, Box, Stack, Input, Button } from '@chakra-ui/core';
import CheckboxButton from '../components/CheckboxButton';
import ContentContainer from '../components/ContentContainer';
import GroupedRadioButtons from '../components/GroupedRadioButtons';
import CellPhoneImage from '../components/CellPhoneImage';
import MailboxImage from '../components/MailboxImage';
import BalloonImage from '../components/BalloonImage';
import MountainImage from '../components/MountainImage';
import EnvelopeImage from '../components/EnvelopeImage';

const Components = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [radioValue, setRadioValue] = useState('vue');
  const [inputValue, setInputValue] = useState('');

  return (
    <ContentContainer>
      {/* <Stack spacing={8}>
        <Wrap spacing={4}>
          <CheckboxButton isChecked={isChecked} onCheck={setIsChecked}>
            Checkbox
          </CheckboxButton>
          <CheckboxButton isChecked={isChecked2} onCheck={setIsChecked2}>
            Checkbox
          </CheckboxButton>
        </Wrap>
        <Box>
          <GroupedRadioButtons
            value={radioValue}
            setValue={setRadioValue}
            items={[
              {
                value: 'react',
                label: 'React',
              },
              {
                value: 'vue',
                label: 'Vue',
              },
              {
                value: 'angular',
                label: 'Angular',
              },
            ]}
          />
          Radio value: {radioValue}
        </Box>
        <Box>
          <Wrap>
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
              size="sm"
            />
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
            />
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
              size="lg"
            />
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
              size="xl"
            />
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
              }}
              placeholder="A sample placeholder"
              size="2xl"
            />
          </Wrap>
          Input value: {inputValue}
        </Box>
        <Wrap>
          <Button size="sm">Welcome</Button>
          <Button>Welcome</Button>
          <Button size="lg">Welcome</Button>
          <Button size="xl">Welcome</Button>
          <Button size="2xl">Welcome</Button>
        </Wrap>
      </Stack>
      <Box pl="400px">
        <CellPhoneImage />
      </Box> */}
      {/* <Box pl="400px" mt="200px">
        <MailboxImage />
      </Box> */}
      {/* <Box pl="400px" mt="200px">
        <BalloonImage />
      </Box> */}
      {/* <Box pl="200px" mt="200px">
        <MountainImage />
      </Box> */}
      <Box pl="200px" mt="200px">
        <EnvelopeImage />
      </Box>
    </ContentContainer>
  );
};

export default Components;
