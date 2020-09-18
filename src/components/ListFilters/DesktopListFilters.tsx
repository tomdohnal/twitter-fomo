import React, { useState } from 'react';
import { Box, Heading, Input, Button, useTheme, Text, Stack, Wrap, Flex } from '@chakra-ui/core';
import * as R from 'ramda';
import { useTransition, animated } from 'react-spring';
import CheckboxButton from '../CheckboxButton';
import GroupedRadioButtons from '../GroupedRadioButtons';
import {
  Props,
  createGetNewFilters,
  PERIOD_ITEMS,
  COMMUNITY_ITEMS,
  TWEET_TYPE_ITEMS,
  ACCOUNT_TYPE_ITEMS,
  INITIAL_FILTERS,
} from './common';
import { Filters } from '../../Filters';

const FormFieldLabel: React.FC = ({ children }) => {
  return (
    <Text textTransform="lowercase" mb={1}>
      {children}
    </Text>
  );
};

const ClearFilterButton: React.FC<{ isActive: boolean; onClick: () => void }> = ({
  isActive,
  onClick,
}) => {
  const transition = useTransition(isActive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    to: { opacity: 0 },
  });

  const AnimatedButton = animated(Button);

  return transition(
    (style, item) =>
      item && (
        <AnimatedButton
          onClick={onClick}
          display="inline-flex"
          alignItems="flex-end"
          variant="text"
          fontSize="sm"
          color="textSecondary"
          textTransform="lowercase"
          mb={1}
          style={style}
        >
          <Text>clear</Text>
        </AnimatedButton>
      ),
  );
};

const GlobalClearFilterButton: React.FC<{ isActive: boolean; onClick: () => void }> = ({
  isActive,
  onClick,
}) => {
  const transition = useTransition(isActive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    to: { opacity: 0 },
  });

  const AnimatedButton = animated(Button);

  return transition(
    (style, item) =>
      item && (
        <AnimatedButton
          onClick={onClick}
          display="inline-flex"
          alignItems="flex-end"
          variant="text"
          fontSize="sm"
          color="textSecondary"
          textTransform="lowercase"
          mb={1}
          style={style}
        >
          <Text>Clear all</Text>
        </AnimatedButton>
      ),
  );
};

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  // @ts-ignore
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

const DesktopListFilters: React.FC<Props> = ({ filters, setFilters }) => {
  const getNewFilters = createGetNewFilters(filters);

  const theme = useTheme();

  const createResetClickHandler = (key: keyof Filters) => () => {
    setFilters((filters: Filters) => ({ ...filters, [key]: INITIAL_FILTERS[key] }));
  };

  return (
    <Box
      bgColor="white"
      pb={12}
      px={4}
      border="2px solid"
      borderColor="primary"
      boxShadow={theme.shadows.sm()}
      bottom={{ base: 0, md: 'auto' }}
      left={{ base: 0, md: 'auto' }}
      right={{ base: 0, md: 'auto' }}
    >
      {/* <pre>{JSON.stringify({ filters }, null, 2)}</pre>
      <pre>{JSON.stringify({ filters }, null, 2)}</pre> */}
      {/* <Button
            onClick={() => {
              setFilters(INITIAL_FILTERS);
              setFilters(INITIAL_FILTERS);
            }}
            variant="link"
          >
            reset
          </Button> */}

      <Flex align="baseline" justify="space-between">
        <Heading mt={12} mb={6}>
          Filters
        </Heading>
        <GlobalClearFilterButton
          isActive={!R.equals(INITIAL_FILTERS, filters)}
          onClick={() => setFilters(INITIAL_FILTERS)}
        />
      </Flex>
      <Stack spacing={6}>
        <Box>
          <Flex align="baseline" justify="space-between">
            <FormFieldLabel>Period</FormFieldLabel>
            <ClearFilterButton
              isActive={!R.equals(INITIAL_FILTERS.period, filters.period)}
              onClick={createResetClickHandler('period')}
            />
          </Flex>
          <GroupedRadioButtons
            value={filters.period}
            setValue={(value: string) => {
              setFilters(getNewFilters({ name: 'period', value }));
            }}
            items={PERIOD_ITEMS}
          />
        </Box>
        <Box>
          <Flex align="baseline" justify="space-between">
            <FormFieldLabel>Tags</FormFieldLabel>
            <ClearFilterButton
              isActive={!R.equals(INITIAL_FILTERS.communities, filters.communities)}
              onClick={createResetClickHandler('communities')}
            />
          </Flex>
          <Wrap spacing={3}>
            {COMMUNITY_ITEMS.map(value => {
              return (
                <CheckboxButton
                  key={value}
                  onCheck={() => {
                    setFilters(getNewFilters({ name: 'communities', value }));
                  }}
                  isChecked={filters.communities.includes(value)}
                >
                  {value}
                </CheckboxButton>
              );
            })}
          </Wrap>
        </Box>
        <Box>
          <Flex align="baseline" justify="space-between">
            <FormFieldLabel>Tweet Types</FormFieldLabel>
            <ClearFilterButton
              isActive={!R.equals(INITIAL_FILTERS.tweetTypes, filters.tweetTypes)}
              onClick={createResetClickHandler('tweetTypes')}
            />
          </Flex>
          <Wrap spacing={3}>
            {TWEET_TYPE_ITEMS.map(({ label, value }) => {
              return (
                <CheckboxButton
                  key={value}
                  onCheck={() => {
                    setFilters(getNewFilters({ name: 'tweetTypes', value }));
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
          <Flex align="baseline" justify="space-between">
            <FormFieldLabel>Account Types</FormFieldLabel>
            <ClearFilterButton
              isActive={!R.equals(INITIAL_FILTERS.accountTypes, filters.accountTypes)}
              onClick={createResetClickHandler('accountTypes')}
            />
          </Flex>
          <Wrap spacing={3}>
            {ACCOUNT_TYPE_ITEMS.map(({ label, value }) => {
              return (
                <CheckboxButton
                  key={value}
                  onCheck={() => {
                    setFilters(getNewFilters({ name: 'accountTypes', value }));
                  }}
                  // @ts-ignore
                  isChecked={filters.accountTypes.includes(value)}
                >
                  {label}
                </CheckboxButton>
              );
            })}
          </Wrap>
        </Box>
      </Stack>
      <Box mt={{ md: 24 }}>
        <NewsletterForm />
      </Box>
    </Box>
  );
};

export default DesktopListFilters;
