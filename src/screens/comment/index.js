import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
import moment from 'moment';

import {FetchItem} from '../../actions/AppAction';
import {isEmpty} from '../../common';
import Color from '../../common/Color';
import {ScreenWidth} from '../../common/Constants';

const Comment = React.memo(function Comment(props) {
  const {idArray} = props.route?.params;
  const {isInternetReachable} = useSelector(state => state.AppReducer);
  const [pageIndex, setPageIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState([]);

  useEffect(() => {
    isInternetReachable && fetchComments();
  }, []);

  const fetchComments = () => {
    if (
      isEmpty(idArray) ||
      pageIndex >= idArray?.length ||
      !isInternetReachable
    )
      return;
    const tempIDArray = idArray.slice(pageIndex, pageIndex + 10);
    setPageIndex(prev => prev + 10);
    Promise.all([...tempIDArray.map(id => FetchItem(id))]).then(data => {
      setComments(prev => [...prev, ...data]);
      const tempData = data.filter(item => !isEmpty(item.kids));
      Promise.all([...tempData.map(item => FetchItem(item.kids[0]))]).then(
        res => {
          setReply(prev => [...prev, ...res]);
        },
      );
    });
  };

  const renderCommentsAndReply = (item, isComment = true) => {
    const {by, kids, time, text} = item;
    if (isEmpty(text)) return;
    return (
      <View>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text style={styles.textDetails}>{`▲  ${by}  ${moment(
            time * 1000,
          ).fromNow()}`}</Text>
        </View>
        <View style={{marginLeft: 20}}>
          <RenderHTML
            contentWidth={ScreenWidth}
            baseStyle={{color: Color.Black}}
            source={{html: text}}
          />
          {isComment && kids?.length > 0 && renderReply(kids[0])}
        </View>
      </View>
    );
  };

  const renderReply = id => {
    const item = reply.filter(val => id == val.id)[0];
    if (isEmpty(item?.text)) return;
    return renderCommentsAndReply(item, true);
  };

  return (
    <>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          {comments?.length > 0 ? (
            <FlatList
              data={comments}
              extraData={reply}
              renderItem={({item, index}) => renderCommentsAndReply(item)}
              keyExtractor={(item, index) => item.id + index.toString()}
              initialNumToRender={10}
              ListFooterComponent={() =>
                pageIndex < idArray.length && (
                  <ActivityIndicator color={Color.Primary} size={'large'} />
                )
              }
              onEndReached={() => fetchComments()}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.textBlack}>
                {isInternetReachable
                  ? isEmpty(idArray)
                    ? 'No comments'
                    : 'Loading comments....'
                  : 'Please check your internet connection and retry'}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
});

export default Comment;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: Color.Header,
  },
  container: {
    flex: 1,
    backgroundColor: Color.White,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  textBlack: {color: Color.Black},
  textGrey: {color: Color.Grey},
  textDetails: {color: Color.Grey, fontSize: 12},
});
