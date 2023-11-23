import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, RefreshControl, Image, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  Button,
  useTheme,
  Dialog,
  Portal,
  Text,
  Avatar,
} from 'react-native-paper';
import ChatInput from './ChatInput';
import Message from './Message';
import {
  deleteselectedMessageIds,
  isConfirmDialogVisibleHandler,
  messagesHandler,
} from '../../../../redux/reducers/chat/chatSlice';

const MessagesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const listRef = useRef();
  const [newMessage, setNewMessage] = useState('');

  const messagesFromRedux = useSelector(state => state.chat?.messages);

  const handleAddNewMessage = () => {
    setNewMessage('');
    const a = {
      _id: Math.floor(Math.random() * 100) + 1,
      content: newMessage,
      addedBy: {
        _id: '123',
      },
      createdAd: new Date(),
    };

    dispatch(
      messagesHandler([
        ...messagesFromRedux,
        {
          _id: Math.floor(Math.random() * 100) + 1,
          content: newMessage,
          addedBy: {
            _id: '1',
          },
          createdAd: new Date(),
        },
      ]),
    );
  };

  // delete message dialog
  const isConfirmDialogVisible = useSelector(
    state => state.chat?.isConfirmDialogVisible,
  );
  const selectedMessageIds = useSelector(
    state => state.chat?.selectedMessageIds,
  );
  const selectedMessages = useSelector(state => state.chat?.selectedMessages);

  const deleteMessgeHandler = () => {
    dispatch(deleteselectedMessageIds());
  };

  return (
    <View style={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <Portal>
          <Dialog
            visible={isConfirmDialogVisible}
            onDismiss={() => isConfirmDialogVisibleHandler(false)}>
            <Dialog.Title>
              Delete {selectedMessageIds?.length} messages
            </Dialog.Title>
            <Dialog.Actions>
              <Button
                onPress={() => dispatch(isConfirmDialogVisibleHandler(false))}>
                cancel
              </Button>
              <Button onPress={deleteMessgeHandler}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {0 ? (
          <View style={{margin: '5%'}}>
            {[1, 2].map((item, index) => (
              <View key={index} style={{marginTop: '3%'}}>
                <SkeletonPlaceholder height="100%" borderRadius={4}>
                  <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center">
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={50}
                      borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item width="100%" marginLeft={20}>
                      <SkeletonPlaceholder.Item width="60%" height={10} />
                      <SkeletonPlaceholder.Item
                        marginTop={7}
                        width="30%"
                        height={8}
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            ))}

            {[1].map((item, index) => (
              <View key={index} style={{marginTop: '3%'}}>
                <SkeletonPlaceholder height="100%" borderRadius={4}>
                  <SkeletonPlaceholder.Item
                    flexDirection="row-reverse"
                    alignItems="center">
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={50}
                      borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item width="100%" marginRight={20}>
                      <SkeletonPlaceholder.Item
                        alignSelf="flex-end"
                        width="60%"
                        height={10}
                      />
                      <SkeletonPlaceholder.Item
                        marginTop={7}
                        width="30%"
                        height={8}
                        alignSelf="flex-end"
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            ))}

            {[1, 2, 3].map((item, index) => (
              <View key={index} style={{marginTop: '3%'}}>
                <SkeletonPlaceholder height="100%" borderRadius={4}>
                  <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center">
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={50}
                      borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item width="100%" marginLeft={20}>
                      <SkeletonPlaceholder.Item width="60%" height={10} />
                      <SkeletonPlaceholder.Item
                        marginTop={7}
                        width="30%"
                        height={8}
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            ))}

            {[1, 2].map((item, index) => (
              <View key={index} style={{marginTop: '3%'}}>
                <SkeletonPlaceholder height="100%" borderRadius={4}>
                  <SkeletonPlaceholder.Item
                    flexDirection="row-reverse"
                    alignItems="center">
                    <SkeletonPlaceholder.Item
                      width={50}
                      height={50}
                      borderRadius={50}
                    />
                    <SkeletonPlaceholder.Item width="100%" marginRight={20}>
                      <SkeletonPlaceholder.Item
                        alignSelf="flex-end"
                        width="60%"
                        height={10}
                      />
                      <SkeletonPlaceholder.Item
                        marginTop={7}
                        width="30%"
                        height={8}
                        alignSelf="flex-end"
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            ))}
          </View>
        ) : (
          <FlatList
            data={messagesFromRedux}
            // keyExtractor={item => item._id}
            estimatedItemSize={150}
            initialNumToRender={10}
            ref={listRef}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '40%',
                }}>
                <Avatar.Icon
                  size={100}
                  icon="message-bulleted-off"
                  style={{backgroundColor: theme.colors.background}}
                />
                <Text style={{marginTop: '2%'}}>No message</Text>
                <Text style={{marginTop: '2%'}}>
                  Send message to start conversation
                </Text>
              </View>
            )}
            disableAutoLayout={true}
            // inverted={messagesFromRedux?.length !== 0 ? true : false}
            renderItem={({item}) => (
              <Message
                item={item}
                // currentLoginUser={{_id:item?.addedBy?._id}}
                currentLoginUser={{_id:1}}
                theme={theme}
              />
            )}
            // refreshControl={
            //   <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            // }
          />
        )}
      </View>

      <ChatInput
        message={newMessage}
        setMessage={setNewMessage}
        handleAddNewMessage={handleAddNewMessage}
      />
    </View>
  );
};

export default MessagesScreen;
