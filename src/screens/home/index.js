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
} from 'react-native';
import {useSelector} from 'react-redux';
import moment from 'moment';

import {FetchTopStoriesID, FetchItem, SetStory} from '../../actions/AppAction';
import Color from '../../common/Color';

function Home(props) {
  const {navigation} = props;
  const {isInternetReachable, topStoriesIDArray, topStoriesArray} = useSelector(
    state => state.AppReducer,
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    isInternetReachable && fetchTopStories();
  }, []);

  const fetchTopStories = () => {
    if (!isInternetReachable) return;
    setRefreshing(true);
    FetchTopStoriesID()
      .then(res => {
        setPageIndex(0);
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
    setPageIndex(prev => prev + 20);
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

  const onNavigate = idArray => {
    navigation.navigate('Comment', {idArray});
  };

  const renderStory = (item, index) => {
    const {by, kids, score, time, title, url} = item;
    return (
      <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
        <Text style={styles.textGrey}>{`${index + 1}. ▲ `}</Text>
        <TouchableOpacity
          style={{width: '90%'}}
          onPress={() => onNavigate(kids)}>
          <Text style={styles.textBlack}>
            {title}
            <Text style={styles.textDetails}>{` (${
              url?.split('/')[2]
            }) `}</Text>
          </Text>

          <Text style={styles.textDetails}>
            {`${score} points by ${by} ${moment(time * 1000).fromNow()} | ${
              kids ? kids.length : 0
            } Comments`}
          </Text>
        </TouchableOpacity>
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
  textBlack: {color: Color.Black},
  textGrey: {color: Color.Grey},
  textDetails: {color: Color.Grey, fontSize: 12},
});
