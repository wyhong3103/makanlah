import {
  Heading,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Image,
  Icon,
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Select,
  ModalFooter,
} from '@chakra-ui/react';
import { PrimaryButton, SecondaryButton, PrimaryText, SecondaryText } from '@/components';
import { feedback } from '@/assets';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { foodDetails } from '@/data';

const FeedbackModal = ({initialRef, isOpen, onClose, onClick, selectedFeedback}) => {
  return (
    <Modal size='xs' initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent height='260px' width='16rem'>
        <VStack width={'100%'}>
          <ModalHeader pb={'5px'}>
            <Box>
              <VStack mt={5}>
                <Image height={'50px'} src={feedback} alt='feedback logo' />
                <SecondaryText fontWeight={'bold'} fontSize='md'>
                  Help us Improve!
                </SecondaryText>
              </VStack>
            </Box>
          </ModalHeader>
          <ModalCloseButton
            sx={{
              fontSize: 'sm',
            }}
          />
          <VStack width={'100%'}>
            <ModalBody py={0} width={'100%'}>
              <FormControl>
                <FormLabel>
                  <SecondaryText width={'100%'} fontSize='sm'>
                    What was the correct result?
                  </SecondaryText>
                </FormLabel>
                <Select
                  defaultValue=''
                  bg={'primary.2'}
                  color={'neutral.1'}
                  icon={<TriangleDownIcon width='10px' />}
                  borderRadius={10}
                  fontSize='sm'
                  onChange={(e) => {
                    if (e.target.value.length)
                      selectedFeedback.current = e.target.value;
                  }}
                >
                  <option value='' disabled hidden>
                    <SecondaryText>Select an option</SecondaryText>
                  </option>
                  {foodDetails.map((food) => (
                    <option key={food?.name} value={food?.id}>
                      <SecondaryText>{food?.name}</SecondaryText>
                    </option>
                  ))}
                  <option value={'none'}>
                    <SecondaryText>None of the above</SecondaryText>
                  </option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter pt={'3px'} w='100%'>
              <PrimaryButton borderRadius={10} width={'100%'} onClick={onClick}>
                <SecondaryText fontSize='sm'>Submit</SecondaryText>
              </PrimaryButton>
            </ModalFooter>
          </VStack>
        </VStack>
      </ModalContent>
    </Modal>
  )
}

export default FeedbackModal;
