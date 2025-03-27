import { Avatar, AvatarBadge, Image, Center } from '@chakra-ui/react';
import { SecondaryText } from '@/components';

export const TopLeaderboardAvatar = ({ avatarBadgeIcon, children, isGold, totalUnlocked, color, ...rest }) => {
  return (
    <Avatar borderWidth="4px" borderStyle={'solid'} bg={'primary.3'} borderColor={color} {...rest}>
      <AvatarBadge border={'0px'} src={avatarBadgeIcon} placement='top-start' left={'-2px'} bottom={'10px'} >
        <Image src={avatarBadgeIcon} />
      </AvatarBadge>
      <AvatarBadge border={'0px'} src={avatarBadgeIcon} placement='bottom-end' bottom={'10px'}>
        <Center bg={color} width={isGold ? '30px' : '25px'} height={isGold ?'30px':'25px'} borderRadius={'100%'}>
          <SecondaryText fontWeight={'bold'} fontSize={isGold ? 'md' : 'xs'}>
            {totalUnlocked}
          </SecondaryText>
        </Center>
      </AvatarBadge>
    </Avatar>
  );
};
