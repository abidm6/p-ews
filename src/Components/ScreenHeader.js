import React from 'react'
import {Header} from "react-native-elements";
import {AuthContext} from "../Provider/AuthProvider";
import * as firebase from 'firebase';


const ScreenHeader = ({props}) => {

return(
    <AuthContext.Consumer>
      {(auth) => (

<Header
            containerStyle={{
                backgroundColor: '#1c1c1c',
            }}
            centerComponent={{ text: "P-ews", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                firebase
                .auth()
                .signOut()
                .then(() => {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                })
                .catch((error) => {
                  alert(error);
                });
              },
            }}
          />    )}
          </AuthContext.Consumer>
)}

export default ScreenHeader