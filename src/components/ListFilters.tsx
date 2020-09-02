import React, { useState } from 'react';
import { Box, Heading, Input, Button, useTheme, Text, Stack, Wrap } from '@chakra-ui/core';
import CheckboxButton from './CheckboxButton';
import GroupedRadioButtons from './GroupedRadioButtons';

const FormFieldLabel: React.FC = ({ children }) => {
  return (
    <Text color="textSecondary" textTransform="lowerCase" mb={1}>
      {children}
    </Text>
  );
};

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const onClick = () => {};

  return (
    <Box as="form">
      <Heading size="md" mb={4}>
        Get newsletter
      </Heading>
      <Input
        value={email}
        onChange={e => {
          setEmail(e.target.value);
        }}
        placeholder="lady.gaga@example.org"
        mb={3}
      />
      <Button width="100%" onClick={onClick}>
        Subscribe
      </Button>
    </Box>
  );
};

const PERIOD_ITEMS = [
  {
    label: 'Day',
    value: 'DAY',
  },
  {
    label: 'Week',
    value: 'WEEK',
  },
];

const TAG_ITEMS = [
  {
    label: 'React',
    value: 'REACT',
  },
  {
    label: 'Vue',
    value: 'VUE',
  },
  {
    label: 'Angular',
    value: 'ANGULAR',
  },
];

const TWEET_TYPE_ITEMS = [
  {
    label: 'Text',
    value: 'TEXT',
  },
  {
    label: 'Media',
    value: 'MEDIA',
  },
  {
    label: 'Link',
    value: 'LINK',
  },
];

const ACCOUNT_TYPE_ITEMS = [
  {
    label: 'Personal',
    value: 'PERSONAL',
  },
  {
    label: 'Business',
    value: 'BUSINESS',
  },
];

const ListFilters: React.FC = () => {
  const theme = useTheme();
  const [periodValue, setPeriodValue] = useState('DAY');
  const [tagValues, setTagValues] = useState({});
  const [tweetTypeValues, setTweetTypeValues] = useState({});
  const [accountTypeValues, setAccountTypeValues] = useState({});

  return (
    <Box
      bgColor="white"
      py={12}
      px={4}
      maxW={[300]}
      border="2px solid"
      borderColor="primary"
      boxShadow={theme.shadows.sm()}
    >
      <Heading mb={6}>Filters</Heading>
      <Stack spacing={6}>
        <Box>
          <FormFieldLabel>Period</FormFieldLabel>
          <GroupedRadioButtons
            value={periodValue}
            setValue={value => {
              setPeriodValue(value);
            }}
            items={PERIOD_ITEMS}
          />
        </Box>
        <Box>
          <FormFieldLabel>Tags</FormFieldLabel>
          <Wrap spacing={3}>
            {TAG_ITEMS.map(({ label, value }) => {
              return (
                <CheckboxButton
                  key={value}
                  onCheck={isChecked => {
                    setTagValues(prevTagValues => {
                      return {
                        ...prevTagValues,
                        [value]: isChecked,
                      };
                    });
                  }}
                  isChecked={!!tagValues[value]}
                >
                  {label}
                </CheckboxButton>
              );
            })}
          </Wrap>
        </Box>
        <Box>
          <FormFieldLabel>Tweet Types</FormFieldLabel>
          <Wrap spacing={3}>
            {TWEET_TYPE_ITEMS.map(({ label, value }) => {
              return (
                <CheckboxButton
                  key={value}
                  onCheck={isChecked => {
                    setTweetTypeValues(prevTweetTypeValues => {
                      return {
                        ...prevTweetTypeValues,
                        [value]: isChecked,
                      };
                    });
                  }}
                  isChecked={!!tweetTypeValues[value]}
                >
                  {label}
                </CheckboxButton>
              );
            })}
          </Wrap>
        </Box>
        <Box>
          <FormFieldLabel>Account Types</FormFieldLabel>
          <Wrap spacing={3}>
            {ACCOUNT_TYPE_ITEMS.map(({ label, value }) => {
              return (
                <CheckboxButton
                  key={value}
                  onCheck={isChecked => {
                    setTagValues(prevAccountTypeValues => {
                      return {
                        ...prevAccountTypeValues,
                        [value]: isChecked,
                      };
                    });
                  }}
                  isChecked={!!accountTypeValues[value]}
                >
                  {label}
                </CheckboxButton>
              );
            })}
          </Wrap>
        </Box>
      </Stack>
      {/* <CheckboxButton /> */}
      <Box h={24} />
      <NewsletterForm />
    </Box>
  );
};

export default ListFilters;
