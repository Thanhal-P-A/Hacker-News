import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';

import {FetchTopStoriesID, FetchItem, SetStory} from '../../actions/AppAction';
import {isEmpty} from '../../common';
import Color from '../../common/Color';

let pageIndex = 0;

function Home(props) {
  const {navigation} = props;
  const {isInternetReachable, topStoriesIDArray, topStoriesArray} = useSelector(
    state => state.AppReducer,
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    isInternetReachable && fetchTopStories();
  }, []);

  const fetchTopStories = () => {
    if (!isInternetReachable) return;
    setRefreshing(true);
    FetchTopStoriesID()
      .then(res => {
        pageIndex = 0;
        fetchStory(res);
      })
      .catch(err => {
        __DEV__ && console.log('fetch top story id error : ', err);
        setRefreshing(false);
      });
  };

  const fetchStory = (idArray = topStoriesIDArray) => {
    if (pageIndex == 500 || !isInternetReachable) return;
    const tempIDArray = idArray.slice(pageIndex, pageIndex + 20);
    pageIndex += 20;
    Promise.all([...tempIDArray.map(id => FetchItem(id))])
      .then(data => {
        setRefreshing(false);
        SetStory(data);
      })
      .catch(err => {
        __DEV__ && console.log('fetch story item error : ', err);
        setRefreshing(false);
      });
  };

  const onNavigate = (idArray, renderStory) => {
    navigation.navigate('Comment', {idArray, renderStory: () => renderStory()});
  };

  const renderStory = (item, index) => {
    const {by, descendants, kids, score, time, title, url} = item;
    const haveComments = !isEmpty(descendants) && descendants > 0;
    const canOpenURL = !isEmpty(url) && Linking.canOpenURL(url);
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.textGrey}>
          {isEmpty(index) ? ' ▲ ' : `${index + 1}. ▲ `}
        </Text>
        <View style={{width: '90%'}}>
          <TouchableOpacity
            disabled={!canOpenURL}
            onPress={() => Linking.openURL(url)}>
            <Text style={styles.textBlack}>
              {title}
              <Text style={styles.textDetails}>{` (${
                url?.split('/')[2]
              }) `}</Text>
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textDetails}>
              {`${score} points by ${by} ${moment(time * 1000).fromNow()}`}
            </Text>
            {haveComments && (
              <TouchableOpacity
                onPress={() => onNavigate(kids, () => renderStory(item))}>
                <Text style={styles.textDetails}>
                  {' | ' + descendants + ' Comments'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          {topStoriesArray?.length > 0 ? (
            <FlatList
              data={topStoriesArray}
              renderItem={({item, index}) => renderStory(item, index)}
              keyExtractor={(item, index) => item.id + index.toString()}
              initialNumToRender={20}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => fetchTopStories()}
                />
              }
              ListFooterComponent={() =>
                pageIndex < 500 && (
                  <ActivityIndicator color={Color.Primary} size={'large'} />
                )
              }
              onEndReached={() => fetchStory()}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.textBlack}>
                {isInternetReachable
                  ? 'Loading top stories....'
                  : 'Please check your internet connection and retry'}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

export default Home;

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
  textBlack: {
    color: Color.Black,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: Color.White,
  },
  textGrey: {
    color: Color.Grey,
  },
  textDetails: {
    color: Color.Grey,
    fontSize: 12,
  },
});
