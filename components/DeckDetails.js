import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Animated, Platform } from 'react-native';
import { white, softblue } from '../utils/colors';
import { connect } from "react-redux";

class DeckDetails extends Component {

    state = {
        bounceValue: new Animated.Value(1),
        fadeAnim: new Animated.Value(0)
    }

    componentDidMount() {
        const{bounceValue, fadeAnim} = this.state;
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.5}),
            Animated.spring(bounceValue, { toValue: 1, friction: 4})
        ]).start();

        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000
            }
        ).start();
    }

    static navigationOptions = ({ navigation }) => {
        const { headerTitle } = navigation.state.params;
        return {
            title: `${headerTitle}`
        };
    };

    render() {
        let { fadeAnim } = this.state;
        const id = this.props.id;
        const deck = this.props.decks[id];
        const count = deck.questions.length;
        const title = deck.title;
        const bounceValue = this.state.bounceValue;

        return (
            <View style={styles.container}>
                <Animated.Text style={
                    [
                        styles.titleText,
                        styles.marginBottom20,
                        {transform: [{scale: bounceValue}]}
                        ]
                }>{title}</Animated.Text>
                {count > 0 ? (
                        <Animated.View style={{opacity:fadeAnim}}>
                            {count === 1 ? (
                                <Text style={styles.subText}>This deck contains {count} question!</Text>
                                ) :
                                <Text style={styles.subText}>This deck contains {count} questions!</Text>
                            }
                            <TouchableHighlight
                                style=
                                    {Platform.OS === "ios" ?
                                        [styles.iosSubmitBtn, styles.marginTop20]
                                        : [styles.androidSubmitBtn, styles.marginTop20]}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'Quiz',
                                        {
                                            id:deck.title
                                        }
                                    )}
                            >
                                <Text style={styles.submitBtnText}>Start Quiz!</Text>
                            </TouchableHighlight>

                        </Animated.View>
                    ) :

                    <Animated.View style={{opacity:fadeAnim}}>
                        <Text style={styles.subText}>This deck contains {count} questions!</Text>
                    </Animated.View>
                }
                <Animated.View style={{opacity:fadeAnim}}>
                    <TouchableHighlight
                        style=
                            {Platform.OS === "ios" ?
                                [styles.iosSubmitBtn, styles.marginTop20]
                                : [styles.androidSubmitBtn, styles.marginTop20]}
                        onPress={() =>
                            this.props.navigation.navigate(
                                'NewQuestion',
                                {
                                    id:deck.title
                                }
                            )}
                    >
                        <Text style={styles.submitBtnText}>Add Question</Text>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        fontSize: 50
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
        fontSize: 18,
        textAlign: 'center'
    },
    marginTop20: {
        marginTop: 20
    },
    marginBottom20: {
        marginBottom: 20
    },
    subText: {
        fontSize: 20,
        padding: 16
    },
});


function mapStateToProps(decks, {navigation}) {
    const { headerTitle } = navigation.state.params;
    const { id } = navigation.state.params;

    return {
        id,
        headerTitle,
        decks
    }
}

export default connect(mapStateToProps)(DeckDetails)