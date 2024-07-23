// Filename: index.js
// Combined code from all files 

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, ActivityIndicator, View } from 'react-native';
import axios from 'axios';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const generateStory = async () => {
        setLoading(true);
        setStory('');
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    { role: "system", content: "You are a creative writer. Write a fairy tale." },
                    { role: "user", content: `Create a story with hero: ${hero}, villain: ${villain}, and plot: ${plot}` }
                ],
                model: "gpt-4o"
            });

            const { data } = response;
            setStory(data.response);
        } catch (error) {
            console.error(error);
            setStory("An error occurred while generating the story.");
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Enter the name of the hero"
                    value={hero}
                    onChangeText={setHero}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter the name of the villain"
                    value={villain}
                    onChangeText={setVillain}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter the plot of the story"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button
                    title="Generate Story"
                    onPress={generateStory}
                />

                {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
                
                {story && (
                    <View style={styles.storyBox}>
                        <Text style={styles.story}>{story}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#F5FCFF',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    storyBox: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        width: '100%',
    },
    story: {
        fontSize: 16,
        lineHeight: 24,
    },
});