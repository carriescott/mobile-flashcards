import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions/shared';
import Deck from './Deck';

class Decks extends Component {
    state = {
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
            })));
    }

    render() {
        const data = this.props.decks;

        if (!this.state.decksAvailable) {
            return (
                <View style={styles.container}>
                <Text style={styles.font18}>No decks available!</Text>
                    <Text style={styles.font18}>Please create a new deck to start</Text>
                </View>
            );
        } else {
            return (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {Object.values(data).map(deck => {
                        return (
                            <TouchableOpacity
                                key={deck.title}
                                onPress={() =>
                                    this.props.navigation.navigate(
                                        'DeckDetails',
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
        paddingTop: 20,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    font18: {
        fontSize: 18
    }
});


function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)
