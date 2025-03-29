import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import api from '../../../services/api';

import * as SecureStore from 'expo-secure-store';

const ClockInOutScreen = () => {
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    isClockedIn: false,
    clockInTime: null as Date | null,
    clockOutTime: null as Date | null,
    duration: null as number | null
  });

  // Check current status on mount
  useEffect(() => {
    fetchAttendanceStatus();
  }, []);

  const fetchAttendanceStatus = async () => {
    try {
      const response = await api.get('/attendance/today');
      if (response.data.attendance) {
        setAttendanceData({
          isClockedIn: !!response.data.attendance.clockIn && !response.data.attendance.clockOut,
          clockInTime: response.data.attendance.clockIn || null,
          clockOutTime: response.data.attendance.clockOut || null,
          duration: response.data.attendance.duration || null
        });
      }
    } catch (error) {
      console.log('Error fetching attendance:', error);
    }
  };

  const handleClockAction = async () => {
    try {
      setLoading(true);
      const endpoint = attendanceData.isClockedIn ? '/attendance/clockout' : '/attendance/clockin';
      const response = await api.post(endpoint);
      
      if (response.data.success) {
        await fetchAttendanceStatus(); // Refresh status
        Alert.alert('Success', response.data.message);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        Alert.alert('Notice', error.response.data.message);
      } else {
        Alert.alert('Error', 'Failed to complete action');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        Status: {attendanceData.isClockedIn ? 'Clocked In' : 'Clocked Out'}
      </Text>
      
      {attendanceData.clockInTime && (
        <Text style={styles.timeText}>
          Clock In: {new Date(attendanceData.clockInTime).toLocaleTimeString()}
        </Text>
      )}
      
      {attendanceData.clockOutTime && (
        <Text style={styles.timeText}>
          Clock Out: {new Date(attendanceData.clockOutTime).toLocaleTimeString()}
        </Text>
      )}
      
      {attendanceData.duration && (
        <Text style={styles.timeText}>
          Duration: {attendanceData.duration} minutes
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          attendanceData.isClockedIn ? styles.clockOutButton : styles.clockInButton,
          loading && styles.disabledButton
        ]}
        onPress={handleClockAction}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 
           attendanceData.isClockedIn ? 'Clock Out' : 'Clock In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  clockInButton: {
    backgroundColor: '#4CAF50',
  },
  clockOutButton: {
    backgroundColor: '#F44336',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusText: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
});

export default ClockInOutScreen;