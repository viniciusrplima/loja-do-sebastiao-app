import * as Google from 'expo-google-app-auth';
//import * as GoogleSignIn from 'expo-google-sign-in';
import { Alert } from 'react-native';

export default {

    signInWithGoogleAsync: async () => {
	// Para executar no expo use o código seguinte
	// Para fazer o build use o código abaixo
        try {
            const result = await Google.logInAsync({
                androidClientId: '780399092682-h2puuv1nteb70pnq7en6jf78kdga8gfq.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
        
            if (result.type === 'success') {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
	}

	/*
	try {
	    await GoogleSignIn.initAsync({
      		clientId: '780399092682-lsjkeo6d5m5eeicumjj0el8vrvrunult.apps.googleusercontent.com'
    	    });
	    await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if(type === 'success') {
                return user.auth.accessToken;
	    }
            else {
                Alert.alert('Error', 'Erro to Sign In');
            }

    	}
	catch(error) {
	    Alert.alert('Error', 'Error to Async Sign In');
	}
	
	return null;*/
    }
}
