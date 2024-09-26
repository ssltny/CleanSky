import { SafeAreaView, StatusBar, View, Text, TextInput, Button, ActivityIndicator, Modal, StyleSheet } from "react-native";

import React, { useContext, useState }  from "react";
import { ThemeContext }                 from "../../App";
import { bsky_login }                   from "../bsky_wrapper";
import NetInfo                          from "@react-native-community/netinfo";

export function LoginScreen ({ navigation }) {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    const [service,     setService  ]   = useState("https://bsky.social")
    const [handle,      setHandle   ]   = useState("")
    const [password,    setPassword ]   = useState("")

    const [isButtonDisabled,            setIsButtonDisabled             ] = useState(false)
    const [activityIndicatorVisibility, setActivityIndicatorVisibility  ] = useState(false)
    const [errorMessage,                setErrorMessage                 ] = useState("")

    const [isNetworkOffline, setIsNetworkOffline] = useState(false)

    const connectionTest = async () => {
        let res = NetInfo.fetch().then(networkState => {
            setIsNetworkOffline(!(networkState.isConnected && networkState.isInternetReachable))
            return(!(networkState.isConnected && networkState.isInternetReachable))
        })
        return res
    }


    return(
        <SafeAreaView style={[styles.centeredView, {backgroundColor: isDarkMode ? "#000" : "#fff"}]}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} translucent backgroundColor="transparent"/>
            <View style={[styles.centeredView]}>
                <Text style={[styles.titleText, {color: isDarkMode ? '#fff' : '#000'}]}>CleanSky</Text>
                <TextInput
                    style={[styles.commonTextInput,{backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}
                    placeholder="Service:"
                    value={service}
                    inlineImageLeft="server_outline"
                    inlineImagePadding={10}
                    onChangeText={(text) => setService(text)}
                />

                <TextInput
                    style={[styles.commonTextInput,{backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}
                    placeholder="Handle:"
                    value={handle}
                    inlineImageLeft="at_outline"
                    inlineImagePadding={10}
                    onChangeText={(text) => setHandle(text)}
                />

                <TextInput
                    style={[styles.commonTextInput,{backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}
                    placeholder="Password:"
                    value={password}
                    inlineImageLeft="key_outline"
                    inlineImagePadding={10}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />

                <View style={styles.buttonView}>
                    <Button
                        title="Login"
                        disabled={isButtonDisabled}
                        onPress={async () => {
                            if ((handle.length <= 0) || (password.length <= 0)) {
                                setErrorMessage("handle or password missing")
                            } else {
                                setActivityIndicatorVisibility(true)
                                setIsButtonDisabled(true)
                                setErrorMessage("")
                                setTimeout(async () => {
                                    let res = await connectionTest();
                                    if (!res) {
                                        let response = await bsky_login({service: service, handle: handle, password: password});
                                        if (response) {
                                        navigation.navigate("Cleaner")
                                        } else {
                                        setErrorMessage("handle or password is wrong.")
                                        }
                                    }
                                setActivityIndicatorVisibility(false)
                                setIsButtonDisabled(false)
                                }, 1)
                            }

                        }}
                    />
                </View>
            <ActivityIndicator size="small" animating={activityIndicatorVisibility} />
            <Text style={[{color: isDarkMode ? '#fff':'#000'}, {marginTop: 10} ]}>{errorMessage}</Text>
            </View>
            <Modal visible={isNetworkOffline} transparent={true} statusBarTranslucent={true}>
                <View style={styles.parentModelView}>
                    <View style={styles.childModelView}>
                        <Text style={{color: "#000", fontSize: 18, fontWeight: "bold"}}>Connection Error</Text>
                        <Text style={{color: "#555", textAlign: "center", marginBottom: 8}}>Oops! Looks like your device is not connected to the Internet.</Text>
                        <Button
                            title="Try again!"
                            onPress={() => {
                                setIsNetworkOffline(false)
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    parentModelView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#222d",
    },

    childModelView: {
        padding: 16,
        height: "20%",
        width: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },

    titleText: {
        marginBottom: 16,
        width: 300,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    commonTextInput: {
        backgroundColor: "#ddd",
        color: "#000",
        paddingVertical: 0,
        paddingLeft: 16,
        width: 300,
        height: 36,
        borderRadius: 8,
        marginBottom: 16,
    },

    buttonView: {
        alignSelf: "flex-end",
        width: 100,
        height: 36,
        padding: 0,
        borderWidth: 0,
        borderRadius: 8,
        overflow: "hidden",  
    },
});
