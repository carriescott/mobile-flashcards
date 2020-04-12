import React, {Component} from 'react';
import {Text,
    StyleSheet,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform} from 'react-native';
import {purple, white, softblue} from '../utils/colors';
import {addDeck} from "../actions/shared";
import {connect} from "react-redux";
import {saveDeckTitle} from "../utils/api";
import {  StackActions, NavigationActions } from 'react-navigation';

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

        //reset stack
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Decks' }),
                NavigationActions.navigate({
                    routeName: 'DeckInfo',
                    params:{
                                headerTitle: key,
                                id: key
                            }
                }),
            ],
        });
        //route based on reset stack
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.center}>
                <Text style={[styles.font50, styles.marginBottom20]}>Let's Create a New Deck!</Text>
                <View style={styles.row}>
                    <TextInput
                        style={[styles.formField, styles.marginBottom20]}
                        placeholder="Title of your new deck"
                        value={this.state.title}
                        onChangeText={(title) =>
                            this.setState({title})}
                    />
                </View>

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
            </KeyboardAvoidingView>
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
    font50: {
        fontSize: 50,
    },
    formField: {
        flex: 1,
        margin: 15,
        height: 48,
        borderColor: softblue,
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
    }
});

function mapStateToProps (decks) {

    return {
        decks
    };
}

export default connect(mapStateToProps)(NewDeck)