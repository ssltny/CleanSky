
import { useState, useContext, useRef } from "react";
import { View, Button, Text, TextInput, Modal, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from '@react-native-community/checkbox';

import { bsky_clean, bsky_get_handle } from "../bsky_wrapper";
import { ThemeContext } from "../../App";


export function CleanerScreen ({ navigation }) {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
    //setIsDarkMode(true);

    const [posts,               setPosts            ] = useState(false)
    const [reposts,             setReposts          ] = useState(false)
    const [likes,               setLikes            ] = useState(false)
    const [follows,             setFollows          ] = useState(false)
    const [blocks,              setBlocks           ] = useState(false)
    const [mutes,               setMutes            ] = useState(false)
    const [blocklists,          setBlocklists       ] = useState(false)
    const [mutelists,           setMutelists        ] = useState(false)
    const [feeds,               setFeeds            ] = useState(false)
    const [userlists,           setUserlists        ] = useState(false)
    const [unfollowYourself,    setUnfollowYourself ] = useState(false)
    const [unblockYourself,     setUnblockYourself  ] = useState(false)

    const [isActivityAnimatorActive,    setIsActivityAnimatorActive ] = useState(false)
    const [warningVisibility,           setWarningVisibility        ] = useState(false)
    const [message,                     setMessage                  ] = useState("")
    const [handleInput,                 setHandleInput              ] = useState("")

    const [buttonLock,                  setButtonLock               ] = useState(false)

    let handle = bsky_get_handle()

    const scrollViewRef = useRef()

    return(
        <SafeAreaView style={[styles.centeredView, {backgroundColor: isDarkMode ? "#000" : "#fff"}]}>
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.centeredScrollView} showsVerticalScrollIndicator={false}>
                
                <TouchableOpacity onPress={async() => {setPosts(!posts)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Posts</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setPosts(value)}
                            value={posts}
                            disabled={buttonLock}
                        />
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity onPress={async() => {setReposts(!reposts)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Reposts</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setReposts(value)}
                            value={reposts}
                            disabled={buttonLock}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setLikes(!likes)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Likes</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setLikes(value)}
                            value={likes}
                            disabled={buttonLock}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setFollows(!follows)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Follows</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setFollows(value)}
                            value={follows}
                            disabled={buttonLock}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setBlocks(!blocks)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Blocks</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setBlocks(value)}
                            value={blocks}
                            disabled={buttonLock}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setMutes(!mutes)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Mutes</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setMutes(value)}
                            value={mutes}
                            disabled={buttonLock}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setBlocklists(!blocklists)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Blocklists</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setBlocklists(value)}
                            value={blocklists}
                            disabled={buttonLock}
                            />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setMutelists(!mutelists)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Mutelists</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setMutelists(value)}
                            value={mutelists}
                            disabled={buttonLock}
                            />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setFeeds(!feeds)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Feeds</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setFeeds(value)}
                            value={feeds}
                            disabled={buttonLock}
                            />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setUserlists(!userlists)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Userlists</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setUserlists(value)}
                            value={userlists}
                            disabled={buttonLock}
                            />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setUnfollowYourself(!unfollowYourself)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Self-follow</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setUnfollowYourself(value)}
                            value={unfollowYourself}
                            disabled={buttonLock}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {setUnblockYourself(!unblockYourself)}} disabled={buttonLock}>
                    <View style={[styles.checkboxView, {backgroundColor: isDarkMode ? '#fff' : '#ddd'}]}>
                        <Text style={styles.checkboxText}>Self-block</Text>
                        <CheckBox style={styles.checkbox}
                            onValueChange={(value) => setUnblockYourself(value)}
                            value={unblockYourself}
                            disabled={buttonLock}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.buttonView}>
                    <Button
                        title="Clean Records"
                        onPress={ async () => {
                            scrollViewRef.current.scrollToEnd({animated: true})
                            if (posts || reposts || likes || follows || blocks || mutes || blocklists || mutelists || feeds || userlists || unfollowYourself || unblockYourself) {
                                setMessage("")
                                setWarningVisibility(true)
                            } else {
                                setMessage("No Selection !!!")
                            }
                            //setIsDarkMode(!isDarkMode)

                        }}
                        disabled={buttonLock}
                    />
                </View>
                <ActivityIndicator size="small" animating={isActivityAnimatorActive} />
                <Text style={{color: isDarkMode ? "#fff" : "#000"}}>{message}</Text>
            </ScrollView>
            <Modal visible={warningVisibility} transparent={true}>
                <View style={styles.parentModalView}>
                    <View style={styles.childModalView}>
                        <Text style={{color: "red", fontSize: 24, fontWeight: "bold", marginBottom: 8,}}>WARNING</Text>
                        <Text style={{color: "#fff", textAlign: "center", marginBottom: 8, fontSize: 14}}>This process is irreversable. Please enter your handle to proceed.</Text>
                        
                        <TextInput
                            style={styles.textInputHandle}
                            placeholder="Handle:"
                            onChangeText={(text) => setHandleInput(text)}
                            />
                        <Text></Text>
                        <View style={styles.buttonView2}>
                            <Button
                                color="red"
                                style={styles.buttonComp}
                                title="Clean Records"
                                onPress={async () => {
                                    setWarningVisibility(false)
                                    setButtonLock(true)
                                    if (handleInput == handle) {

                                        setIsActivityAnimatorActive(true)
                                        await bsky_clean({
                                            posts:      posts,
                                            reposts:    reposts,
                                            likes:      likes,
                                            follows:    follows,

                                            blocks:     blocks,
                                            mutes:      mutes,
                                            blocklists: blocklists,
                                            mutelists:  mutelists,

                                            feeds:      feeds,
                                            userlists:  userlists,
                                            
                                            unfollowYourself: unfollowYourself,
                                            unblockYourself: unblockYourself
                                        })
                                        setHandleInput("")
                                        setIsActivityAnimatorActive(false)
                                        setMessage("Task is completed.")
                                    } else {
                                        setMessage("Invalid handle confirmation.")
                                    }
                                    setButtonLock(false)
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    centeredScrollView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },

    categoryText: {
        fontSize: 15,
        marginTop: 0,
        marginBottom: 6,
        fontWeight: "bold",
    },

    checkboxView: {
        backgroundColor: "#ddd",
        borderRadius:8,
        marginBottom: 8,
        height: 32,
        width: "90%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    checkboxText: {
        flex: 1,
        marginLeft: "5%",
        fontSize: 13,
        color: "#000",
        fontWeight: "bold"
    },

    checkbox: {
        marginRight: "1%",
    },

    buttonView: {
        alignSelf: "flex-end",
        width: 140,
        height: 36,
        padding: 0,
        borderWidth: 0,
        borderRadius: 8,
        overflow: "hidden",
        marginTop: 8,
    },

    parentModalView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#222d"

    },

    childModalView: {
        justifyContent: "center",
        alignItems: "center",
        height: "45%",
        width: "100%",
        backgroundColor: "#000"
    },

    buttonView2: {
        alignSelf: "center",
        width: 200,
        height: 36,
        borderWidth: 0,
        borderRadius: 8,
        overflow: "hidden",
    },

    textInputHandle: {
        backgroundColor: "#ddd",
        color: "#000",
        paddingVertical: 0,
        paddingLeft: 16,
        width: 300,
        height: 36,
        borderRadius: 8,
    },
})
