import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { Portal, PortalProvider } from './components/Portal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet, { BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useMemo, useRef } from 'react';
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <StatusBar style='auto' />
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarIcon: () => (
                  <Icon name='home' size={20} />
                )
              }} />
            <Tab.Screen
              name="Menu"
              component={Menu}
              options={{
                tabBarIcon: () => (
                  <Icon name='th' size={20} />
                )
              }} />
          </Tab.Navigator>
        </NavigationContainer>
      </PortalProvider >
    </GestureHandlerRootView>
  );
}
const Home = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const openSheet = () =>  sheetRef.current?.expand();
  const closeSheet = () => sheetRef.current?.close();
  const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
  return (
    <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Pressable style={{ padding: 10, backgroundColor: 'dodgerblue', borderRadius: 5 }} onPress={openSheet}>
        <View><Text>Open Sheet</Text></View>
      </Pressable>
      <Portal name='bottomsheet'>
        <BottomSheet
          ref={sheetRef}
          onClose={closeSheet}
          snapPoints={snapPoints}
        >
          <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pressable style={{ padding: 10, backgroundColor: 'dodgerblue', borderRadius: 5 }} onPress={closeSheet}>
              <View><Text>Close Sheet</Text></View>
            </Pressable>
          </View>
        </BottomSheet>
      </Portal>

    </View>
  )

}
const Menu = () => {
  return (
    <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is Menu</Text>
    </View>
  )
}
