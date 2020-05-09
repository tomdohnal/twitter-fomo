import { Box, Button, Flex, Heading, Stack, Text, useTheme, Wrap, WrapItem } from '@chakra-ui/core';
import * as R from 'ramda';
import React from 'react';
import { animated, useTransition } from 'react-spring';
import { Filters } from '../../filters';
import * as gtag from '../../gtag';
import CheckboxButton from '../CheckboxButton';
import GroupedRadioButtons from '../GroupedRadioButtons';
import {
  ACCOUNT_TYPE_ITEMS,
  COMMUNITY_ITEMS,
  createGetNewFilters,
  INITIAL_FILTERS,
  PERIOD_ITEMS,
  Props,
  TWEET_TYPE_ITEMS,
} from './common';

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
    (style: any, item: boolean) =>
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
    (style: any, item: boolean) =>
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
              gtag.event({ category: 'Filters', action: 'period_click', label: value });

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
            {COMMUNITY_ITEMS.map((value) => {
              return (
                <WrapItem key={value}>
                  <CheckboxButton
                    key={value}
                    onCheck={() => {
                      gtag.event({ category: 'Filters', action: 'community_click', label: value });

                      setFilters(getNewFilters({ name: 'communities', value }));
                    }}
                    isChecked={filters.communities.includes(value)}
                  >
                    {value}
                  </CheckboxButton>
                </WrapItem>
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
                <WrapItem key={value}>
                  <CheckboxButton
                    onCheck={() => {
                      gtag.event({ category: 'Filters', action: 'tweet_type_click', label: value });

                      setFilters(getNewFilters({ name: 'tweetTypes', value }));
                    }}
                    isChecked={filters.tweetTypes.includes(value)}
                  >
                    {label}
                  </CheckboxButton>
                </WrapItem>
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
                <WrapItem key={value}>
                  <CheckboxButton
                    onCheck={() => {
                      gtag.event({
                        category: 'Filters',
                        action: 'account_type_click',
                        label: value,
                      });

                      setFilters(getNewFilters({ name: 'accountTypes', value }));
                    }}
                    isChecked={filters.accountTypes.includes(value)}
                  >
                    {label}
                  </CheckboxButton>
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      </Stack>
    </Box>
  );
};

export default DesktopListFilters;
