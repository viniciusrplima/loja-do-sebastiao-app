import * as Google from 'expo-google-app-auth';

export default {

    signInWithGoogleAsync: async () => {
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
    }
}