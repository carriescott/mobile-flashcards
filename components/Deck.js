import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { white, softblue } from '../utils/colors';
import { connect } from "react-redux";

class Deck extends Component {

    render() {
        const id = this.props.id;
        const deck = this.props.decks[id];
        const title = deck.title;
        const cards = deck.questions.length;

        return (
            <View style={[styles.deck, styles.marginBottom20]}>
                <Text style={[styles.font18, styles.white]}>{title}</Text>
                {cards === 1 ? (
                    <Text style={styles.white}>{cards} question</Text>
                ) :
                    <Text style={styles.white}>{cards} questions</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: softblue,
        backgroundColor: softblue,
        borderRadius: 4,
        width: 300,
        elevation: 3,
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        padding: 16
    },
    marginBottom20: {
        marginBottom: 20
    },
    font18: {
        fontSize: 18
    },
    white: {
        color: white
    }
});


function mapStateToProps(decks) {

    return {
        decks
    }
}

export default connect(mapStateToProps)(Deck)