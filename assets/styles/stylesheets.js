import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        backgroundColor:"#fff",
        alignItems:"stretch"
    },
    title: {
        fontSize:20,
        color:"#000",
        alignContent: "center"
    },
    list: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 30
    },
    input: {
        margin : 30
    },
    pickerStyle:{
        margin : 30
    },
    sendButton: {
        padding: 30
    },
    contentContainerStyle: {
        paddingBottom: 50
    },
    item: {
        flex: 1, flexDirection: 'column', margin: 20
    },
    itemEmpty: {
        backgroundColor: "transparent"
    }
});