import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { styles } from '@/constants/styles';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    if (email === 'test@example.com' && password === 'test') {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Text 
        entering={FadeInDown.duration(500)}
        style={styles.title}
      >
        Welcome Back
      </Animated.Text>

      <Animated.View entering={FadeInDown.delay(200)} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300)} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400)}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500)} style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.linkText}>Click here to Register</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}