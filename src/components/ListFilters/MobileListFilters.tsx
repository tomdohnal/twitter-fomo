import React, { useState, memo, useEffect } from 'react';
import {
  Box,
  Button,
  useTheme,
  Text,
  Stack,
  Wrap,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
} from '@chakra-ui/core';
import { CloseIcon } from '@chakra-ui/icons';
import * as R from 'ramda';
import CheckboxButton from '../CheckboxButton';
import GroupedRadioButtons from '../GroupedRadioButtons';
import {
  INITIAL_FILTERS,
  createGetNewFilters,
  PERIOD_ITEMS,
  COMMUNITY_ITEMS,
  TWEET_TYPE_ITEMS,
  ACCOUNT_TYPE_ITEMS,
} from './common';
import { Filters } from '../../filters';
import { CONTAINER_PX } from '../Container';

const FilterOverviewItem: React.FC<{
  title: string;
  isActive: boolean;
  onClick: () => void;
  onRemoveClick: () => void;
}> = ({ isActive, title, onClick, onRemoveClick }) => {
  return (
    <Flex pr={2} _last={CONTAINER_PX}>
      <Button _hover={{}} size="sm" variant={isActive ? 'solid' : 'solidLight'} onClick={onClick}>
        {title}
      </Button>
      {isActive && (
        <IconButton
          _hover={{}}
          borderLeft="1px solid"
          borderLeftColor="primaryPalette.400"
          icon={<CloseIcon h="10px" />}
          size="sm"
          variant={isActive ? 'solid' : 'solidLight'}
          borderRadius="none"
          onClick={onRemoveClick}
        />
      )}
    </Flex>
  );
};

const FilterOverview: React.FC<{ setActiveItem(key: keyof Filters): void } & Props> = ({
  filters,
  setActiveItem,
  setFilters,
}) => {
  const theme = useTheme();

  const createResetClickHandler = (key: keyof Filters) => () => {
    setFilters(filters => ({ ...filters, [key]: INITIAL_FILTERS[key] }));
  };

  const items = [
    {
      title: 'Period',
      isActive: !R.equals(filters.period, INITIAL_FILTERS.period),
      onClick() {
        setActiveItem('period');
      },
      onRemoveClick: createResetClickHandler('period'),
    },
    {
      title: 'Tags',
      isActive: !R.equals(filters.communities, INITIAL_FILTERS.communities),
      onClick() {
        setActiveItem('communities');
      },
      onRemoveClick: createResetClickHandler('communities'),
    },
    {
      title: 'Tweet Types',
      isActive: !R.equals(filters.tweetTypes, INITIAL_FILTERS.tweetTypes),
      onClick() {
        setActiveItem('tweetTypes');
      },
      onRemoveClick: createResetClickHandler('tweetTypes'),
    },
    {
      title: 'Account Types',
      isActive: !R.equals(filters.accountTypes, INITIAL_FILTERS.accountTypes),
      onClick() {
        setActiveItem('accountTypes');
      },
      onRemoveClick: createResetClickHandler('accountTypes'),
    },
  ];

  const activeItems = items.filter(item => item.isActive);
  const inActiveItems = items.filter(item => !item.isActive);

  return (
    <Stack
      mx={Object.fromEntries(Object.entries(CONTAINER_PX).map(([key, value]) => [key, -value]))}
      px={CONTAINER_PX}
      py={4}
      spacing={0}
      background="white"
      direction="row"
      overflowX="scroll"
      borderBottom="2px solid"
      borderBottomColor="gray.900"
      boxShadow={`0px 2px 0px ${theme.colors.gray['100']}`}
    >
      {R.map(
        item => (
          <FilterOverviewItem key={item.title} {...item} />
        ),
        activeItems,
      )}
      {R.map(
        item => (
          <FilterOverviewItem key={item.title} {...item} />
        ),
        inActiveItems,
      )}
    </Stack>
  );
};

interface Props {
  filters: Filters;
  setFilters(filters: Filters): void;
}

const ListFilters: React.FC<Props> = memo(({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [activeItem, setActiveItem] = useState<keyof Filters | null>(null);

  const getNewFilters = createGetNewFilters(localFilters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const FILTER_ITEMS = {
    period: {
      title: 'Period',
      content: (
        <Box>
          <GroupedRadioButtons
            value={localFilters.period}
            setValue={(value: string) => {
              setLocalFilters(getNewFilters({ name: 'period', value }));
            }}
            items={PERIOD_ITEMS}
            variant="full"
          />
        </Box>
      ),
    },
    communities: {
      title: 'Tags',
      content: (
        <VStack>
          {COMMUNITY_ITEMS.map(value => {
            return (
              <CheckboxButton
                key={value}
                onCheck={() => {
                  setLocalFilters(getNewFilters({ name: 'communities', value }));
                }}
                isChecked={localFilters.communities.includes(value)}
                variant="full"
              >
                <Text mx="auto" pr={8}>
                  {value}
                </Text>
              </CheckboxButton>
            );
          })}
        </VStack>
      ),
    },
    tweetTypes: {
      title: 'Tweet Types',
      content: (
        <VStack>
          {TWEET_TYPE_ITEMS.map(({ label, value }) => {
            return (
              <CheckboxButton
                key={value}
                onCheck={() => {
                  setLocalFilters(getNewFilters({ name: 'tweetTypes', value }));
                }}
                isChecked={localFilters.tweetTypes.includes(value)}
                variant="full"
              >
                <Text mx="auto" pr={8}>
                  {label}
                </Text>
              </CheckboxButton>
            );
          })}
        </VStack>
      ),
    },
    accountTypes: {
      title: 'Account Types',
      content: (
        <VStack>
          {ACCOUNT_TYPE_ITEMS.map(({ label, value }) => {
            return (
              <CheckboxButton
                key={value}
                onCheck={() => {
                  setLocalFilters(getNewFilters({ name: 'accountTypes', value }));
                }}
                isChecked={localFilters.accountTypes.includes(value)}
                variant="full"
              >
                <Text mx="auto" pr={8}>
                  {label}
                </Text>
              </CheckboxButton>
            );
          })}
        </VStack>
      ),
    },
  };

  const currentFilterItem = activeItem ? FILTER_ITEMS[activeItem] : { title: '', content: '' };

  return (
    <>
      <FilterOverview filters={filters} setFilters={setFilters} setActiveItem={setActiveItem} />
      <Modal
        isOpen={!!activeItem}
        onClose={() => {
          setActiveItem(null);
        }}
      >
        <ModalOverlay>
          <ModalContent
            borderTop="2px solid"
            borderTopColor="gray.900"
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            width="100vw"
            maxW="100vw"
            mb={0}
            borderRadius="none"
          >
            <ModalHeader>{currentFilterItem.title}</ModalHeader>
            <ModalCloseButton _focus={{}} />
            <ModalBody>{currentFilterItem.content}</ModalBody>

            <ModalFooter>
              <Button
                width="100%"
                onClick={() => {
                  setFilters(localFilters);
                  setActiveItem(null);
                }}
              >
                Apply
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
});

export default ListFilters;
