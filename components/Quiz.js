import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import {purple, white, softblue, red} from '../utils/colors';
import {connect} from "react-redux";

class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
        const { id } = navigation.state.params;
        return {
            title: `${id} Quiz`
        };
    };

    state = {
        showQuestion: true,
        answered: 0,
        index: 0,
        correct: 0,
        incorrect:0,
        finished: false
    }


    showAnswer = () => {
        this.setState((state) => {
            return {
                ...state,
                showQuestion: false
            };
        });
    };

    showQuestion = () => {
        this.setState((state) => {
            return {
                ...state,
                showQuestion: true
            };
        });
    };

    handleCorrect = () => {
        console.log('correct');
        this.setState((prevState) => {
            return {
                correct: prevState.correct + 1,
                index: prevState.index + 1,
                answered: prevState.answered + 1
            };
        });
    };

    handleIncorrect = () => {
        console.log('incorrect');
        this.setState((prevState) => {
            return {
                incorrect: prevState.incorrect + 1,
                index: prevState.index + 1,
                answered: prevState.answered + 1
            };
        });
    };
    
    render() {
        const id = this.props.id;
        const deck = this.props.decks[id];
        const count = deck.questions.length;
        const title = deck.title;
        const i = this.state.index;
        const question = deck.questions[0];

        const showQuestion = this.state.showQuestion;
        const correct = this.state.correct;
        const incorrect = this.state.incorrect;
        const index = this.state.index;
        const answered = this.state.answered;

        console.log('count', count);

        const finished = (answered < count) ? false : true;
        const finishedTest = !(answered < count);

        if (answered < count) {
            console.log('not finished');
            // this.setFinishedFlag(false);
        } else {
            console.log('finished');
            // const finished = true;
            // this.setFinishedFlag(true);
        }

        // const finished = this.state.finished;
        console.log(showQuestion, correct, incorrect, index, answered, finished);
        console.log('finishedTest', finishedTest);


        return (
            <View style={styles.center}>
                <Text style={styles.font18}>{count} questions</Text>
                {showQuestion? (
                    <View style={styles.center}>
                        <Text style={styles.font18}>{question.question}</Text>
                        <TouchableHighlight
                            style=
                                {Platform.OS === "ios" ?
                                    [styles.iosSubmitBtn, styles.marginTop20]
                                    : [styles.androidSubmitBtn, styles.marginTop20]}
                            onPress={() => this.showAnswer()}
                        >
                            <Text style={styles.submitBtnText}>Show Answer</Text>
                        </TouchableHighlight>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.font18}>{question.answer}</Text>
                        <TouchableHighlight
                            style=
                                {Platform.OS === "ios" ?
                                    [styles.iosSubmitBtn, styles.marginTop20]
                                    : [styles.androidSubmitBtn, styles.marginTop20]}
                            onPress={() => this.showQuestion()}
                        >
                            <Text style={styles.submitBtnText}>Show Question</Text>
                        </TouchableHighlight>
                    </View>
                )}

                <View style={styles.row}>
                    <TouchableHighlight
                        style=
                            {Platform.OS === "ios" ?
                                [styles.iosCorrectBtn, styles.marginTop20]
                                : [styles.androidCorrectBtn, styles.marginTop20]}
                        onPress={() => this.handleCorrect()}
                    >
                        <Text style={styles.submitBtnText}>Correct</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style=
                            {Platform.OS === "ios" ?
                                [styles.iosIncorrectBtn, styles.marginTop20]
                                : [styles.androidIncorrectBtn, styles.marginTop20]}
                        onPress={() => this.handleIncorrect()}
                    >
                        <Text style={styles.submitBtnText}>Incorrect</Text>
                    </TouchableHighlight>
                </View>

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
    iosCorrectBtn: {
        backgroundColor: softblue,
        padding: 10,
        borderRadius: 4,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        minWidth: 100
    },
    androidCorrectBtn: {
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
    iosIncorrectBtn: {
        backgroundColor: red,
        padding: 10,
        borderRadius: 4,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        minWidth: 100
    },
    androidIncorrectBtn: {
        backgroundColor: red,
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
        fontSize: 18,
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
});

function mapStateToProps(decks, {navigation}) {
    const { id } = navigation.state.params;

    return {
        id,
        decks
    }
}

export default connect(mapStateToProps)(Quiz)