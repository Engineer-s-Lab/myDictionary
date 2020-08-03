import React,{useState,useContext} from 'react'
import {View,TextInput,FlatList,TouchableOpacity,SafeAreaView} from 'react-native'
import {Button,ListItem,Divider} from 'react-native-elements'
import {Context as MainContext} from '../context/MainContext'

const WordScreen = ({navigation,route}) =>{

    const [visible,setVisible] = useState(false)
    const [name,setName] = useState('')
    const [meaning,setMeaning] = useState('')
    const {addWord} = useContext(MainContext)
    const book = route.params

    navigation.setOptions({
        title:book.BookName,
        headerRight:()=>{
            return(
                <Button title='  Add  ' containerStyle={{marginRight:7}} onPress={()=>setVisible(true)} />
            )
        }
    })
    return(
        <SafeAreaView style={{flex:1,zIndex:1}} >
            <Divider/>
             <FlatList
                data={book.Words.length>1 ? book.Words.sort((a, b) => a.Word.localeCompare(b.Word)) : book.Words}
                keyExtractor={()=>Math.random().toString()}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity>
                            <ListItem
                                title={item.Word}
                                subtitle={item.Meaning}
                                leftAvatar={{title:item.Word.charAt(0),size:'medium', titleStyle:{color:'black',fontSize:20}, containerStyle:{backgroundColor:'aliceblue'}}}
                                bottomDivider
                            />
                        </TouchableOpacity>
                    )
                }}
             />
             {visible
                ?
                <View style={{justifyContent:'flex-end',zIndex:2}} >
                    <Divider/>
                    <View style={{marginBottom:10}} >
                        <TextInput placeholder='Word Name' onChangeText={(value)=>{setName(value)}} style={{borderBottomWidth:1,fontSize:18,height:40,marginBottom:5}} />
                        <TextInput placeholder='Meaning' onChangeText={(value) => setMeaning(value)} style={{borderBottomWidth:1,fontSize:18,height:40,marginBottom:5}} />
                        <Button title=' Submit ' containerStyle={{alignSelf:'center'}} 
                            onPress={async()=>{ book.Words.push({Word:name,Meaning:meaning}),
                                                await addWord(book.BookName,name,meaning),
                                                setVisible(false)}} />
                    </View> 
                </View>
                :
                null
             }
             
        </SafeAreaView>
    )
}


export default WordScreen