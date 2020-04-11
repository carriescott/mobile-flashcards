import React, {Component} from 'react';
import {Text,
    TouchableOpacity,
    StyleSheet,
    View,
    TextInput,
    Button,
    Image,
    TouchableHighlight} from 'react-native';
import TextButton from "./TextButton";
import {purple, white, softblue} from '../utils/colors';
import Decks from "./Decks";
import {addDeck} from "../actions/shared";
import {connect} from "react-redux";
import {saveDeckTitle} from "../utils/api";

class NewDeck extends Component {

    state = {
        title: ''
    }

    submit = () => {
        const key = this.state.title;
        const deck = {
            title: this.state.title,
            questions: []
        }
        //add new deck to redux store
        const { dispatch } = this.props;
        dispatch(addDeck({
            [key]: deck
        }));
        //update AsyncStorage
        saveDeckTitle({
                    [key]: deck
                });
        // reset state
        this.setState(() => ({title:''}));
    };


    render() {
        return (
            <View style={styles.center}>
                <Text style={styles.font18}>Time to Create a New Deck</Text>
                <Image
                    style={[styles.size, styles.marginBottom20, styles.marginTop20]}
                    source={{
                        uri: 'https://gravatar.com/avatar/58838c47bac42924b1327fa69c492402?s=200&d=robohash&r=x'
                    }}
                />
                <TextInput
                    style={styles.formField}
                    placeholder="Title of your new deck"
                    value={this.state.title}
                    onChangeText={(title) =>
                        this.setState({title})}
                />
                <TouchableHighlight
                    style=
                        {Platform.OS === "ios" ?
                            [styles.iosSubmitBtn, styles.marginTop20]
                            : [styles.androidSubmitBtn, styles.marginTop20]}
                    onPress={this.submit}
                    disabled={this.state.title === ''}
                >
                    <Text style={styles.submitBtnText}>Create</Text>
                </TouchableHighlight>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: softblue,
        padding: 10,
        borderRadius: 4,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        minWidth: 100
    },
    androidSubmitBtn: {
        backgroundColor: softblue,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        minWidth: 100,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30
    },
    size: {
        height: 140,
        width: 140
    },
    marginTop20: {
        marginTop: 20
    },
    marginBottom20: {
        marginBottom: 20
    },
    font18: {
        fontSize: 18
    },
    formField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4
        // width: 100
    }
});

function mapStateToProps (decks) {

    return {
        decks
    };
}

export default connect(mapStateToProps)(NewDeck)