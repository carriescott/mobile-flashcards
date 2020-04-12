import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, TextInput, Button, Image,
    TouchableHighlight, KeyboardAvoidingView, Platform} from 'react-native';
import {purple, white, softblue} from '../utils/colors';
import { addQuestion } from '../actions/shared';
import { addCardToDeck } from '../utils/api';
import { connect } from 'react-redux';

class NewQuestion extends Component {

    static navigationOptions = () => {
        return {
            title: 'New Question'
        };
    };

    state = {
        question: '',
        answer: ''
    }

    submit = () => {
        const key = this.props.id;
        const object = {
            question: this.state.question,
            answer: this.state.answer
        }
        //add question to redux store
        const { dispatch } = this.props;
        dispatch(addQuestion(key, object));
        //update AsyncStorage
        addCardToDeck(key, object);
        //reset state
        this.setState(() => ({question: '', answer: ''}));
    };

    render() {
        const id = this.props.id;

        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.center}>
                <Text style={[styles.font50, styles.marginBottom20]}>Ready to Add a Question?</Text>
                <View style={styles.row}>
                    <TextInput
                        style={[styles.formField, styles.marginBottom20]}
                        placeholder="question"
                        value={this.state.question}
                        onChangeText={(question) =>
                            this.setState({question})}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput
                        style={[styles.formField, styles.marginBottom20]}
                        placeholder="answer"
                        value={this.state.answer}
                        onChangeText={(answer) =>
                            this.setState({answer})}
                    />
                </View>
                <TouchableHighlight
                    style=
                        {Platform.OS === "ios" ?
                            [styles.iosSubmitBtn, styles.marginTop20]
                            : [styles.androidSubmitBtn, styles.marginTop20]}
                    onPress={this.submit}
                    disabled={this.state.question === '' || this.state.answer === ''}
                >
                    <Text style={styles.submitBtnText}>Add</Text>
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
    font18: {
        fontSize: 18
    },
    font50: {
        fontSize: 50
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

function mapStateToProps(decks, {navigation}) {
    const { id } = navigation.state.params;

    return {
        id,
        decks
    }
}

export default connect(mapStateToProps)(NewQuestion)

