import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, useTheme, Text, Stack, Wrap } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import CheckboxButton from './CheckboxButton';
import GroupedRadioButtons from './GroupedRadioButtons';
import { encode, decode, Filters } from '../filters';

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

const COMMUNITY_ITEMS = ['React', 'Vue', 'Angular'];

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

interface FilterAction {
  value: string;
  name: keyof Filters;
}

const createGetNewFilters = (filters: Filters) => (action: FilterAction): Filters => {
  const oldField = filters[action.name];
  const newField = Array.isArray(oldField)
    ? oldField.includes(action.value)
      ? oldField.filter(value => value !== action.value)
      : [...oldField, action.value]
    : action.value;

  return { ...filters, [action.name]: newField };
};

const ListFilters: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  // @ts-ignore
  const filters = decode(router.query.filters);

  const getNewFilters = createGetNewFilters(filters);

  useEffect(() => {
    router.prefetch(
      `/leaderboard/[filters]`,
      `/leaderboard/${encode(getNewFilters({ name: 'period', value: 'week' }))}`,
    );
  }, [getNewFilters, router]);

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
            value={filters.period}
            setValue={value => {
              // console.log();
              router.push(
                `/leaderboard/[filters]`,
                `/leaderboard/${encode(getNewFilters({ name: 'period', value }))}`,
              );
              // setPeriodValue(value);
            }}
            items={PERIOD_ITEMS}
          />
        </Box>
        <Box>
          <FormFieldLabel>Tags</FormFieldLabel>
          <Wrap spacing={3}>
            {COMMUNITY_ITEMS.map(item => {
              return (
                <CheckboxButton
                  key={item}
                  onCheck={isChecked => {
                    // setTagValues(prevTagValues => {
                    //   return {
                    //     ...prevTagValues,
                    //     [value]: isChecked,
                    //   };
                    // });
                  }}
                  isChecked={filters.communities.includes(item)}
                >
                  {item}
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
                    // setTweetTypeValues(prevTweetTypeValues => {
                    //   return {
                    //     ...prevTweetTypeValues,
                    //     [value]: isChecked,
                    //   };
                    // });
                  }}
                  // @ts-ignore
                  isChecked={filters.tweetTypes.includes(value)}
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
                    // setTagValues(prevAccountTypeValues => {
                    //   return {
                    //     ...prevAccountTypeValues,
                    //     [value]: isChecked,
                    //   };
                    // });
                  }}
                  isChecked={filters.accountTypes.includes(value)}
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
