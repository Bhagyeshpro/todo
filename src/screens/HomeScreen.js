import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import Task from '../components/Task'

const HomeScreen = () => {
    const [task, setTask] = useState("");
    const [taskLists, setTaskLists] = useState([]);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1); //January is 0!
    var yyyy = today.getFullYear();

    let months = ['Jan','Feb','Mar','Apr','May','Jun',
                'Jul','Aug','Sep','Oct','Nov','Dec'];
    mm = months[mm]
    

    today = mm + ' ' + dd + ' ' + yyyy;
    
    const handleAddTask = () => {
        setTaskLists([...taskLists, task])
        setTask("")
        Keyboard.dismiss()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionContainer}>
                {/* title  */}
                <View style={styles.appHeader}>
                <Text style={styles.appHeading}>Today's Tasks </Text>
                <Text 
                        style={{fontSize: 17, marginHorizontal: 10, marginTop: 6}}
                    >{today}
                    </Text>
                </View>

                {/* Tasks */}
                <View style={styles.tasksContainer}>
                    <FlatList
                        data={taskLists}
                        keyExtractor={(item, index) => item.key}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => 
                        <Task title={item}/>
                        }
                    />
                </View>
            </View>
             <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput 
                    style={styles.input} 
                    placeholder={'Write a task'}
                    value={task} //For real time changes
                    onChangeText={text => setTask(text)} 
                />
                <TouchableOpacity onPress={handleAddTask} >
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgray",
    },
    appHeader: {
        flexDirection: "row",
    },
    sectionContainer: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    appHeading: {
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 25,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',        
        paddingHorizontal: 20,
  },
  tasksContainer: {
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
})
