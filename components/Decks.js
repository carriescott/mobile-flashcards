import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image, ScrollView } from 'react-native';
import {purple, softblue, white} from '../utils/colors';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import {receiveDecks} from '../actions/shared';
import Deck from './Deck';

class Decks extends Component {
    state = {
        ready: false,
        decksAvailable: false
    }

    componentDidMount() {
        const {dispatch} = this.props;
        getDecks()
            // .then((entries) => dispatch(receiveEntries(entries)))
            .then((data) => {
                if (data) {
                    this.setState(() => ({
                        data: data,
                    }));
                }
                dispatch(receiveDecks(data));
            })
            .then(() => this.setState(() => ({
                decksAvailable: true,
                ready: true
            })));
    }

    render() {
        const data = this.props.decks;

        if (!this.state.decksAvailable) {
            return (
                <View style={styles.center}>
                    <Text style={styles.font18}>No decks available</Text>
                    <Text style={styles.font18}>Please create a new deck to start</Text>
                </View>
            );
        } else {
            return (
                <ScrollView contentContainerStyle={[styles.scrollView, styles.paddingBottom20, styles.paddingTop20]}>
                    {Object.values(data).map(deck => {
                        return (
                            <TouchableOpacity
                                key={deck.title}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'DeckInfo',
                                        {
                                            headerTitle: deck.title,
                                            id:deck.title
                                        }
                                        )}
                            >
                                <Deck id={deck.title} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
                )
        }
    }
}

const styles = StyleSheet.create({
    scrollView: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: softblue
    },
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
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
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
    paddingTop20: {
        paddingTop: 20
    },
    paddingBottom20: {
        paddingBottom: 20
    },
    font18: {
        fontSize: 18
    }
});


function mapStateToProps(decks) {
    const availableDecks = JSON.stringify(decks);
    return {
        availableDecks,
        decks
    }
}

export default connect(mapStateToProps)(Decks)
