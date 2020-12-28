import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer} from '@react-navigation/native'
import * as React from 'react'
import UserList from "../screens/UserList"
import UserEntriesList from "../screens/UserEntriesList"
import '../constants/Endpoints.ts'
import { TextInput, View } from "react-native";
interface Item {
  firstName: string;
  lastName: string;
  csn: string;
}
export type AppStackParamList = {
  UserList: undefined;
  UserEntriesList: { User: Item };
};

const HomeStack = createStackNavigator<AppStackParamList>();


export const AppNavigator = () =>{

const [value, onChangeText] = React.useState(global.ip);
return(
  <NavigationContainer>
    <HomeStack.Navigator>
      <HomeStack.Screen 
      name="UserList" 
      component={UserList}
      options={
        {title: global.ip,
        headerTitle: () => <View>
        <TextInput 
        onChangeText={text => onChangeText(text)}
        onEndEditing={() => global.ip=value}
        value={value}/>
        </View>,
        headerStyle:{
          backgroundColor: '#197aa7'
        },
        }}/>
      <HomeStack.Screen 
      name="UserEntriesList" 
      component={UserEntriesList}
      options={({route}) => ({title: route.params.User.firstName+" " +route.params.User.lastName,
      headerStyle:{
        backgroundColor: '#197aa7'
      }})}/>
    </HomeStack.Navigator>
  </NavigationContainer>
)}
