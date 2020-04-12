import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, TouchableHighlight, TouchableOpacity} from 'react-native';
import {purple, white, softblue, red} from '../utils/colors';
import {connect} from "react-redux";
import { NavigationActions} from 'react-navigation';
import {setLocalNotification, clearLocalNotification} from "../utils/helpers";

class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
        const { id } = navigation.state.params;
        return {
            title: `${id} Quiz`
        };
    };

    state = {
        showAnswer: false,
        answered: 0,
        index: 0,
        correct: 0,
        incorrect:0,
        count: 1,
        finished: false
    }


    showAnswer = () => {
        this.setState((state) => {
            return {
                ...state,
                showAnswer: true
            };
        });
    };

    hideAnswer = () => {
        this.setState((state) => {
            return {
                ...state,
                showAnswer: false
            };
        });
    };

    handleCorrect = () => {
        this.setState((prevState) => {
            return {
                correct: prevState.correct + 1,
                index: prevState.index + 1,
                answered: prevState.answered + 1,
                count: prevState.count + 1,
                showAnswer: false,
            };
        });
    };

    handleIncorrect = () => {
        this.setState((prevState) => {
            return {
                incorrect: prevState.incorrect + 1,
                index: prevState.index + 1,
                answered: prevState.answered + 1,
                count: prevState.count + 1,
                showAnswer: false,
            };
        });
    };


    resetQuiz = () => {
        this.setState(() => (
            {
                showAnswer: false,
                answered: 0,
                index: 0,
                correct: 0,
                incorrect:0,
                count: 1,
                finished: false
            }
            ));
    }

    resetNotification() {
        clearLocalNotification()
            .then(setLocalNotification);
    }

    back = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    }

    render() {
        const id = this.props.id;
        const deck = this.props.decks[id];
        const countTotal = deck.questions.length;
        const i = this.state.index;
        let question;

        const showAnswer = this.state.showAnswer;
        const correct = this.state.correct;
        const incorrect = this.state.incorrect;
        const answered = this.state.answered;
        const count = this.state.count;

        const finished = !(answered < countTotal);

        if (!finished) {
            question = deck.questions[i];
        } else {
            question = {};
            this.resetNotification();
        }
        const score = (correct/countTotal)*100;


        if (finished && deck) {
            return (
                <View style={styles.center}>
                    <View style={styles.center}>
                        {score > 80 ? (
                            <Text style={[styles.font40, styles.marginTop50]}>Congratulations!</Text>
                        ) : (
                            <Text style={[styles.font40, styles.marginTop50]}>Keep Learning!</Text>
                        )
                        }
                        <Text style={[styles.score, styles.marginTop50, styles.marginBottom50]}>{score}%</Text>

                        {correct === 1 ? (
                            <Text style={styles.subText}>You got {correct} answer Correct</Text>
                        ) : (
                            <Text style={styles.subText}>You got {correct} answers Correct</Text>
                        )
                        }

                        {incorrect === 1 ? (
                            <Text style={styles.subText}>You got {incorrect} answer Incorrect</Text>
                        ) : (
                            <Text style={styles.subText}>You got {incorrect} answers Incorrect</Text>
                        )
                        }

                    </View>

                    <View style={styles.row}>
                        <TouchableHighlight
                            style=
                                {Platform.OS === "ios" ?
                                    [styles.iosCorrectBtn, styles.marginTop20]
                                    : [styles.androidCorrectBtn, styles.marginTop20]}
                            onPress={() => this.resetQuiz()}
                        >
                            <Text style={styles.submitBtnText}>Reset Quiz</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style=
                                {Platform.OS === "ios" ?
                                    [styles.iosCorrectBtn, styles.marginTop20]
                                    : [styles.androidCorrectBtn, styles.marginTop20]}
                            onPress={() => this.back()}
                        >
                            <Text style={styles.submitBtnText}>Back to Deck</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        } else if (!finished && deck){
            return (
                <View style={[styles.center, styles.marginTop20]}>
                        <Text style={styles.font18}>{count}/{countTotal} questions</Text>
                        <Text style={[styles.font40, styles.marginTop50]}>{question.question}</Text>
                        {!showAnswer ? (
                            <View style={styles.center}>
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
                            <View style={styles.center}>
                                <Text style={styles.font18}>{question.answer}</Text>
                                <TouchableHighlight
                                    style=
                                        {Platform.OS === "ios" ?
                                            [styles.iosSubmitBtn, styles.marginTop20]
                                            : [styles.androidSubmitBtn, styles.marginTop20]}
                                    onPress={() => this.hideAnswer()}
                                >
                                    <Text style={styles.submitBtnText}>Hide Answer</Text>
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
        } else {
            return (
                <View>
                    <Text>There are no questions in this deck</Text>
                </View>
            )
        }
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
    marginTop50: {
        marginTop: 50
    },
    marginBottom20: {
        marginBottom: 20
    },
    marginBottom50: {
        marginBottom: 50
    },
    font18: {
        fontSize: 18
    },
    font40: {
        fontSize: 40
    },
    score: {
        fontSize: 40,
        fontWeight: '600'
    },
    subText: {
        // color: softblue,
        fontSize: 20,
        padding: 16
    }
});

function mapStateToProps(decks, {navigation}) {
    const { id } = navigation.state.params;

    return {
        id,
        decks
    }
}

export default connect(mapStateToProps)(Quiz)