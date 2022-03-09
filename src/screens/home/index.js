import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import StoryComponent from '../../components/Story';

import {
  FetchTopStoriesID,
  FetchItem,
  SetStory,
  SetTopStoriesID,
} from '../../actions/AppAction';
import Color from '../../common/Color';
import {isEmpty} from '../../common';

let pageIndex = 0;
let loadingMsg = 'Loading top stories....';
let errorMsg = 'Error getting stories !!!';

function Home(props) {
  const {navigation} = props;
  const {isInternetReachable, topStoriesIDArray, topStoriesArray} = useSelector(
    state => state.AppReducer,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingMessage, setFetchingMessage] = useState(loadingMsg);

  useEffect(() => {
    fetchTopStories();
  }, []);

  const fetchTopStories = async () => {
    if (!isInternetReachable) return;
    setRefreshing(true);
    setFetchingMessage(loadingMsg);
    FetchTopStoriesID()
      .then(async data => {
        pageIndex = 0;
        if (isEmpty(data)) return;
        SetTopStoriesID(data);
        fetchStory(data);
      })
      .catch(err => {
        setRefreshing(false);
        setFetchingMessage(errorMsg);
      });
  };

  const fetchStory = async (idArray = topStoriesIDArray) => {
    if (pageIndex == 500 || !isInternetReachable) return;
    setFetchingMessage(loadingMsg);
    const tempIDArray = idArray.slice(pageIndex, pageIndex + 20);
    pageIndex += 20;
    Promise.all([...tempIDArray.map(id => FetchItem(id))])
      .then(data => {
        if (isEmpty(data)) return;
        setRefreshing(false);
        SetStory(data);
      })
      .catch(err => {
        setRefreshing(false);
        setFetchingMessage(errorMsg);
      });
  };

  const onNavigate = (idArray, storyItem) => {
    navigation.navigate('Comment', {idArray, storyItem});
  };

  return (
    <>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          {topStoriesArray?.length > 0 ? (
            <FlatList
              data={topStoriesArray}
              renderItem={({item, index}) =>
                StoryComponent(item, index, onNavigate)
              }
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
                  ? fetchingMessage
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
});
