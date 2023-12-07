import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBhZTSRhThHnPeswmNTVjquiraXIl9iZyc",
    authDomain: "notestodo-project.firebaseapp.com",
    projectId: "notestodo-project",
    storageBucket: "notestodo-project.appspot.com",
    messagingSenderId: "326063895152",
    appId: "1:326063895152:web:84e32ee8d2a3092433bab5",
    measurementId: "G-N07XF79C86"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
