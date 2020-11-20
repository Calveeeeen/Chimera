import * as firebase from 'firebase';

const firebaseConfig = {
 apiKey: "AIzaSyD1dUvxgcmztDxQ04pvYLhj2G2k4smM9sQ",
 authDomain: "chimera-df4b1.firebaseapp.com",
 databaseURL: "https://chimera-df4b1.firebaseio.com",
 projectId: "chimera-df4b1",
 storageBucket: "chimera-df4b1.appspot.com",
 messagingSenderId: "34877348301",
 appId: "1:34877348301:web:aec3d9b1c89e1739a4cc84"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
