import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';


import { Text, View } from '../components/Themed';
import { GET_ENTRIES_ENDPOINT } from '../constants/Endpoints';
import { AppStackParamList } from '../navigation';

interface Entry{
  datetime: string;
}

type Props = StackScreenProps<AppStackParamList,'UserEntriesList'>;
export default function UserEntriesList({route}: Props) {
  const [isLoading, setLoading]= React.useState(true);
  const [data, setData] = React.useState([]);
  const { User } = route.params;

  React.useEffect(() => {
    fetch(GET_ENTRIES_ENDPOINT()+User.csn)
    .then((response)=>response.json())
    .then((json)=> setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  },[])

  return (
    <View style={{ flex: 1, padding: 24 , backgroundColor: '#aed4e6'}}>
    {isLoading ? <ActivityIndicator/> : (
      <FlatList 
      data={data}
      keyExtractor={(item)=>item.datetime}
      renderItem={({item}:{item:Entry})=> (
        <View style={styles.container}>
          <Text style={styles.datetime}>{item.datetime}</Text>
        </View>
      )}
      />
    )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#197aa7',
    borderRadius: 6,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datetime: {
    padding: 10,
    fontSize: 20,
    height: 44,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
