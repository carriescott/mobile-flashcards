import React, {Component} from 'react';
import {Text, StyleSheet, View, Image,} from 'react-native';
import {purple, white, softblue} from '../utils/colors';
import {connect} from "react-redux";
import { Ionicons, FontAwesome } from "@expo/vector-icons";


class Deck extends Component {

    render() {
        const id = this.props.id;
        const deck = this.props.decks[id];
        const title = deck.title;
        const cards = deck.questions.length;

        return (
            <View style={[styles.center, styles.border, styles.marginBottom20, styles.row, styles.padding16]}>
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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    border: {
        borderWidth: 1,
        borderColor: softblue,
        backgroundColor: softblue,
        borderRadius: 4,
        width: 300,
        elevation: 3,
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1,
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
        // flex: 1,
        // justifyContent: 'center',
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
    padding16: {
        padding: 16
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