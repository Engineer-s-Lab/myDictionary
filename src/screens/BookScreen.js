import React,{useState,useContext,useEffect} from 'react'
import {Text,View,TextInput,FlatList,TouchableOpacity,ActivityIndicator,SafeAreaView} from 'react-native'
import {Button,ListItem,Divider} from 'react-native-elements'
import {Context as MainContext} from '../context/MainContext'

const BookScreen = ({navigation}) =>{

    const [visible,setVisible] = useState(false)
    const [name,setName] = useState('')
    const [authorName,setAuthorName] = useState('')
    const {addBook,fetchBooks,state:{Books}} = useContext(MainContext)
    const [loading,setLoading] = useState(true)
 
    
    useEffect(() =>{
        navigation.addListener('focus', async() =>{await fetchBooks(),setLoading(false)}) //
    })

    navigation.setOptions({
        title:'Books',
        headerRight:()=>{
            return(
                <Button title='  Add  ' containerStyle={{marginRight:7}} onPress={()=>setVisible(true)} />
            )
        }
    })

    if(loading){
            return( 
                <View style={{flex:1,justifyContent:'center'}} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        
    }else if(Books != null && Books.length>0){
        return(
            <SafeAreaView style={{flex:1,zIndex:1}} >
                <Divider/>
                <FlatList
                    data={Books.sort((a, b) => a.BookName.localeCompare(b.BookName))}
                    keyExtractor={()=>Math.random().toString()}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity>
                                <ListItem
                                    title={item.BookName}
                                    subtitle={item.Author}
                                    leftAvatar={{title:item.BookName.charAt(0),size:'medium', titleStyle:{color:'black',fontSize:20}, containerStyle:{backgroundColor:'aliceblue'}}}
                                    onPress={() => navigation.navigate('WordScreen', (item))}
                                    bottomDivider
                                    chevron
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
                            <TextInput placeholder='Book Name' onChangeText={(value)=>{setName(value)}} style={{borderBottomWidth:1,fontSize:18,height:40,marginBottom:5}} />
                            <TextInput placeholder='Author' onChangeText={(value)=>{setAuthorName(value)}} style={{borderBottomWidth:1,fontSize:18,height:40,marginBottom:5}} />
                            <Button title=' Submit ' containerStyle={{alignSelf:'center'}} 
                                onPress={async()=>{
                                                    await addBook(name,authorName),
                                                    setVisible(false),
                                                    await fetchBooks()}} />
                        </View> 
                    </View>
                    :
                    null
                    
                }
            </SafeAreaView>
        )
    }else{
        return(
            <View style={{flex:1}} >
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                    <Text>Add your First Book!!</Text> 
                </View>           
                {visible
                ?
                
                <View style={{justifyContent:'flex-end',zIndex:2}} >
                    <Divider/>
                    <View style={{marginBottom:10}} >
                        <TextInput placeholder='Book Name' onChangeText={(value)=>{setName(value)}} style={{borderBottomWidth:1,fontSize:18,height:40,marginBottom:5}} />
                        <TextInput placeholder='Author' onChangeText={(value)=>{setAuthorName(value)}} style={{borderBottomWidth:1,fontSize:18,height:40,marginBottom:5}} />
                        <Button title=' Submit ' containerStyle={{alignSelf:'center'}} 
                            onPress={async()=>{
                                            await addBook(name,authorName),
                                            setVisible(false),
                                            await fetchBooks()}} />
                    </View> 
                </View>
                :
                null
            }
            </View>
        )
    }  
}

export default BookScreen