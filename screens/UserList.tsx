import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import {AppStackParamList} from '../navigation/index'
import { GET_USERS_ENDPOINT} from '../constants/Endpoints';

//import EditScreenInfo from '../components/EditScreenInfo';
//import { Text, View } from '../components/Themed';
interface Item {
  firstName: string;
  lastName: string;
  csn: string;
}


type Props = StackScreenProps<AppStackParamList,'UserEntriesList'>;

function FlatListBasics({ navigation }: Props) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const pressHandler = (user: Item) => {
    //console.log(csn);
    navigation.navigate('UserEntriesList', {User: user})
  }

  React.useEffect(()=>{
    fetch(GET_USERS_ENDPOINT())
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  },[]);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        
        <FlatList
          data={data}
          keyExtractor={(item) => item.csn}
          renderItem={({ item }: {item: Item}) => (
            <TouchableOpacity style={styles.clickable}
            onPress ={()=> pressHandler(item)}>
              
            <Text style={styles.item}>{item.firstName} {item.lastName}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export default FlatListBasics;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: '#aed4e6'
  },
  clickable: {
   flex: 1,
   backgroundColor: '#197aa7',
   borderRadius: 6,
   margin: 10
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 44,
    textAlign: 'center',
    color: 'black'
  },
});
