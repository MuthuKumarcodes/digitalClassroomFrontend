import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import LogoutButton from '../../../components/LogoutButton';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerRight: () => <LogoutButton />,
        tabBarActiveTintColor: '#0d6efd',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="clockInOut"
        options={{
          title: 'Attendance',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="access-time" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          title: 'Assignments',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="assignment" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bar-chart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="hallTicket"
        options={{
          title: 'Hall Ticket',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="confirmation-number" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}