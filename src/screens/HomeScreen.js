import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import Task from '../components/Task'
import {Foundation, Ionicons} from "@expo/vector-icons"

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

    const completeTask = (index) => {
        let itemsCopy = [...taskLists];
        itemsCopy.splice(index, 1);
        setTaskLists(itemsCopy)
    }
    
    const onPress = () => {
        if(task) {
            handleAddTask();   
        }else {
            null
            // onPlusClicked();
        }
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
                        // keyExtractor={(item, index) => item.key}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => 
                        <TouchableOpacity  key={index} onPressIn={() => completeTask(index)}>
                            <Task title={item}/>
                        </TouchableOpacity>
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
                <TouchableOpacity onPress={onPress} >
                <View style={styles.addWrapper}>
                    {task ? <Ionicons name="send" size={18} color="#000" style={styles.icon} /> :
                    <Foundation name="plus" size={18} color="black" style={styles.icon} />
                    }
                    
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
        paddingHorizontal: 10,
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
  icon: {
      marginHorizontal: 5,
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
