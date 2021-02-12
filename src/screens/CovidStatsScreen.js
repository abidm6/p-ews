import React, {useState, useEffect} from "react";
import { SafeAreaView, View, StatusBar, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, Header} from "react-native-elements";
import { PieChart } from "react-native-chart-kit";
import { AuthContext } from "../Provider/AuthProvider"
import PieCard from "../Components/PieCard";
import {getWorldStats} from "../requests/CovidStatsWorld";
import ScreenHeader from "../Components/ScreenHeader";

const CovidStatsScreen = (props) => {
    var data = [];
    const [worldStats, setWorldStats] = useState({});
    const [selectedCountry, setSelectedCountry] = useState("Select a Country");
    const [countryStats, setCountryStats] = useState([]);
    const [selectedCountryStats, setSelectedCountryStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadWorldStats = async()=>{
        setLoading(true);
        const response = await getWorldStats();
        if(response.ok){
            setWorldStats(response.data.Global);
            setCountryStats(response.data.Countries);
            setLoading(false);
        }else{
            alert(response.problem);
        }
    };

    const countryData = [];
    let unselected = {
        label: "Select a Country",
        value: "Select a Country"
    }
    countryData.push(unselected);
    countryStats.forEach((country)=>{
        let data = {
            label: country.Country,
            value: country.Country,
            stats: [
                {
                    name: "New Recovered",
                    value: "New Recovered",
                    population: country.NewRecovered,
                    color: "#7f7fff",
                    legendFontColor: "#FFFFFF",
                    legendFontSize: 12
                },
                {
                    name: "New Confirmed",
                    value: "New Confirmed",
                    population: country.NewConfirmed,
                    color: "#4c4cff",
                    legendFontColor: "#FFFFFF",
                    legendFontSize: 12
                },
                {
                    name: "New Deaths",
                    value: "New Deaths",
                    population: country.NewDeaths,
                    color: "#1919ff",
                    legendFontColor: "#FFFFFF",
                    legendFontSize: 12
                }
            ]
        }
        countryData.push(data);
    })
    const worldData = [
        {
            name: "New Recovered",
            value: "New Recovered",
            population: worldStats.NewRecovered,
            color: "#7f7fff",
            legendFontColor: "#FFFFFF",
            legendFontSize: 12
        },
        {
            name: "New Confirmed",
            value: "New Confirmed",
            population: worldStats.NewConfirmed,
            color: "#4c4cff",
            legendFontColor: "#FFFFFF",
            legendFontSize: 12
        },
        {
            name: "New Deaths",
            value: "New Deaths",
            population: worldStats.NewDeaths,
            color: "#1919ff",
            legendFontColor: "#FFFFFF",
            legendFontSize: 12
        }
    ];

    useEffect(()=>{
        loadWorldStats();
    }, []);
    if(loading){
        return(
            <AuthContext.Consumer>
            {(auth) => (
            
                    <SafeAreaView style={styles.SFViewStyle}>
                        <ScreenHeader props ={props} ></ScreenHeader>
                    </SafeAreaView>
            )}
            </AuthContext.Consumer>
        );
    }else{
        return (
            <AuthContext.Consumer>
            {(auth) => (
                    <SafeAreaView style={styles.SFViewStyle}>
                        <ScreenHeader props ={props} ></ScreenHeader>
                        <Text style={styles.HeaderStyle}>Live World Stats</Text>
                        <PieCard
                            data={worldData}
                        />
                        <View>
                            <DropDownPicker
                                onOpen={() => { setSelectedCountry("Select a Country") }}
                                items={countryData}
                                defaultValue={selectedCountry}
                                multiple={false}
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: '#fafafa' }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                dropDownStyle={{ backgroundColor: '#fafafa' }}
                                onChangeItem={item => {
                                    setSelectedCountry(item.value);
                                    setSelectedCountryStats(item.stats);
                                }}
                            />
                        </View>
                        {selectedCountry !== "Select a Country" ? (<View style={{ zIndex: -100000 }}>
                            <Text style={styles.HeaderStyle}>{selectedCountry}</Text>
                            <PieCard data={selectedCountryStats} />
                        </View>) : (<View></View>)}
                    </SafeAreaView>
            )}
            </AuthContext.Consumer>
                    );
    }
}

const styles = StyleSheet.create({
    HeaderStyle: {
        fontSize: 18,
        margin: 5,
        alignSelf: 'center'
    },
    SFViewStyle: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        justifyContent: 'center'
    },
});

export default CovidStatsScreen;