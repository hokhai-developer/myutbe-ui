import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC_RFLKfdFhWMwN7bqM3uPoaFGZfZoM_Qg',
  authDomain: 'mytube-ui-b7f38.firebaseapp.com',
  projectId: 'mytube-ui-b7f38',
  storageBucket: 'mytube-ui-b7f38.appspot.com',
  messagingSenderId: '750257688311',
  appId: '1:750257688311:web:de08faabbc4c12aaad4df2',
  measurementId: 'G-VZCJNWEB4S',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
