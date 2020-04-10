import React, {Component} from 'react';
import {Text,
    StyleSheet,
    View,
    Image} from 'react-native';
import {purple, white, softblue} from '../utils/colors';
import {connect} from "react-redux";

class DeckDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        const { headerTitle } = navigation.state.params;

        // const year = entryId.slice(0, 4);
        // const month = entryId.slice(5,7);
        // const day = entryId.slice(8);

        return {
            title: `${headerTitle}`
        };
    };

    render() {
        // const id = this.props.id;
        // const deck = this.props.decks[id];
        // const title = deck.title;
        // const cards = deck.questions.length;

        return (
            <View>
                {/*<Text>{title}</Text>*/}
                {/*<Text>{cards}</Text>*/}
                <Image
                    style={[styles.size, styles.marginBottom20, styles.marginTop20]}
                    source={{
                        uri: 'https://gravatar.com/avatar/58838c47bac42924b1327fa69c492402?s=200&d=robohash&r=x'
                    }}
                />
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
});


function mapStateToProps(decks, {navigation}) {
    const { headerTitle } = navigation.state.params;

    return {
        headerTitle,
        decks
    }
}

export default connect(mapStateToProps)(DeckDetails)