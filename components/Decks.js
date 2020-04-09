import React, {Component} from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { purple, white } from '../utils/colors';
import { connect } from 'react-redux';
import { Ionicons } from "@expo/vector-icons";
import { getDecks } from '../utils/api';


class Decks extends Component {
    state = {
        // run: 0,
        // bike: 0,
        // swim: 0,
        // sleep: 0,
        // eat: 0,
        ready: false,
        data: null,
        decksAvailable: false
    }

    componentDidMount() {
        const {dispatch} = this.props


        getDecks()
            // .then((entries) => dispatch(receiveEntries(entries)))
            .then((data) => {
                if (data) {
                   console.log('data', data);
                    this.setState(() => ({
                        data: data,
                        ready: true
                    }))
                }
            })
            // .then(() => this.setState(() => ({
            //     ready: true
            // })))

        // fetchCalendarResults()
        //     .then((entries) => dispatch(receiveEntries(entries)))
        //     // .then(({entries}) => {
        //     //     if (!entries[timeToString()]) {
        //     //         dispatch(addEntry({
        //     //             [timeToString()]: getDailyReminderValue()
        //     //         }))
        //     //     }
        //     // })
        //     .then(() => this.setState(() => ({ready: true})))
    }





    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] + step;

            return {
                ...state,
                [metric]: count > max ? max : count
            };
        });
    };
    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step;

            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
            };
        });
    };
    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }));
    };
    submit = () => {
        const key = timeToString();
        const entry = this.state;

        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }));

        this.toHome();

        submitEntry({ key, entry });

        clearLocalNotification()
            .then(setLocalNotification);
    };
    reset = () => {
        const key = timeToString();
        this.props.dispatch(
            addEntry({
                [key]: getDailyReminderValue()
            }));
        this.toHome()
        removeEntry(key);
    };
    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({key: 'AddEntry'}))
    }


    render() {
        // const deckInfo = getDeckInfo();
        // console.log('deckInfo', deckInfo);
        console.log('state', this.state.ready, this.state.data);

        if (!this.state.decksAvailable) {
            return (
                // <View style={{flex: 1}}>
                <View style={styles.center}>
                    <Image
                        style={[styles.size, styles.marginBottom20, styles.marginTop20]}
                        source={{
                            uri:'https://gravatar.com/avatar/b9106a873e394fa182f827e720b43266?s=200&d=robohash&r=x'
                        }}
                    />
                    {/*<Ionicons*/}
                    {/*    name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}*/}
                    {/*    size={100} />*/}
                    <Text style={styles.font18}>No decks available</Text>
                    <Text style={styles.font18}>Please create a new deck to start</Text>
                </View>
            );
        } else {
            return (
                <Text>Decks</Text>
                )
        }

        // return (
        //     <View style={styles.container}>
        //         <DateHeader date={(new Date()).toLocaleDateString()}/>
        //         <Text>{JSON.stringify(this.state)}</Text>
        //         {Object.keys(metaInfo).map((key) => {
        //             const { getIcon, types, ...rest } = metaInfo[key];
        //             const value = this.state[key];
        //
        //             return (
        //                 <View key={key} style={styles.row}>
        //                     {getIcon()}
        //                     {types === 'slider' ? (
        //                         <UdaciSlider
        //                             value={value}
        //                             onChange={(value) => this.slide(key, value)}
        //                             {...rest}
        //                         />
        //                     ) : (<UdaciStepper
        //                             value={value}
        //                             onIncrement={() => this.increment(key)}
        //                             onDecrement={() => this.decrement(key)}
        //                             {...rest}
        //                         />
        //                     )}
        //                 </View>
        //             );
        //         })}
        //         <SubmitBtn onPress={this.submit} />
        //     </View>
        // );
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
    font18: {
        fontSize: 18
    }
});


// const styles = StyleSheet.compose(styles.center);


function mapStateToProps (state) {
    // const key = timeToString();

    return {
        // alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}


// export default connect(mapStateToProps)(Decks)
export default Decks